import type { Meta, StoryObj } from '@storybook/react';
import { Formik, useFormikContext } from 'formik';
import { Flex, Button, Text, Code } from '@radix-ui/themes';
import { MultipleSelect } from './MultipleSelect';

const FormikStateObserver = ({ fieldAlias }: { fieldAlias: string }) => {
  const { values } = useFormikContext<any>();
  return (
    <Flex direction="column" gap="1" style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--gray-3)', borderRadius: '8px' }}>
      <Text size="2" weight="bold" color="ruby">Live Formik State (Array):</Text>
      <Code variant="ghost">{JSON.stringify({ [fieldAlias]: values[fieldAlias] || [] }, null, 2)}</Code>
      <Text size="1" color="gray" style={{ marginTop: 4 }}>
        MultipleSelect manages an array of string values and joins the display names into a comma-separated list!
      </Text>
    </Flex>
  );
};

const defaultOptions = [
  { optionid: 1, optionvalue: 'module_a', text: 'Telemetry Module' },
  { optionid: 2, optionvalue: 'module_b', text: 'Core Processor' },
  { optionid: 3, optionvalue: 'module_c', text: 'Auxiliary Power' },
  { optionid: 4, optionvalue: 'module_d', text: 'Navigation Array' },
];

const meta: Meta<typeof MultipleSelect> = {
  title: 'χForm Components/MultipleSelect',
  component: MultipleSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Multiple Select component with built-in Formik binding.

### Import
\`\`\`tsx
import { MultipleSelect } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'activeModules',
    width: 12,
    inputLabel: 'Initialize Hardware Modules',
    inputOptions: defaultOptions,
  },
  decorators: [
    (Story) => (
      <Flex justify="center" align="start" style={{ padding: '2rem', width: '100%', maxWidth: '400px', minHeight: '350px' }}>
        <Story />
      </Flex>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MultipleSelect>;


export const Outline: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: [] }} onSubmit={() => {}}>
      <MultipleSelect {...args} />
    </Formik>
  ),
  args: { inputtype: 'multiselect-outline' },
};

export const Material: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: [] }} onSubmit={() => {}}>
      <MultipleSelect {...args} />
    </Formik>
  ),
  args: { inputtype: 'multiselect-material' },
};

export const Neumorphic: Story = {
  render: (args) => (
    <div style={{ padding: '32px', backgroundColor: '#e0e5ec', borderRadius: '16px', width: '100%' }}>
      <Formik initialValues={{ [args.alias]: [] }} onSubmit={() => {}}>
        <MultipleSelect {...args} />
      </Formik>
    </div>
  ),
  args: { inputtype: 'multiselect-neumorphic' },
};


/**
 * **Pre-Filled State:**
 * Demonstrates the component initializing with multiple values already selected in the Formik array.
 * Note how the display text correctly parses the values and joins them with commas.
 */
export const PreFilledState: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: ['module_b', 'module_d'] }} onSubmit={() => {}}>
      <MultipleSelect {...args} />
    </Formik>
  ),
  args: {
    inputtype: 'multiselect-outline',
    inputLabel: 'Pre-flight Check Modules',
  },
};

/**
 * **Interactive Form Test:**
 * Open the popover, select multiple items, click outside to close (triggering the blur/touched state), and submit.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      const selected = values[args.alias];
      alert(`Modules Initialized! \n\nCount: ${selected.length}\nPayload: ${selected.join(', ')}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: [] }} 
        validate={(values) => {
          const selected = values[args.alias];
          if (!selected || selected.length === 0) return { [args.alias]: 'At least one module must be selected.' };
          if (selected.length < 2) return { [args.alias]: 'Select at least 2 modules for redundancy.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit }) => (
          <Flex direction="column" gap="4" style={{ width: '100%' }}>
            <MultipleSelect {...args} />
            <FormikStateObserver fieldAlias={args.alias} />
            <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer' }}>
              Engage Systems
            </Button>
          </Flex>
        )}
      </Formik>
    );
  },
  args: {
    inputtype: 'multiselect-material',
    placeholder: 'Select 2 or more...',
    isHinted: true,
    hintText: 'A minimum of two modules is required for safe operation.',
  },
};