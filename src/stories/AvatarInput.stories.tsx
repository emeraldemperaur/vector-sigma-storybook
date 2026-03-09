import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { Flex } from '@radix-ui/themes';
import { AvatarInput } from './AvatarInput';

const meta: Meta<typeof AvatarInput> = {
  title: 'χForm Components/AvatarInput',
  component: AvatarInput,
  tags: ['autodocs'],
   parameters: {
    docs: {
      description: {
        component: `
AvatarInput component with deep Formik integration and material, outline & neumorphic design variants.

### Import
\`\`\`tsx
import { AvatarInput } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'profilePicture',
    width: 12,
    size: 120,
    inputLabel: 'Upload VΣ Profile',
  },
  decorators: [
    (Story) => (
      <Flex justify="center" align="center" style={{ padding: '2rem' }}>
        <Story />
      </Flex>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AvatarInput>;


export const Outline: Story = {
  args: {
    inputtype: 'avatar-outline',
    shape: 'circle',
  },
};

export const Material: Story = {
  args: {
    inputtype: 'avatar-material',
    shape: 'rounded',
  },
};

export const Neumorphic: Story = {
  args: {
    inputtype: 'avatar-neumorphic',
    shape: 'circle',
  },
};


export const SquareShape: Story = {
  args: {
    inputtype: 'avatar-material',
    shape: 'square',
    size: 150,
  },
};


/**
 * Demonstrates how the component renders when Formik state already contains an image URL.
 */
export const WithImagePreview: Story = {
  render: (args) => (
    // Local Formik wrapper to inject a pre-filled value
    <Formik
      initialValues={{ [args.alias]: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80' }}
      onSubmit={() => {}}
    >
      <AvatarInput {...args} />
    </Formik>
  ),
  args: {
    inputtype: 'avatar-material',
    shape: 'circle',
  },
};

/**
 * Demonstrates the error state. The border turns red and the error text appears
 * because we are forcing Formik's "touched" and "errors" state to be true.
 */
export const WithValidationError: Story = {
  render: (args) => (
    <Formik
      initialValues={{ [args.alias]: null }}
      initialErrors={{ [args.alias]: 'Required' }}
      initialTouched={{ [args.alias]: true }}
      onSubmit={() => {}}
    >
      <AvatarInput {...args} />
    </Formik>
  ),
  args: {
    inputtype: 'avatar-outline',
    errorText: 'A profile image is required for VectorSigma Plus.',
  },
};

// --- HINTS AND TOOLTIPS ---

/**
 * Demonstrates the tooltip hint rendering next to the label.
 */
export const WithHintTooltip: Story = {
  args: {
    inputtype: 'avatar-neumorphic',
    isHinted: true,
    hintText: 'Upload a square image, at least 400x400px. Max size 2MB.',
    hintUrl: 'https://github.com/emeraldemperaur/vector-sigma',
  },
};