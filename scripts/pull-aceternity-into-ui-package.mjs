import fs from "node:fs/promises";
import path from "node:path";

const INDEX_URL = "https://ui.aceternity.com/registry/index.json";
const REGISTRY_ITEM_URL = (name) => `https://ui.aceternity.com/registry/${name}.json`;

function parseArgs(argv) {
	const args = {
		write: false,
		updateDeps: false,
		limit: undefined,
		only: undefined,
	};

	for (let i = 0; i < argv.length; i += 1) {
		const a = argv[i];
		if (a === "--write") args.write = true;
		else if (a === "--updateDeps") args.updateDeps = true;
		else if (a === "--limit") args.limit = Number(argv[++i]);
		else if (a === "--only") args.only = argv[++i];
		else throw new Error(`Unknown arg: ${a}`);
	}
	return args;
}

async function fileExists(p) {
	try {
		await fs.access(p);
		return true;
	} catch {
		return false;
	}
}

function toPascalCase(input) {
	return input
		.split(/[^a-zA-Z0-9]+/g)
		.filter(Boolean)
		.map((p) => p.slice(0, 1).toUpperCase() + p.slice(1))
		.join("");
}

function toTitleCase(input) {
	return input
		.split(/[-_]+/g)
		.filter(Boolean)
		.map((p) => p.slice(0, 1).toUpperCase() + p.slice(1))
		.join(" ");
}

function countSegments(posixDir) {
	if (!posixDir || posixDir === ".") return 0;
	return posixDir.split("/").filter(Boolean).length;
}

function ensureLeadingDot(importPath) {
	if (importPath.startsWith("../") || importPath.startsWith("./")) return importPath;
	return `./${importPath}`;
}

