import Link from 'next/link';
import { variants, variantList } from '@fuse-ui-registry/sections/hero';
import { notFound } from 'next/navigation';

interface HeroVariantPageProps {
  params: {
    variant: string;
  };
}

export default function HeroVariantPage({ params }: HeroVariantPageProps): JSX.Element {
  const { variant: variantSlug } = params;
  
  // Check if variant exists
  if (!variantList.includes(variantSlug as any)) {
    notFound();
  }
  
  const variant = variants[variantSlug as keyof typeof variants];
  const { Component, presets, meta } = variant;
  
  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/hero" className="text-blue-600 hover:underline">
          ← Back to variants
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-2">{meta.displayName}</h1>
      <p className="text-gray-600 mb-8">{meta.description}</p>
      
      <div className="space-y-12">
        {presets.map((preset, index) => (
          <div key={index} className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Preset: {preset.name}</h2>
            <div className="bg-gray-50 p-6 rounded">
              <Component {...preset.props} />
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900">
                View props
              </summary>
              <pre className="mt-2 text-xs bg-gray-100 p-4 rounded overflow-auto">
                {JSON.stringify(preset.props, null, 2)}
              </pre>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return variantList.map((variant) => ({
    variant,
  }));
}
