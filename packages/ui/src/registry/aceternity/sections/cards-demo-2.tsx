"use client";

import * as React from "react";

import { cn } from "../../_shared/cn";
import type { RegistryItemMeta } from "../../types";

export const aceternityCardsDemo2Meta: RegistryItemMeta = {
	provider: "aceternity",
	kind: "section",
	id: "aceternity/section/cards-demo-2",
	name: "cards-demo-2",
	title: "Cards Demo 2",
	categories: ["cards"],
	tags: ["profile", "hover"],
	source: {
		registryUrl: "https://ui.aceternity.com/registry/cards-demo-2.json",
		docsUrl: "https://ui.aceternity.com/components/cards-demo-2",
	},
};

export function CardsDemo2({
	imageSrc = "https://assets.aceternity.com/manu.png",
}: {
	imageSrc?: string;
}): JSX.Element {
	return (
		<div className="mx-auto w-full max-w-sm">
			<div
				className={cn(
					"group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
				)}
			>
				<div className="flex items-center gap-4">
					<div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800">
						<img src={imageSrc} alt="Avatar" className="h-full w-full object-cover" />
					</div>
					<div className="min-w-0">
						<p className="truncate text-base font-semibold text-neutral-900 dark:text-white">Manu Arora</p>
						<p className="truncate text-sm text-neutral-600 dark:text-neutral-400">Founder • Aceternity UI</p>
					</div>
				</div>

				<div className="mt-6">
					<p className="text-sm text-neutral-700 dark:text-neutral-300">
						A simple card layout that can be wired to profile data and a local image.
					</p>
				</div>

				<div className="mt-6 flex gap-3">
					<button className="flex-1 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
						Follow
					</button>
					<button className="flex-1 rounded-lg border border-neutral-200 bg-transparent px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-800/50">
						Message
					</button>
				</div>
			</div>
		</div>
	);
}
