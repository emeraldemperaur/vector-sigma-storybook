import type { Meta, StoryObj } from '@storybook/react';
import { Formik, useFormikContext } from 'formik';
import { Flex, Button, Text, Code } from '@radix-ui/themes';
import { DateTimePicker } from './DatetimePicker';

const FormikStateObserver = ({ fieldAlias }: { fieldAlias: string }) => {
  const { values } = useFormikContext<any>();
  const val = values[fieldAlias];
  const displayVal = val instanceof Date ? val.toISOString() : val;
  
  return (
    <Flex direction="column" gap="1" style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--gray-3)', borderRadius: '8px' }}>
      <Text size="2" weight="bold" color="ruby">Live Formik State:</Text>
      <Code variant="ghost">{JSON.stringify({ [fieldAlias]: displayVal || null }, null, 2)}</Code>
    </Flex>
  );
};

const meta: Meta<typeof DateTimePicker> = {
  title: 'χForm Components/DateTimePicker',
  component: DateTimePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
DateTimePicker component with deep Formik integration and material, outline & neumorphic design variants.

### Import
\`\`\`tsx
import { DateTimePicker } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'launchDateTime',
    width: 12,
    inputLabel: 'Select Date & Time',
  },
  decorators: [
    (Story) => (
      <Flex justify="center" align="start" style={{ padding: '2rem', width: '100%', maxWidth: '450px', minHeight: '450px' }}>
        <Story />
      </Flex>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

export const Outline: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: null }} onSubmit={() => {}}>
      <DateTimePicker {...args} />
    </Formik>
  ),
  args: { inputtype: 'datetimepicker-outline' },
};

export const Material: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: null }} onSubmit={() => {}}>
      <DateTimePicker {...args} />
    </Formik>
  ),
  args: { inputtype: 'datetimepicker-material' },
};

export const Neumorphic: Story = {
  render: (args) => (
    <div style={{ padding: '32px', backgroundColor: '#e0e5ec', borderRadius: '16px', width: '100%' }}>
      <Formik initialValues={{ [args.alias]: null }} onSubmit={() => {}}>
        <DateTimePicker {...args} />
      </Formik>
    </div>
  ),
  args: { inputtype: 'datetimepicker-neumorphic' },
};

export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      alert(`Timestamp Captured! \n\nValue: ${values[args.alias]}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: null }} 
        validate={(values) => {
          if (!values[args.alias]) return { [args.alias]: 'Exact date and time is required.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit }) => (
          <Flex direction="column" gap="4" style={{ width: '100%' }}>
            <DateTimePicker {...args} />
            <FormikStateObserver fieldAlias={args.alias} />
            <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer' }}>
              Set Launch Window
            </Button>
          </Flex>
        )}
      </Formik>
    );
  },
  args: {
    inputtype: 'datetimepicker-outline',
    inputLabel: 'ESPP Enrollment Window (Start)',
    isHinted: true,
    hintText: 'Time is recorded in your local browser timezone.',
  },
};