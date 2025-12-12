import * as React from 'react';
import type { Kit, Section } from '@fuse-ui-registry/template-core';

interface KitRendererProps {
  kit: Kit;
}

export function KitRenderer({ kit }: KitRendererProps) {
  return (
    <div className="kit-container">
      <h1 className="kit-title">{kit.name}</h1>
      <p className="kit-description">{kit.description}</p>
      <div className="kit-sections">
        {kit.sections.map((section, index) => (
          <SectionRenderer key={index} section={section} />
        ))}
      </div>
    </div>
  );
}

interface SectionRendererProps {
  section: Section;
}

function SectionRenderer({ section }: SectionRendererProps) {
  return (
    <section className="section">
      <h2 className="section-title">{section.title}</h2>
      <div className="section-content">{section.content}</div>
    </section>
  );
}
