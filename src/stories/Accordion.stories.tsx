import type { Meta, StoryObj } from '@storybook/react';
import { Flex, Text, Button } from '@radix-ui/themes';
import { Icon } from '../components/icons/icons';
import { Accordion, AccordionItem } from './accordion';

const meta: Meta<typeof Accordion> = {
  title: 'χForm Layout/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Accordion xForm layout component. Used in tandem with \`AccordionItem\`.

### Import
\`\`\`tsx
import { Accordion, AccordionItem } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    width: 12,
  },
  decorators: [
    (Story) => (
      <Flex justify="center" align="start" style={{ padding: '2rem', width: '100%', maxWidth: '600px' }}>
        <Story />
      </Flex>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

// --- HELPER COMPONENT FOR STORIES ---
const MockAccordionContent = () => (
  <Flex direction="column" gap="4">
    <Text size="2" color="gray">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Text>
    <Button variant="soft" size="2" style={{ alignSelf: 'flex-start' }}>Action Button</Button>
  </Flex>
);

// --- DESIGN VARIANTS ---

export const Outline: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem sectionId="sec-1" title="Account Details" subtitle="Manage your profile">
        <MockAccordionContent />
      </AccordionItem>
      <AccordionItem sectionId="sec-2" title="Billing & Invoicing" subtitle="View past transactions">
        <MockAccordionContent />
      </AccordionItem>
      <AccordionItem sectionId="sec-3" title="Danger Zone" disabled>
        <Text color="red">This section is currently disabled.</Text>
      </AccordionItem>
    </Accordion>
  ),
  args: { design: 'outline' },
};

export const Material: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem sectionId="sec-1" title="System Settings" icon={<Icon name="gear" />}>
        <MockAccordionContent />
      </AccordionItem>
      <AccordionItem sectionId="sec-2" title="API Keys" icon={<Icon name="lockclosed" />}>
        <MockAccordionContent />
      </AccordionItem>
    </Accordion>
  ),
  args: { design: 'material' },
};

export const Neumorphic: Story = {
  render: (args) => (
    <div style={{ padding: '32px', backgroundColor: '#e0e5ec', borderRadius: '16px', width: '100%' }}>
      <Accordion {...args}>
        <AccordionItem sectionId="sec-1" title="Telemetry Logs">
          <MockAccordionContent />
        </AccordionItem>
        <AccordionItem sectionId="sec-2" title="Diagnostics">
          <MockAccordionContent />
        </AccordionItem>
      </Accordion>
    </div>
  ),
  args: { design: 'neumorphic' },
};

// --- ADVANCED FEATURES ---

/**
 * **Custom Branding & Multiple Open:**
 * Demonstrates overriding the default colors and allowing multiple panels to remain open simultaneously.
 */
export const CustomBrandingAndMultiple: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem sectionId="sec-1" title="Phase 1: Initiation" icon={<Icon name="check" />}>
        <MockAccordionContent />
      </AccordionItem>
      <AccordionItem sectionId="sec-2" title="Phase 2: Execution" icon={<Icon name="lightningbolt" />}>
        <MockAccordionContent />
      </AccordionItem>
      <AccordionItem sectionId="sec-3" title="Phase 3: Review">
        <MockAccordionContent />
      </AccordionItem>
    </Accordion>
  ),
  args: {
    design: 'outline',
    brandcolor: 'var(--ruby-9)',
    titleColor: 'white',
    allowMultiple: true,
    defaultOpenId: 'sec-2', // Opens the middle panel by default
  },
};