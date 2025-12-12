import Link from 'next/link';
import { templateConfig } from '../../../../content/template.config';
import { loadTemplateConfig } from '@fuse-ui-registry/template-kits';
import { KitRenderer } from '@fuse-ui-registry/ui';
import { getKitById } from '@fuse-ui-registry/template-core';

export default function Home({
  searchParams,
}: {
  searchParams: { kit?: string };
}) {
  const kitId = searchParams.kit;

  if (!kitId) {
    const validatedConfig = loadTemplateConfig(templateConfig);
    
    return (
      <div className="home-container">
        <h1 className="home-title">Fuse UI Registry - Kit Preview</h1>
        <p className="home-description">
          Select a kit to preview by using the ?kit= query parameter
        </p>
        <div className="kit-list">
          <h2 className="text-2xl font-semibold mb-4">Available Kits:</h2>
          {validatedConfig.kits.map((kit) => (
            <div key={kit.id}>
              <Link href={`/?kit=${kit.id}`} className="kit-link">
                {kit.name} ({kit.id})
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const validatedConfig = loadTemplateConfig(templateConfig);
  const kit = getKitById(validatedConfig, kitId);

  if (!kit) {
    return (
      <div className="error-container">
        <h1 className="error-title">Kit Not Found</h1>
        <p className="error-message">
          The kit &quot;{kitId}&quot; does not exist.
        </p>
        <div className="kit-list">
          <h2 className="text-xl font-semibold mb-3">Available Kits:</h2>
          {validatedConfig.kits.map((k) => (
            <div key={k.id}>
              <Link href={`/?kit=${k.id}`} className="kit-link">
                {k.name} ({k.id})
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <KitRenderer kit={kit} />;
}
