import type { Meta, StoryObj } from '@storybook/react';
import { Formik, useFormikContext } from 'formik';
import { Flex, Button, Text, Code } from '@radix-ui/themes';
import { DateRangePicker } from './DateRangePicker';

const FormikStateObserver = ({ fieldAlias }: { fieldAlias: string }) => {
  const { values } = useFormikContext<any>();
  const val = values[fieldAlias];
  
  const displayVal = val ? {
    from: val.from instanceof Date ? val.from.toISOString() : val.from,
    to: val.to instanceof Date ? val.to.toISOString() : val.to,
  } : null;

  return (
    <Flex direction="column" gap="1" style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--gray-3)', borderRadius: '8px' }}>
      <Text size="2" weight="bold" color="ruby">Live Formik State:</Text>
      <Code variant="ghost">{JSON.stringify({ [fieldAlias]: displayVal }, null, 2)}</Code>
    </Flex>
  );
};

const meta: Meta<typeof DateRangePicker> = {
  title: 'χForm Components/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
DateRangePicker component with deep Formik integration and material, outline & neumorphic design variants.

### Import
\`\`\`tsx
import { DateRangePicker } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'reservationWindow',
    width: 12,
    inputLabel: 'Select Reservation Window',
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
type Story = StoryObj<typeof DateRangePicker>;

export const Outline: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: null }} onSubmit={() => {}}>
      <DateRangePicker {...args} />
    </Formik>
  ),
  args: { inputtype: 'daterangepicker-outline' },
};

export const Material: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: null }} onSubmit={() => {}}>
      <DateRangePicker {...args} />
    </Formik>
  ),
  args: { inputtype: 'daterangepicker-material' },
};

export const Neumorphic: Story = {
  render: (args) => (
    <div style={{ padding: '32px', backgroundColor: '#e0e5ec', borderRadius: '16px', width: '100%' }}>
      <Formik initialValues={{ [args.alias]: null }} onSubmit={() => {}}>
        <DateRangePicker {...args} />
      </Formik>
    </div>
  ),
  args: { inputtype: 'daterangepicker-neumorphic' },
};

export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      alert(`Range Captured! \n\nFrom: ${values[args.alias]?.from}\nTo: ${values[args.alias]?.to}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: { from: null, to: null } }} 
        validate={(values) => {
          const range = values[args.alias];
          if (!range || !range.from || !range.to) {
            return { [args.alias]: 'Both start and end dates are required.' };
          }
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit }) => (
          <Flex direction="column" gap="4" style={{ width: '100%' }}>
            <DateRangePicker {...args} />
            <FormikStateObserver fieldAlias={args.alias} />
            <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer' }}>
              Confirm Reservation
            </Button>
          </Flex>
        )}
      </Formik>
    );
  },
  args: {
    inputtype: 'daterangepicker-outline',
    inputLabel: 'Hotel Block Dates',
    isHinted: true,
    hintText: 'Select your check-in and check-out dates.',
  },
};