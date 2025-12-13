"use client";

import * as React from "react";

import { cn } from "../../_shared/cn";
import type { RegistryItemMeta } from "../../types";

export const aceternityFeaturesSectionDemo2Meta: RegistryItemMeta = {
	provider: "aceternity",
	kind: "section",
	id: "aceternity/section/features-section-demo-2",
	name: "features-section-demo-2",
	title: "Features Section Demo 2",
	categories: ["features"],
	tags: ["grid", "borders", "hover"],
	source: {
		registryUrl: "https://ui.aceternity.com/registry/features-section-demo-2.json",
		docsUrl: "https://ui.aceternity.com/components/features-section-demo-2",
	},
};

type Feature = {
	title: string;
	description: string;
	icon: React.ReactNode;
};

export function FeaturesSectionDemo2(): JSX.Element {
	const features: Feature[] = [
		{
			title: "Built for developers",
			description: "Built for engineers, developers, dreamers, thinkers and doers.",
			icon: <IconTerminal2 />,
		},
		{
			title: "Ease of use",
			description: "It's as easy as using an Apple, and as expensive as buying one.",
			icon: <IconEaseInOut />,
		},
		{
			title: "Pricing like no other",
			description: "Our prices are best in the market. No cap, no lock, no credit card required.",
			icon: <IconCurrencyDollar />,
		},
		{
			title: "100% Uptime guarantee",
			description: "We just cannot be taken down by anyone.",
			icon: <IconCloud />,
		},
		{
			title: "Multi-tenant Architecture",
			description: "You can simply share passwords instead of buying new seats",
			icon: <IconRouteAltLeft />,
		},
		{
			title: "24/7 Customer Support",
			description: "We are available a 100% of the time. Atleast our AI Agents are.",
			icon: <IconHelp />,
		},
		{
			title: "Money back guarantee",
			description: "If you donot like EveryAI, we will convince you to like us.",
			icon: <IconAdjustmentsBolt />,
		},
		{
			title: "And everything else",
			description: "I just ran out of copy ideas. Accept my sincere apologies",
			icon: <IconHeart />,
		},
	];

	return (
		<div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-4">
			{features.map((feature, index) => (
				<FeatureCard key={`${feature.title}-${index}`} {...feature} index={index} />
			))}
		</div>
	);
}

function FeatureCard({
	title,
	description,
	icon,
	index,
}: Feature & {
	index: number;
}): JSX.Element {
	return (
		<div
			className={cn(
				"group/feature relative flex flex-col py-10 lg:border-r dark:border-neutral-800",
				(index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
				index < 4 && "lg:border-b dark:border-neutral-800"
			)}
		>
			{index < 4 ? (
				<div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
			) : (
				<div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
			)}
			<div className="relative z-10 mb-4 px-10 text-neutral-600 dark:text-neutral-400">{icon}</div>
			<div className="relative z-10 mb-2 px-10 text-lg font-bold">
				<div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-blue-500 dark:bg-neutral-700" />
				<span className="inline-block text-neutral-800 transition duration-200 group-hover/feature:translate-x-2 dark:text-neutral-100">
					{title}
				</span>
			</div>
			<p className="relative z-10 max-w-xs px-10 text-sm text-neutral-600 dark:text-neutral-300">
				{description}
			</p>
		</div>
	);
}

function IconBase({ children }: { children: React.ReactNode }): JSX.Element {
	return <span className="inline-flex h-6 w-6 items-center justify-center">{children}</span>;
}

function IconTerminal2(): JSX.Element {
	return (
		<IconBase>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
				<path d="M4 5h16v14H4z" />
				<path d="M7 9l3 3-3 3" />
				<path d="M12 15h5" />
			</svg>
		</IconBase>
	);
}

function IconEaseInOut(): JSX.Element {
	return (
		<IconBase>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
				<path d="M4 12c4-8 12-8 16 0" />
				<path d="M4 12c4 8 12 8 16 0" />
			</svg>
		</IconBase>
	);
}

function IconCurrencyDollar(): JSX.Element {
	return (
		<IconBase>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
				<path d="M12 2v20" />
				<path d="M17 6H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
			</svg>
		</IconBase>
	);
}

function IconCloud(): JSX.Element {
	return (
		<IconBase>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
				<path d="M7 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11.6 1.6A3.5 3.5 0 0 0 7 18z" />
			</svg>
		</IconBase>
	);
}

function IconRouteAltLeft(): JSX.Element {
	return (
		<IconBase>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
				<path d="M20 6H9a5 5 0 0 0-5 5v7" />
				<path d="M7 18l-3 3-3-3" />
			</svg>
		</IconBase>
	);
}

function IconHelp(): JSX.Element {
	return (
		<IconBase>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
				<circle cx="12" cy="12" r="10" />
				<path d="M9.5 9a2.5 2.5 0 1 1 4 2c-.7.5-1.5 1-1.5 2" />
				<path d="M12 17h.01" />
			</svg>
		</IconBase>
	);
}

function IconAdjustmentsBolt(): JSX.Element {
	return (
		<IconBase>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
				<path d="M4 7h10" />
				<path d="M4 17h10" />
				<path d="M14 7l2-2 2 2-2 2-2-2z" />
				<path d="M14 17l2-2 2 2-2 2-2-2z" />
			</svg>
		</IconBase>
	);
}

function IconHeart(): JSX.Element {
	return (
		<IconBase>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
				<path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
			</svg>
		</IconBase>
	);
}
