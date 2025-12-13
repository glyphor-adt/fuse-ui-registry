import React from "react";
import type { RegistryItemMeta } from "../../types";

const GridBackgroundPreview = () => {
  return (
    <div className="h-[50rem] w-full bg-black bg-grid-white/[0.1] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Backgrounds
      </p>
    </div>
  );
};

export default GridBackgroundPreview;

export const aceternityGridMeta = {
	id: "aceternity/ui/grid",
	provider: "aceternity",
	kind: "ui",
	name: "grid",
	title: "Grid",
	categories: [],
	tags: [],
	source: {
		registryUrl: "https://ui.aceternity.com/registry/grid.json",
		docsUrl: "https://ui.aceternity.com/components/grid",
	},
} satisfies RegistryItemMeta;
