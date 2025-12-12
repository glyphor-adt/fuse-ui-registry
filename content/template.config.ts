export const templateConfig = {
  kits: [
    {
      id: 'hero',
      name: 'Hero Kit',
      description: 'A beautiful hero section for landing pages',
      sections: [
        {
          title: 'Main Hero',
          content: 'Build amazing user interfaces with our component library',
        },
        {
          title: 'Features',
          content: 'Fast, reliable, and easy to use',
        },
      ],
    },
    {
      id: 'pricing',
      name: 'Pricing Kit',
      description: 'Modern pricing tables for your products',
      sections: [
        {
          title: 'Pricing Plans',
          content: 'Choose the plan that fits your needs',
        },
        {
          title: 'Enterprise',
          content: 'Contact us for custom enterprise solutions',
        },
      ],
    },
    {
      id: 'contact',
      name: 'Contact Kit',
      description: 'Contact forms and information sections',
      sections: [
        {
          title: 'Get in Touch',
          content: 'We would love to hear from you',
        },
        {
          title: 'Contact Information',
          content: 'Reach out through email or phone',
        },
      ],
    },
  ],
} as const;
