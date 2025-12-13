"use client";

import * as React from "react";
import { animate, motion } from "motion/react";

import { cn } from "../../_shared/cn";
import type { RegistryItemMeta } from "../../types";

export const aceternityCardsDemo3Meta: RegistryItemMeta = {
	provider: "aceternity",
	kind: "section",
	id: "aceternity/section/cards-demo-3",
	name: "cards-demo-3",
	title: "Cards Demo 3",
	categories: ["cards"],
	tags: ["motion", "icons", "sparkles"],
	source: {
		registryUrl: "https://ui.aceternity.com/registry/cards-demo-3.json",
		docsUrl: "https://ui.aceternity.com/components/cards-demo-3",
	},
	dependencies: {
		npm: ["motion"],
	},
};

export function CardsDemo3(): JSX.Element {
	return (
		<Card>
			<CardSkeletonContainer>
				<Skeleton />
			</CardSkeletonContainer>
			<CardTitle>Damn good card</CardTitle>
			<CardDescription>
				A card that showcases a set of tools that you use to create your product.
			</CardDescription>
		</Card>
	);
}

function Skeleton(): JSX.Element {
	const scale: number[] = [1, 1.1, 1];
	const transform: string[] = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
	const sequence: Array<[string, { scale: number[]; transform: string[] }, { duration: number }]> = [
		[".circle-1", { scale, transform }, { duration: 0.8 }],
		[".circle-2", { scale, transform }, { duration: 0.8 }],
		[".circle-3", { scale, transform }, { duration: 0.8 }],
		[".circle-4", { scale, transform }, { duration: 0.8 }],
		[".circle-5", { scale, transform }, { duration: 0.8 }],
	];

	React.useEffect(() => {
		// @ts-expect-error motion's animate sequence typing is narrower than runtime supports
		animate(sequence, { repeat: Infinity, repeatDelay: 1 });
	}, []);

	return (
		<div className="relative flex h-full items-center justify-center overflow-hidden p-8">
			<div className="flex shrink-0 flex-row items-center justify-center gap-2">
				<Container className="circle-1 h-8 w-8">
					<Dot className="bg-[#CC9B7A]" />
				</Container>
				<Container className="circle-2 h-12 w-12">
					<CopilotGlyph className="h-6 w-6 text-black dark:text-white" />
				</Container>
				<Container className="circle-3">
					<Dot className="bg-black dark:bg-white" />
				</Container>
				<Container className="circle-4 h-12 w-12">
					<MetaGlyph className="h-6 w-6" />
				</Container>
				<Container className="circle-5 h-8 w-8">
					<Dot className="bg-gradient-to-br from-purple-500 to-cyan-400" />
				</Container>
			</div>

			<div className="absolute top-20 z-40 m-auto h-40 w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent">
				<div className="absolute -left-10 top-1/2 h-32 w-10 -translate-y-1/2">
					<Sparkles />
				</div>
			</div>
		</div>
	);
}

function Sparkles(): JSX.Element {
	const stars = React.useMemo(() => {
		const count = 12;
		return Array.from({ length: count }).map((_, i) => {
			// Deterministic pseudo-random values derived from index.
			const t = Math.sin(i * 999) * 10000;
			const frac = t - Math.floor(t);
			const t2 = Math.sin((i + 1) * 333) * 10000;
			const frac2 = t2 - Math.floor(t2);
			const t3 = Math.sin((i + 2) * 777) * 10000;
			const frac3 = t3 - Math.floor(t3);

			return {
				id: i,
				top: frac * 100,
				left: frac2 * 100,
				opacity: 0.2 + frac3 * 0.8,
				duration: 4 + frac * 2,
				jitter: (frac2 * 2 - 1) * 6,
			};
		});
	}, []);
	return (
		<div className="absolute inset-0">
			{stars.map((star) => (
				<motion.span
					key={`star-${star.id}`}
					animate={{
						top: `calc(${star.top}% + ${star.jitter}px)`,
						left: `calc(${star.left}% + ${star.jitter}px)`,
						opacity: star.opacity,
						scale: [1, 1.2, 0],
					}}
					transition={{ duration: star.duration, repeat: Infinity, ease: "linear" }}
					style={{
						position: "absolute",
						top: `${star.top}%`,
						left: `${star.left}%`,
						width: "2px",
						height: "2px",
						borderRadius: "50%",
						zIndex: 1,
					}}
					className="inline-block bg-black dark:bg-white"
				/>
			))}
		</div>
	);
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }): JSX.Element {
	return (
		<div
			className={cn(
				"group mx-auto w-full max-w-sm rounded-xl border border-[rgba(255,255,255,0.10)] bg-gray-100 p-8 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] dark:bg-[rgba(40,40,40,0.70)]",
				className
			)}
		>
			{children}
		</div>
	);
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }): JSX.Element {
	return <h3 className={cn("py-2 text-lg font-semibold text-gray-800 dark:text-white", className)}>{children}</h3>;
}

export function CardDescription({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}): JSX.Element {
	return (
		<p className={cn("max-w-sm text-sm font-normal text-neutral-600 dark:text-neutral-400", className)}>
			{children}
		</p>
	);
}

export function CardSkeletonContainer({
	className,
	children,
	showGradient = true,
}: {
	className?: string;
	children: React.ReactNode;
	showGradient?: boolean;
}): JSX.Element {
	return (
		<div
			className={cn(
				"z-40 h-[15rem] rounded-xl md:h-[20rem]",
				className,
				showGradient &&
					"bg-neutral-300 [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)] dark:bg-[rgba(40,40,40,0.70)]"
			)}
		>
			{children}
		</div>
	);
}

function Container({ className, children }: { className?: string; children: React.ReactNode }): JSX.Element {
	return (
		<div
			className={cn(
				"flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]",
				className
			)}
		>
			{children}
		</div>
	);
}

function Dot({ className }: { className?: string }): JSX.Element {
	return <div className={cn("h-4 w-4 rounded-full", className)} />;
}

function CopilotGlyph({ className }: { className?: string }): JSX.Element {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
			<path d="M8 8.5A3.5 3.5 0 0 1 11.5 5h1A3.5 3.5 0 0 1 16 8.5v2.2c0 1.1.9 2 2 2v1.8a6 6 0 0 1-12 0V12.7c1.1 0 2-.9 2-2z" />
			<path d="M9 14c1 1 5 1 6 0" />
		</svg>
	);
}

function MetaGlyph({ className }: { className?: string }): JSX.Element {
	return (
		<svg viewBox="0 0 24 24" fill="none" className={className}>
			<path
				d="M3 18c0 1.7.4 3 1 3.8 1 1.3 2.5 2.2 4.6 2.2 2.6 0 4.2-1.1 5.9-3.3l2.8-4 2.1 3c1.2 1.7 2.4 2.3 3.6 2.3 1.9 0 3-1.5 3-3.5 0-2.8-.7-5.8-2.3-8-1.3-1.7-3-2.7-5.2-2.7-1.8 0-3.4 1-5 3.4l-2 3.2-2.1-3.5C8.3 5 6.6 4 4.9 4 2.2 4 0 6.7 0 10.6c0 2.5.7 5.4 3 7.4z"
				fill="currentColor"
				opacity="0.7"
			/>
		</svg>
	);
}
