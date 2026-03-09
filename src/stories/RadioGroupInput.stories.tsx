import type { Meta, StoryObj } from '@storybook/react';
import { Formik, useFormikContext } from 'formik';
import { Flex, Button, Text, Code } from '@radix-ui/themes';
import { RadioGroupInput } from './RadioGroupInput';

const FormikStateObserver = ({ fieldAlias }: { fieldAlias: string }) => {
  const { values } = useFormikContext<any>();
  return (
    <Flex direction="column" gap="1" style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--gray-3)', borderRadius: '8px' }}>
      <Text size="2" weight="bold" color="ruby">Live Formik State:</Text>
      <Code variant="ghost">{JSON.stringify({ [fieldAlias]: values[fieldAlias] || '' }, null, 2)}</Code>
    </Flex>
  );
};

const defaultOptions = [
  { optionid: 1, optionvalue: 'standard', text: 'Standard Processing (3-5 days)' },
  { optionid: 2, optionvalue: 'priority', text: 'Priority Node (24 hours)' },
  { optionid: 3, optionvalue: 'immediate', text: 'Immediate Execution' },
];

const meta: Meta<typeof RadioGroupInput> = {
  title: 'χForm Components/RadioGroupInput',
  component: RadioGroupInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
RadioGroupInput component with built-in Formik binding.

### Import
\`\`\`tsx
import { RadioGroupInput } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'processingSpeed',
    width: 12,
    inputLabel: 'Select Execution Priority',
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
type Story = StoryObj<typeof RadioGroupInput>;


export const Outline: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <RadioGroupInput {...args} />
    </Formik>
  ),
  args: { inputtype: 'radio-outline' },
};

export const Material: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <RadioGroupInput {...args} />
    </Formik>
  ),
  args: { inputtype: 'radio-material' },
};

export const Neumorphic: Story = {
  render: (args) => (
    <div style={{ padding: '32px', backgroundColor: '#e0e5ec', borderRadius: '16px', width: '100%' }}>
      <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
        <RadioGroupInput {...args} />
      </Formik>
    </div>
  ),
  args: { inputtype: 'radio-neumorphic' },
};


/**
 * **Row Layout:**
 * Demonstrates switching the Flex direction to layout the radio buttons side-by-side.
 */
export const RowLayout: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <RadioGroupInput {...args} />
    </Formik>
  ),
  args: {
    inputtype: 'radio-outline',
    direction: 'row',
    inputLabel: 'Preferred Communication Channel',
    inputOptions: [
      { optionid: 1, optionvalue: 'email', text: 'Email' },
      { optionid: 2, optionvalue: 'sms', text: 'SMS' },
      { optionid: 3, optionvalue: 'push', text: 'Push Notification' },
    ],
  },
};

/**
 * **Pre-Selected State:**
 * Demonstrates the radio group rendering with an option already selected via Formik initialization.
 */
export const PreSelectedState: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: 'priority' }} onSubmit={() => {}}>
      <RadioGroupInput {...args} />
    </Formik>
  ),
  args: {
    inputtype: 'radio-material',
  },
};


/**
 * **Interactive Form Test:**
 * Select an option to see the Formik state update. Submit without selecting an option to trigger the error state.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      alert(`Priority Set! \n\nValue: ${values[args.alias]}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: '' }} 
        validate={(values) => {
          if (!values[args.alias]) return { [args.alias]: 'You must select an execution priority.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit }) => (
          <Flex direction="column" gap="4" style={{ width: '100%' }}>
            <RadioGroupInput {...args} />
            <FormikStateObserver fieldAlias={args.alias} />
            <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer' }}>
              Confirm Execution Protocol
            </Button>
          </Flex>
        )}
      </Formik>
    );
  },
  args: {
    inputtype: 'radio-outline',
    isHinted: true,
    hintText: 'Immediate execution incurs a 15% priority processing fee.',
  },
};