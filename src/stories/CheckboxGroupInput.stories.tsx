import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { Flex } from '@radix-ui/themes';
import { CheckboxGroupInput } from './CheckboxGroupInput';

const defaultOptions = [
  { optionid: 1, optionvalue: 'kaiju', text: 'Kaiju Category' },
  { optionid: 2, optionvalue: 'meka', text: 'Meka Division' },
  { optionid: 3, optionvalue: 'zaibatsu', text: 'Zaibatsu Corp' },
];

const meta: Meta<typeof CheckboxGroupInput> = {
  title: 'χForm Components/CheckboxGroupInput',
  component: CheckboxGroupInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
CheckboxGroupInput component with deep Formik integration and material, outline & neumorphic design variants.

### Import
\`\`\`tsx
import { CheckboxGroupInput } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'clearanceLevels',
    width: 12, 
    inputLabel: 'Select VectorSigma Clearance Levels',
    inputOptions: defaultOptions,
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
type Story = StoryObj<typeof CheckboxGroupInput>;


export const Outline: Story = {
  args: {
    inputtype: 'checkbox-outline',
  },
};

export const Material: Story = {
  args: {
    inputtype: 'checkbox-material',
  },
};

/**
 * **Neumorphic Shadow Calculation**
 * The Neumorphic variant dynamically generates its shadows based on the background color of its parent container.
 * Notice how it is wrapped in a container with a defined `backgroundColor` to allow `getNearestParentBackground` to work.
 */
export const Neumorphic: Story = {
  render: (args) => (
    <div style={{ padding: '32px', backgroundColor: '#e0e5ec', borderRadius: '16px', width: '100%' }}>
      <CheckboxGroupInput {...args} />
    </div>
  ),
  args: {
    inputtype: 'checkbox-neumorphic',
  },
};


/**
 * Demonstrates switching the Flex direction to stack the checkboxes vertically instead of inline.
 */
export const ColumnLayout: Story = {
  args: {
    inputtype: 'checkbox-material',
    direction: 'column',
    inputLabel: 'Select Operations (Vertical Stack)',
  },
};

/**
 * Demonstrates using the `columns` prop to force a specific CSS Grid layout (e.g., 2 evenly spaced columns).
 */
export const ExplicitGridColumns: Story = {
  args: {
    inputtype: 'checkbox-outline',
    columns: '1fr 1fr', // Forces exactly two columns
    inputLabel: 'Select Deployment Zones (2-Column Grid)',
    inputOptions: [
      ...defaultOptions,
      { optionid: 4, optionvalue: 'orbital', text: 'Orbital Station' },
    ],
  },
};


/**
 * Demonstrates how the component renders when Formik's initial state already contains selected values.
 */
export const PreSelectedValues: Story = {
  render: (args) => (
    <Formik
      initialValues={{ [args.alias]: ['kaiju', 'zaibatsu'] }}
      onSubmit={() => {}}
    >
      <CheckboxGroupInput {...args} />
    </Formik>
  ),
  args: {
    inputtype: 'checkbox-material',
    inputLabel: 'Pre-Authorized Sectors',
  },
};

/**
 * Demonstrates the error state. The error text turns red because we are forcing Formik's "touched" and "errors" state.
 */
export const WithValidationError: Story = {
  render: (args) => (
    <Formik<Record<string, any>>
      initialValues={{ [args.alias]: [] }}
      initialErrors={{ [args.alias]: 'At least one clearance level must be selected.' }}
      initialTouched={{ [args.alias]: true }}
      onSubmit={() => {}}
    >
      <CheckboxGroupInput {...args} />
    </Formik>
  ),
  args: {
    inputtype: 'checkbox-outline',
    errorText: 'You must select at least one VectorSigma division.',
  },
};

/**
 * Demonstrates a disabled checkbox group with an active tooltip hint.
 */
export const DisabledWithHint: Story = {
  args: {
    inputtype: 'checkbox-material',
    readOnly: true,
    isHinted: true,
    hintText: 'These legacy systems cannot be modified manually.',
    hintUrl: 'https://github.com/emeraldemperaur/vector-sigma',
    inputLabel: 'Legacy Override Protocols',
  },
};