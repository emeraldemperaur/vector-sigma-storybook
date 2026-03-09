import type { Meta, StoryObj } from '@storybook/react';
import { Formik, useFormikContext } from 'formik';
import { Flex, Button, Text, Code } from '@radix-ui/themes';
import { PhoneInput } from './phoneInput';

const FormikStateObserver = ({ fieldAlias }: { fieldAlias: string }) => {
  const { values } = useFormikContext<any>();
  return (
    <Flex direction="column" gap="1" style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--gray-3)', borderRadius: '8px' }}>
      <Text size="2" weight="bold" color="ruby">Live Formik Payload (E.164):</Text>
      <Code variant="ghost">{JSON.stringify({ [fieldAlias]: values[fieldAlias] || '' }, null, 2)}</Code>
      <Text size="1" color="gray">Note :: Automatically formats the backend payload to strict E.164 format (+1234567890).</Text>
    </Flex>
  );
};

const meta: Meta<typeof PhoneInput> = {
  title: 'χForm Components/PhoneInput',
  component: PhoneInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Phone Number Input component with built-in Formik binding.

### Import
\`\`\`tsx
import { PhoneInput } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'contactPhone',
    width: 12,
    inputLabel: 'Mobile Number',
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
type Story = StoryObj<typeof PhoneInput>;

export const Outline: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <PhoneInput {...args} />
    </Formik>
  ),
  args: { inputvariant: 'input-outline' },
};

export const Material: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <PhoneInput {...args} />
    </Formik>
  ),
  args: { inputvariant: 'input-material' },
};

export const InteractiveFormTest: Story = {
  render: (args) => {
    return (
      <Formik 
        initialValues={{ [args.alias]: '' }} 
        validate={(values) => {
          if (!values[args.alias] || values[args.alias].length < 10) {
            return { [args.alias]: 'A valid phone number is required.' };
          }
          return {};
        }}
        onSubmit={(values) => alert(`SMS Payload Ready! \n\nSending to: ${values[args.alias]}`)}
      >
        {({ handleSubmit }) => (
          <Flex direction="column" gap="4" style={{ width: '100%' }}>
            <PhoneInput {...args} />
            <FormikStateObserver fieldAlias={args.alias} />
            <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer' }}>
              Send Verification SMS
            </Button>
          </Flex>
        )}
      </Formik>
    );
  },
  args: {
    inputvariant: 'input-outline',
    inputLabel: '2FA Verification Number',
    isHinted: true,
    hintText: 'Select your country code from the dropdown.',
  },
};