function rewriteImports(content, depthFromUiRoot) {
	const upToRegistry = "../".repeat(depthFromUiRoot + 2); // ui -> aceternity -> registry
	const cnPath = `${upToRegistry}_shared/cn`;
	const typesPath = `${upToRegistry}types`;
	const toUiRoot = depthFromUiRoot === 0 ? "./" : "../".repeat(depthFromUiRoot);

	let out = content;

	// Common shadcn-style aliases.
	out = out.replaceAll('from "@/lib/utils"', `from "${cnPath}"`);
	out = out.replaceAll("from '@/lib/utils'", `from "${cnPath}"`);

	out = out.replace(/from\s+["']@\/components\/ui\/([^"']+)["']/g, (_m, p1) => {
		return `from "${ensureLeadingDot(path.posix.join(toUiRoot, p1))}"`;
	});

	// If a component imports cn from utils, it now points at our shared cn.
	// Ensure RegistryItemMeta type import path is correct (if present).
	out = out.replace(/from\s+["']\.\.\/\.\.\/types["']/g, `from "${typesPath}"`);
	out = out.replace(/from\s+["']\.\.\/types["']/g, `from "${typesPath}"`);

	return out;
}

function injectTypeImportIfMissing(content, importPath, typeName) {
	if (content.includes(typeName)) {
		// If it already references the type, still ensure import exists.
		const importRe = new RegExp(`import\\s+type\\s+\\{\\s*${typeName}\\s*\\}\\s+from`);
		if (importRe.test(content)) return content;
	}

	const lines = content.split("\n");
	let insertAt = 0;
	if (lines[0]?.startsWith('"use client"')) {
		insertAt = 1;
		while (lines[insertAt] === "") insertAt += 1;
	}
	// Insert after the last contiguous import.
	for (let i = insertAt; i < lines.length; i += 1) {
		if (/^import\s/.test(lines[i])) insertAt = i + 1;
		else if (lines[i].trim() === "") continue;
		else break;
	}

	const importLine = `import type { ${typeName} } from "${importPath}";`;
	if (lines.includes(importLine)) return content;
	lines.splice(insertAt, 0, importLine);
	return lines.join("\n");
}

function appendMetaIfMissing(content, { metaConstName, name, deps }) {
	if (content.includes(`export const ${metaConstName}`)) return content;
	if (content.includes("satisfies RegistryItemMeta") && content.includes("provider: \"aceternity\"")) {
		return content;
	}

	const depsList = Array.isArray(deps) ? deps : [];
	const depsJson = JSON.stringify(depsList, null, 2).replace(/\n/g, "\n\t\t");

	return (
		content.replace(/\s+$/, "") +
		"\n\n" +
		`export const ${metaConstName} = {\n` +
		`\tid: \"aceternity/ui/${name}\",\n` +
		`\tprovider: \"aceternity\",\n` +
		`\tkind: \"ui\",\n` +
		`\tname: \"${name}\",\n` +
		`\ttitle: \"${toTitleCase(name)}\",\n` +
		`\tcategories: [],\n` +
		`\ttags: [],\n` +
		`\tsource: {\n` +
		`\t\tregistryUrl: \"https://ui.aceternity.com/registry/${name}.json\",\n` +
		`\t\tdocsUrl: \"https://ui.aceternity.com/components/${name}\",\n` +
		`\t},\n` +
		(depsList.length
			? `\tdependencies: {\n\t\tnpm: ${depsJson},\n\t},\n`
			: "") +
		`} satisfies RegistryItemMeta;\n`
	);
}

async function readJson(p) {
	return JSON.parse(await fs.readFile(p, "utf8"));
}

async function writeJson(p, data) {
	await fs.writeFile(p, JSON.stringify(data, null, 2) + "\n", "utf8");
}

async function main() {
	const args = parseArgs(process.argv.slice(2));

	const repoRoot = process.cwd();
	const uiRoot = path.join(
		repoRoot,
		"packages",
		"ui",
		"src",
		"registry",
		"aceternity",
		"ui",
	);
	const sectionsRoot = path.join(
		repoRoot,
		"packages",
		"ui",
		"src",
		"registry",
		"aceternity",
		"sections",
	);

	if (!(await fileExists(uiRoot))) {
		throw new Error(
			`Cannot find ${uiRoot}. Run this from the repo root after cloning (not from a subfolder).`,
		);
	}

	const existingUiEntries = await fs.readdir(uiRoot, { withFileTypes: true });
	const existingSectionsEntries = (await fileExists(sectionsRoot))
		? await fs.readdir(sectionsRoot, { withFileTypes: true })
		: [];

	const existingNames = new Set([
		...existingUiEntries
			.filter((d) => d.isFile() && /\.tsx?$/.test(d.name) && d.name !== "index.ts")
			.map((d) => d.name.replace(/\.tsx?$/, "")),
		...existingUiEntries.filter((d) => d.isDirectory()).map((d) => d.name),
		...existingSectionsEntries
			.filter((d) => d.isFile() && /\.tsx?$/.test(d.name) && d.name !== "index.ts")
			.map((d) => d.name.replace(/\.tsx?$/, "")),
	]);

	const indexRes = await fetch(INDEX_URL);
	if (!indexRes.ok) throw new Error(`Failed to fetch ${INDEX_URL}: ${indexRes.status} ${indexRes.statusText}`);
	const indexJson = await indexRes.json();
	const items = Array.isArray(indexJson.items) ? indexJson.items : [];

	let uiItems = items.filter((it) => it && it.type === "registry:ui" && typeof it.name === "string");
	if (args.only) uiItems = uiItems.filter((it) => it.name === args.only);

	uiItems = uiItems.filter((it) => !existingNames.has(it.name));
	if (typeof args.limit === "number" && Number.isFinite(args.limit)) uiItems = uiItems.slice(0, args.limit);

	process.stdout.write(`Found ${items.length} registry entries in index.json\n`);
	process.stdout.write(`Missing registry:ui items to pull: ${uiItems.length}\n`);
	if (!args.write) {
		process.stdout.write("Dry run (no files written). Re-run with --write to generate files.\n");
		process.stdout.write(uiItems.map((x) => x.name).join("\n") + "\n");
		return;
	}

	const pulledNames = [];
	const depsToAdd = new Set();

	for (const it of uiItems) {
		const name = it.name;
		const res = await fetch(REGISTRY_ITEM_URL(name));
		if (!res.ok) {
			process.stderr.write(`Skipping ${name}: fetch failed (${res.status} ${res.statusText})\n`);
			continue;
		}
		const json = await res.json();

		for (const dep of json.dependencies ?? []) depsToAdd.add(dep);
		for (const dep of json.devDependencies ?? []) depsToAdd.add(dep);

		const files = Array.isArray(json.files) ? json.files : [];
		const tsxFiles = files.filter((f) => f && typeof f.content === "string" && typeof f.path === "string" && f.path.endsWith(".tsx"));
		if (tsxFiles.length === 0) {
			process.stderr.write(`Skipping ${name}: no TSX files in registry payload\n`);
			continue;
		}

		const metaConstName = `aceternity${toPascalCase(name)}Meta`;

		// Prefer writing a single top-level file when possible.
		const mainFile =
			tsxFiles.find((f) => f.path.endsWith(`/ui/${name}.tsx`) || f.path.endsWith(`ui/${name}.tsx`)) ??
			tsxFiles[0];

		if (tsxFiles.length === 1) {
			const outPath = path.join(uiRoot, `${name}.tsx`);
			const relDir = path.posix.dirname(name + ".tsx"); // '.'
			const depth = countSegments(relDir);
			let content = rewriteImports(mainFile.content, depth);
			content = injectTypeImportIfMissing(content, "../../types", "RegistryItemMeta");
			content = appendMetaIfMissing(content, { metaConstName, name, deps: json.dependencies });
			await fs.writeFile(outPath, content, "utf8");
			pulledNames.push(name);
			process.stdout.write(`Wrote ${path.relative(repoRoot, outPath)}\n`);
			continue;
		}

		// Multi-file: create folder and a thin wrapper at ui/<name>.tsx
		const folder = path.join(uiRoot, name);
		await fs.mkdir(folder, { recursive: true });

		for (const f of tsxFiles) {
			// Most aceternity UI file paths are like "ui/<component>.tsx" or "ui/<dir>/<file>.tsx".
			const rawRel = f.path.replace(/^\/?/, "");
			const rel = rawRel.startsWith("ui/") ? rawRel.slice("ui/".length) : rawRel;
			const out = path.join(folder, rel);
			await fs.mkdir(path.dirname(out), { recursive: true });

			const relFromUiRoot = path.posix.join(name, rel).replace(/\\/g, "/");
			const depth = countSegments(path.posix.dirname(relFromUiRoot));

			let content = rewriteImports(f.content, depth);
			content = injectTypeImportIfMissing(content, "../../../types", "RegistryItemMeta");
			await fs.writeFile(out, content, "utf8");
			process.stdout.write(`Wrote ${path.relative(repoRoot, out)}\n`);
		}

		// Wrapper
		const wrapperPath = path.join(uiRoot, `${name}.tsx`);
		const wrapper =
			`export * from "./${name}/${path.posix.basename(mainFile.path).replace(/\.tsx$/, "")}";\n\n` +
			`import type { RegistryItemMeta } from "../../types";\n\n` +
			`export const ${metaConstName} = {\n` +
			`\tid: \"aceternity/ui/${name}\",\n` +
			`\tprovider: \"aceternity\",\n` +
			`\tkind: \"ui\",\n` +
			`\tname: \"${name}\",\n` +
			`\ttitle: \"${toTitleCase(name)}\",\n` +
			`\tcategories: [],\n` +
			`\ttags: [],\n` +
			`\tsource: {\n` +
			`\t\tregistryUrl: \"https://ui.aceternity.com/registry/${name}.json\",\n` +
			`\t\tdocsUrl: \"https://ui.aceternity.com/components/${name}\",\n` +
			`\t},\n` +
			((json.dependencies?.length ?? 0) > 0
				? `\tdependencies: {\n\t\tnpm: ${JSON.stringify(json.dependencies, null, 2).replace(/\n/g, "\n\t\t")},\n\t},\n`
				: "") +
			`} satisfies RegistryItemMeta;\n`;
		await fs.writeFile(wrapperPath, wrapper, "utf8");
		pulledNames.push(name);
		process.stdout.write(`Wrote ${path.relative(repoRoot, wrapperPath)}\n`);
	}

	// Regenerate ui/index.ts
	const uiFilesNow = (await fs.readdir(uiRoot, { withFileTypes: true }))
		.filter((d) => d.isFile() && d.name.endsWith(".tsx") && d.name !== "index.ts")
		.map((d) => d.name.replace(/\.tsx$/, ""))
		.sort((a, b) => a.localeCompare(b));

	const exportLines = uiFilesNow.map((name) => `export * from "./${name}";`);
	const importLines = uiFilesNow.map((name) => {
		const meta = `aceternity${toPascalCase(name)}Meta`;
		return `import { ${meta} } from "./${name}";`;
	});
	const metaLines = uiFilesNow.map((name) => `\taceternity${toPascalCase(name)}Meta,`);

	const uiIndex =
		exportLines.join("\n") +
		"\n\n" +
		importLines.join("\n") +
		"\n\n" +
		"export const aceternityUiMetas = [\n" +
		metaLines.join("\n") +
		"\n] as const;\n";

	await fs.writeFile(path.join(uiRoot, "index.ts"), uiIndex, "utf8");
	process.stdout.write(`Regenerated packages/ui/src/registry/aceternity/ui/index.ts (${uiFilesNow.length} exports)\n`);

	if (args.updateDeps) {
		const packageJsonPath = path.join(repoRoot, "packages", "ui", "package.json");
		const pkg = await readJson(packageJsonPath);
		pkg.dependencies ??= {};
		// Ensure clsx exists because cn uses it.
		depsToAdd.add("clsx");
		for (const dep of depsToAdd) {
			if (!(dep in pkg.dependencies)) pkg.dependencies[dep] = "latest";
		}
		await writeJson(packageJsonPath, pkg);
		process.stdout.write(`Updated ${path.relative(repoRoot, packageJsonPath)} (dependency stubs added)\n`);
	}

	process.stdout.write(`\nPulled ${pulledNames.length} UI items.\n`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
