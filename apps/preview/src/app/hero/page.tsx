import Link from 'next/link';
import { variants, variantList } from '@fuse-ui-registry/sections/hero';

export default function HeroVariantsPage(): JSX.Element {
  return (
    <div className="home-container">
      <h1 className="home-title">Hero Section Variants</h1>
      <p className="home-description">
        Select a variant to preview
      </p>
      <div className="kit-list">
        {variantList.map((slug) => {
          const variant = variants[slug];
          return (
            <div key={slug}>
              <Link href={`/hero/${slug}`} className="kit-link">
                {variant.meta.displayName} ({slug})
              </Link>
              <p className="text-sm text-gray-600">{variant.meta.description}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
