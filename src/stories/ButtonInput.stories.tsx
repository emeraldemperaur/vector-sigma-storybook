import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '@radix-ui/themes';
import { PlayIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { ButtonInput } from './ButtonInput';

const meta: Meta<typeof ButtonInput> = {
  title: 'χForm Components/ButtonInput',
  component: ButtonInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
ButtonInput component with deep Formik integration and material, outline & neumorphic design variants.

### Import
\`\`\`tsx
import { ButtonInput } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'primaryAction',
    width: 4,
    children: 'Execute Action',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    size: {
      control: 'select',
      options: ['1', '2', '3', '4'],
    },
  },
  decorators: [
    (Story) => (
      <Flex justify="center" align="center" style={{ padding: '2rem', width: '100%' }}>
        <Story />
      </Flex>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ButtonInput>;


export const Outline: Story = {
  args: {
    inputtype: 'button-outline',
    size: '3',
    color: 'ruby',
  },
};

export const Material: Story = {
  args: {
    inputtype: 'button-material',
    size: '3',
    color: 'indigo', 
  },
};

/**
 * **Note on Neumorphic Design:**
 * The Neumorphic button calculates its shadows based on its parent container's background color.
 * It must be placed inside a container with a defined `backgroundColor` (like `#e0e5ec` or `#212529`) 
 * for the `getNearestParentBackground` utility to generate the correct CSS variables.
 */
export const Neumorphic: Story = {
  render: (args) => (
    // Explicitly defining a background so the util functions have a solid color to calculate from
    <div style={{ padding: '40px', backgroundColor: '#e0e5ec', borderRadius: '16px' }}>
      <ButtonInput {...args} />
    </div>
  ),
  args: {
    inputtype: 'button-neumorphic',
    size: '3',
    children: 'Initialize Vector',
  },
};

// --- FEATURES & STATES ---

/**
 * Demonstrates passing a standard React Node (like a Radix Icon) into the `icon` prop.
 */
export const WithIcon: Story = {
  args: {
    inputtype: 'button-material',
    color: 'green',
    size: '3',
    icon: <PlayIcon width="18" height="18" />,
    children: 'Deploy Instance',
  },
};

/**
 * Demonstrates the read-only (disabled) state coupled with a contextual hint tooltip.
 */
export const DisabledWithHint: Story = {
  args: {
    inputtype: 'button-outline',
    color: 'gray',
    size: '3',
    readOnly: true,
    isHinted: true,
    hintText: 'You lack sufficient clearance to initiate this action.',
    icon: <LockClosedIcon width="16" height="16" />,
    children: 'Restricted Access',
  },
};

/**
 * Full width configuration, common for form submission buttons at the bottom of a modal or card.
 */
export const FullWidthSubmit: Story = {
  args: {
    inputtype: 'button-material',
    width: 12, // Expands to fill the 12-column grid
    size: '4',
    color: 'ruby',
    children: 'Submit Payload',
  },
};