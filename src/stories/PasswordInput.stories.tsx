import type { Meta, StoryObj } from '@storybook/react';
import { Formik, useFormikContext } from 'formik';
import { Flex, Button, Text, Code } from '@radix-ui/themes';
import { PasswordInput } from './passwordInput';

const FormikStateObserver = ({ fieldAlias }: { fieldAlias: string }) => {
  const { values } = useFormikContext<any>();
  return (
    <Flex direction="column" gap="1" style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--gray-3)', borderRadius: '8px' }}>
      <Text size="2" weight="bold" color="ruby">Live Formik State (Unmasked):</Text>
      <Code variant="ghost">{JSON.stringify({ [fieldAlias]: values[fieldAlias] || '' }, null, 2)}</Code>
    </Flex>
  );
};

const meta: Meta<typeof PasswordInput> = {
  title: 'χForm Components/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Password Input component with built-in Formik binding.

### Import
\`\`\`tsx
import { PasswordInput } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'userPassword',
    width: 12,
    inputLabel: 'Secure Password',
    placeholder: 'Enter your password...',
  },
  decorators: [
    (Story) => (
      <Flex justify="center" align="start" style={{ padding: '2rem', width: '100%', maxWidth: '400px' }}>
        <Story />
      </Flex>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Outline: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <PasswordInput {...args} />
    </Formik>
  ),
  args: { inputvariant: 'input-outline' },
};

export const Material: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <PasswordInput {...args} />
    </Formik>
  ),
  args: { inputvariant: 'input-material' },
};

export const InteractiveFormTest: Story = {
  render: (args) => {
    return (
      <Formik 
        initialValues={{ [args.alias]: 'Secr3tPayload!' }} 
        validate={(values) => {
          if (!values[args.alias] || values[args.alias].length < 8) {
            return { [args.alias]: 'Password must be at least 8 characters.' };
          }
          return {};
        }}
        onSubmit={(values) => alert(`Password saved securely! \n\nValue: ${values[args.alias]}`)}
      >
        {({ handleSubmit }) => (
          <Flex direction="column" gap="4" style={{ width: '100%' }}>
            <PasswordInput {...args} />
            <FormikStateObserver fieldAlias={args.alias} />
            <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer' }}>
              Update Password
            </Button>
          </Flex>
        )}
      </Formik>
    );
  },
  args: {
    inputvariant: 'input-outline',
    inputLabel: 'New Passphrase',
    isHinted: true,
    hintText: 'Click the eye icon to toggle visibility.',
  },
};