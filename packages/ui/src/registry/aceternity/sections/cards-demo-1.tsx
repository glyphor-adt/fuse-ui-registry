"use client";

import * as React from "react";

import { cn } from "../../_shared/cn";
import type { RegistryItemMeta } from "../../types";

export const aceternityCardsDemo1Meta: RegistryItemMeta = {
	provider: "aceternity",
	kind: "section",
	id: "aceternity/section/cards-demo-1",
	name: "cards-demo-1",
	title: "Cards Demo 1",
	categories: ["cards"],
	tags: ["hover", "background"],
	source: {
		registryUrl: "https://ui.aceternity.com/registry/cards-demo-1.json",
		docsUrl: "https://ui.aceternity.com/components/cards-demo-1",
	},
};

export function CardsDemo1(): JSX.Element {
	return (
		<div className="w-full max-w-xs">
			<div
				className={cn(
					"group card relative mx-auto flex h-96 w-full cursor-pointer flex-col justify-end overflow-hidden rounded-md border border-transparent p-4 shadow-xl transition-all duration-500 hover:shadow-2xl dark:border-neutral-800",
					"bg-[url(https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80)] bg-cover",
					"before:fixed before:inset-0 before:z-[-1] before:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)] before:opacity-0",
					"hover:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)]",
					"hover:after:absolute hover:after:inset-0 hover:after:content-[''] hover:after:bg-black hover:after:opacity-50"
				)}
			>
				<div className="relative z-50">
					<h1 className="relative text-xl font-bold text-gray-50 md:text-3xl">Background Overlays</h1>
					<p className="relative my-4 text-base font-normal text-gray-50">
						This card is for some special elements, like displaying background gifs on hover only.
					</p>
				</div>
			</div>
		</div>
	);
}
