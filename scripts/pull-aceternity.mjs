import fs from "node:fs/promises";
import path from "node:path";

function parseArgs(argv) {
  const args = { cwd: "apps/preview", srcDir: "src", components: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--cwd") args.cwd = argv[++i];
    else if (a === "--srcDir") args.srcDir = argv[++i];
    else args.components.push(a);
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

async function readJson(p) {
  return JSON.parse(await fs.readFile(p, "utf8"));
}

async function writeJson(p, data) {
  await fs.writeFile(p, JSON.stringify(data, null, 2) + "\n", "utf8");
}

async function main() {
  const { cwd, srcDir, components } = parseArgs(process.argv.slice(2));
  if (!components.length) {
    throw new Error(
      "No components specified. Example: node scripts/pull-aceternity.mjs --cwd apps/preview bento-grid hero-parallax",
    );
  }

  const packageJsonPath = path.join(cwd, "package.json");
  const packageJson = (await fileExists(packageJsonPath))
    ? await readJson(packageJsonPath)
    : null;

  const depsToAdd = new Set();

  for (const name of components) {
    const componentName = name.replace(/^@aceternity\//, "");
    const url = `https://ui.aceternity.com/registry/${componentName}.json`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    for (const dep of json.dependencies ?? []) depsToAdd.add(dep);
    for (const dep of json.devDependencies ?? []) depsToAdd.add(dep);

    for (const file of json.files ?? []) {
      const target = file.target || file.path;
      if (!target || typeof file.content !== "string") continue;

      // Registry paths are typically like "components/ui/x.tsx".
      // In this repo, we put them under "<cwd>/<srcDir>/components/...".
      const rel = target.startsWith("components/")
        ? path.join(srcDir, target)
        : path.join(srcDir, target);

      const outPath = path.join(cwd, rel);
      await fs.mkdir(path.dirname(outPath), { recursive: true });
      await fs.writeFile(outPath, file.content, "utf8");

      process.stdout.write(`Wrote ${outPath}\n`);
    }
  }

  if (packageJson) {
    packageJson.dependencies ??= {};

    // Common shadcn/aceternity utility deps.
    depsToAdd.add("clsx");
    depsToAdd.add("tailwind-merge");

    for (const dep of depsToAdd) {
      if (!(dep in packageJson.dependencies)) {
        packageJson.dependencies[dep] = "latest";
      }
    }

    await writeJson(packageJsonPath, packageJson);
    process.stdout.write(`Updated ${packageJsonPath} (dependency stubs added)\n`);
  } else {
    process.stdout.write(
      `Note: ${packageJsonPath} not found, skipping dependency updates.\n`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
