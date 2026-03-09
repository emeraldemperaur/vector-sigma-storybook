import type { Meta, StoryObj } from '@storybook/react';
import { Formik, useFormikContext } from 'formik';
import { Flex, Button, Text, Code } from '@radix-ui/themes';
import { Icon } from '../components/icons/icons';
import { Input } from './input';

const FormikStateObserver = ({ fieldAlias }: { fieldAlias: string }) => {
  const { values } = useFormikContext<any>();
  return (
    <Flex direction="column" gap="1" style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--gray-3)', borderRadius: '8px' }}>
      <Text size="2" weight="bold" color="ruby">Live Formik State:</Text>
      <Code variant="ghost">{JSON.stringify({ [fieldAlias]: values[fieldAlias] || '' }, null, 2)}</Code>
    </Flex>
  );
};

const meta: Meta<typeof Input> = {
  title: 'χForm Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Text Input component with built-in Formik binding.

### Import
\`\`\`tsx
import { Input } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'username',
    width: 12,
    inputLabel: 'Username / Email',
    placeholder: 'Enter your username',
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
type Story = StoryObj<typeof Input>;


export const Outline: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <Input {...args} />
    </Formik>
  ),
  args: { inputvariant: 'input-outline' },
};

export const Material: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <Input {...args} />
    </Formik>
  ),
  args: { inputvariant: 'input-material' },
};

export const Neumorphic: Story = {
  render: (args) => (
    <div style={{ padding: '32px', backgroundColor: '#e0e5ec', borderRadius: '16px', width: '100%' }}>
      <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
        <Input {...args} />
      </Formik>
    </div>
  ),
  args: { inputvariant: 'input-neumorphic' },
};

/**
 * **With Icon & Custom Type:**
 * Demonstrates injecting a React Node into the Radix slot and setting the HTML input type to "email".
 */
export const WithIconAndType: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <Input {...args} />
    </Formik>
  ),
  args: {
    inputvariant: 'input-outline',
    inputtype: 'email',
    inputLabel: 'Contact Email',
    placeholder: 'agent@vector-sigma.com',
    icon: <Icon name="envelope" height="16" width="16" style={{ color: 'var(--gray-10)' }} />,
  },
};

/**
 * **Interactive Form Test:**
 * Type an input, blur the field to trigger touch state, and submit to test validation.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      alert(`Text Captured! \n\nValue: ${values[args.alias]}`);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: '' }} 
        validate={(values) => {
          if (!values[args.alias]) return { [args.alias]: 'This field cannot be empty.' };
          if (values[args.alias].length < 3) return { [args.alias]: 'Must be at least 3 characters.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit }) => (
          <Flex direction="column" gap="4" style={{ width: '100%' }}>
            <Input {...args} />
            <FormikStateObserver fieldAlias={args.alias} />
            <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer' }}>
              Save String
            </Button>
          </Flex>
        )}
      </Formik>
    );
  },
  args: {
    inputvariant: 'input-material',
    inputLabel: 'Project Codename',
    isHinted: true,
    hintText: 'Must be at least 3 characters long.',
  },
};

