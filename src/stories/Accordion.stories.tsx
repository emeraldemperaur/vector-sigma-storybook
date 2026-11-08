import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, type AccordionProps } from './Accordion';
import { Icon } from '../components/icons/icons';

interface StoryProps extends AccordionProps {
  itemTitle: string;
  itemSubtitle?: string;
  itemDisabled: boolean;
}

const meta = {
  title: 'χForm Layout/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A robust, ARIA-compliant accordion container supporting multiple enterprise design systems (Outline, Material, Neumorphic). It manages state for nested \`AccordionItem\` primitives.

**Required Composition:**
1. \`<Accordion>\` (The wrapper/provider)
2. \`<AccordionItem>\` (The individual collapsible sections)

### Import
\`\`\`tsx
import { Accordion, AccordionItem } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
      source: {
        transform: (code: string) => {
          if (code.includes("import { Accordion, AccordionItem }")) {
            return code;
          }
          return `import { Accordion, AccordionItem } from './Accordion';\n\n${code}`;
        },
      },
    },
  },
  argTypes: {
    design: {
      control: 'radio',
      options: ['outline', 'material', 'neumorphic'],
      description: 'The architectural design variation of the Accordion.',
      table: { category: 'Accordion (Parent)', defaultValue: { summary: "'outline'" } },
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Permit multiple sections to remain open concurrently.',
      table: { category: 'Accordion (Parent)', defaultValue: { summary: 'false' } },
    },
    defaultOpenId: {
      control: 'text',
      description: 'The `sectionId` of the accordion item to open by default on mount.',
      table: { category: 'Accordion (Parent)' },
    },
    brandcolor: {
      control: 'color',
      description: 'Custom background color for AccordionItem headers.',
      table: { category: 'Accordion (Parent)' },
    },
    titleColor: {
      control: 'color',
      description: 'Explicit text and icon color for headers to guarantee legibility.',
      table: { category: 'Accordion (Parent)' },
    },
    width: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Responsive viewport column span (1-12).',
      table: { category: 'Accordion (Parent)', defaultValue: { summary: '12' } },
    },
    newRow: {
      control: 'boolean',
      description: 'Forces the component to break onto a new flex/grid row.',
      table: { category: 'Accordion (Parent)', defaultValue: { summary: 'false' } },
    },

    itemTitle: {
      name: 'title',
      control: 'text',
      description: 'The header text for the accordion section.',
      table: { category: 'AccordionItem (Child)' },
    },
    itemSubtitle: {
      name: 'subtitle',
      control: 'text',
      description: 'The subheader text for the accordion section.',
      table: { category: 'AccordionItem (Child)' },
    },
    itemDisabled: {
      name: 'disabled',
      control: 'boolean',
      description: 'Disables the accordion item, rendering it unclickable.',
      table: { category: 'AccordionItem (Child)', defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<StoryProps>;

export default meta;
type Story = StoryObj<StoryProps>;

/**
 * Standard composition of AccordionItem primitives.
 * The first item maps directly to the Storybook Controls for live interactive testing.
 */
const renderAccordion = (args: StoryProps) => (
  <Accordion {...args}>
    <AccordionItem 
      sectionId="faq-1" 
      title={args.itemTitle} 
      subtitle={args.itemSubtitle}
      disabled={args.itemDisabled}
      icon={<Icon name="layers" />}
    >
      VectorSigma is an enterprise-grade form orchestration engine that decouples state management from UI rendering, utilizing strict ARIA compliance and multi-layered validation schemas.
    </AccordionItem>
    
    <AccordionItem 
      sectionId="faq-2" 
      title="How does Architectural Theming work?" 
      icon={<Icon name="colorwheel" />}
    >
      By injecting specific CSS variables at the root level, the entire component matrix morphs to adapt to Material, Outline, or Neumorphic design languages dynamically.
    </AccordionItem>
    
    <AccordionItem 
      sectionId="faq-3" 
      title="Restricted Configuration" 
      subtitle="Requires elevated permissions"
      icon={<Icon name="lock" />}
      disabled
    >
      This content is inaccessible because the AccordionItem is disabled.
    </AccordionItem>
  </Accordion>
);

export const Outline: Story = {
  render: renderAccordion,
  args: {
    design: 'outline',
    allowMultiple: false,
    width: 12,
    itemTitle: 'What is the VectorSigma Protocol?',
    itemSubtitle: 'Overview of the core engine',
    itemDisabled: false,
  },
};

export const Material: Story = {
  render: renderAccordion,
  args: {
    design: 'material',
    defaultOpenId: 'faq-1',
    allowMultiple: true,
    width: 12,
    itemTitle: 'What is the VectorSigma Protocol?',
    itemSubtitle: 'Overview of the core engine',
    itemDisabled: false,
  },
};

export const Neumorphic: Story = {
  render: renderAccordion,
  args: {
    design: 'neumorphic',
    width: 12,
    itemTitle: 'What is the VectorSigma Protocol?',
    itemSubtitle: 'Overview of the core engine',
    itemDisabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '40px', backgroundColor: '#e0e5ec', borderRadius: '16px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Neumorphic design relies heavily on shadow casting against a matching background. The parent container must have a non-white/non-black background color (e.g., `#e0e5ec`) for the extrusion effect to render properly.',
      },
    },
  },
};

/**
 * **Custom Branding:**
 * Demonstrates injecting specific brand and text colors to override the default transparent headers.
 */
export const CustomBranding: Story = {
  render: renderAccordion,
  args: {
    design: 'outline',
    brandcolor: 'var(--ruby-9, #E54D2E)',
    titleColor: '#ffffff',
    defaultOpenId: 'faq-2',
    width: 12,
    itemTitle: 'What is the VectorSigma Protocol?',
    itemSubtitle: 'Overview of the core engine',
    itemDisabled: false,
  },
};