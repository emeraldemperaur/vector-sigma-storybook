import type { Meta, StoryObj } from '@storybook/react';
import { Formik, useFormikContext } from 'formik';
import { Flex, Button, Text, Code } from '@radix-ui/themes';
import { DatePicker } from './DatePicker';

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

const meta: Meta<typeof DatePicker> = {
  title: 'χForm Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
DatePicker component with deep Formik integration and material, outline & neumorphic design variants.

### Import
\`\`\`tsx
import { DatePicker } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'citizenshipDate',
    width: 12,
    inputLabel: 'Citizenship Date',
  },
  decorators: [
    (Story) => (
      <Flex justify="center" align="start" style={{ padding: '2rem', width: '100%', maxWidth: '400px', minHeight: '450px' }}>
        <Story />
      </Flex>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;


export const Outline: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: null }} onSubmit={() => {}}>
      <DatePicker {...args} />
    </Formik>
  ),
  args: { inputtype: 'datepicker-outline' },
};

export const Material: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: null }} onSubmit={() => {}}>
      <DatePicker {...args} />
    </Formik>
  ),
  args: { inputtype: 'datepicker-material' },
};

export const Neumorphic: Story = {
  render: (args) => (
    <div style={{ padding: '32px', backgroundColor: '#e0e5ec', borderRadius: '16px', width: '100%' }}>
      <Formik initialValues={{ [args.alias]: null }} onSubmit={() => {}}>
        <DatePicker {...args} />
      </Formik>
    </div>
  ),
  args: { inputtype: 'datepicker-neumorphic' },
};


export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      alert(`Date Captured! \n\nValue: ${values[args.alias]}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: null }} 
        validate={(values) => {
          if (!values[args.alias]) return { [args.alias]: 'Please select a valid date.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit }) => (
          <Flex direction="column" gap="4" style={{ width: '100%' }}>
            <DatePicker {...args} />
            <FormikStateObserver fieldAlias={args.alias} />
            <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer' }}>
              Submit Date
            </Button>
          </Flex>
        )}
      </Formik>
    );
  },
  args: {
    inputtype: 'datepicker-outline',
    inputLabel: 'Schedule Deployment',
    isHinted: true,
    hintText: 'Select the exact date the system should go live.',
  },
};