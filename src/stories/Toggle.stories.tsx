import type { Meta, StoryObj } from '@storybook/react';
import { Formik, useFormikContext } from 'formik';
import { Flex, Button, Text, Code } from '@radix-ui/themes';
import { Toggle } from './toggle';

const FormikStateObserver = ({ fieldAlias }: { fieldAlias: string }) => {
  const { values } = useFormikContext<any>();
  return (
    <Flex direction="column" gap="1" style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--gray-3)', borderRadius: '8px' }}>
      <Text size="2" weight="bold" color="ruby">Live Formik State (Boolean):</Text>
      <Code variant="ghost">{JSON.stringify({ [fieldAlias]: values[fieldAlias] || false }, null, 2)}</Code>
    </Flex>
  );
};

const meta: Meta<typeof Toggle> = {
  title: 'χForm Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A boolean toggle component. 

*Note:* The \`outline\` and \`material\` variants render as Radix toggle buttons and accept \`children\` text. The \`neumorphic\` variant renders as a physical sliding switch.

### Import
\`\`\`tsx
import { Toggle } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'enableTelemetry',
    width: 12,
    inputLabel: 'Enable Telemetry Data',
  },
  argTypes: {
    onClick: { action: 'clicked' } 
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
type Story = StoryObj<typeof Toggle>;


export const Outline: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: false }} onSubmit={() => {}}>
      <Toggle {...args} />
    </Formik>
  ),
  args: { 
    inputtype: 'toggle-outline',
    children: 'Telemetry Disabled', 
  },
};

export const Material: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: true }} onSubmit={() => {}}>
      <Toggle {...args} />
    </Formik>
  ),
  args: { 
    inputtype: 'toggle-material',
    children: 'Telemetry Active',
  },
};

/**
 * **Neumorphic Switch:**
 * This variant drops the \`children\` text and instead renders a highly stylized physical CSS switch.
 * The \`icon\` prop is rendered to the right of the switch.
 */
export const Neumorphic: Story = {
  render: (args) => (
    <div style={{ padding: '32px', backgroundColor: '#e0e5ec', borderRadius: '16px', width: '100%' }}>
      <Formik initialValues={{ [args.alias]: false }} onSubmit={() => {}}>
        <Toggle {...args} />
      </Formik>
    </div>
  ),
  args: { 
    inputtype: 'toggle-neumorphic',
    icon: 'activityLog',
  },
};


/**
 * **Interactive Form Test:**
 * Click the toggle, observe the boolean state flip in the observer, and test the Formik submission hook.
 * We also pass a mock \`onClick\` to demonstrate external event interception.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      const isEnabled = values[args.alias];
      alert(`Settings Saved! \n\nTelemetry is currently: ${isEnabled ? 'ACTIVE' : 'INACTIVE'}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: false }} 
        validate={(values) => {
          if (!values[args.alias]) return { [args.alias]: 'You must accept telemetry collection to proceed.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit }) => (
          <Flex direction="column" gap="4" style={{ width: '100%' }}>
            <Toggle 
              {...args} 
              onClick={() => console.log('External onClick fired on Toggle!')} 
            />
            <FormikStateObserver fieldAlias={args.alias} />
            <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer' }}>
              Save Configuration
            </Button>
          </Flex>
        )}
      </Formik>
    );
  },
  args: {
    inputtype: 'toggle-material',
    inputLabel: 'Required Diagnostic Logs',
    children: 'Acknowledge',
    isHinted: true,
    hintText: 'Toggle this on to agree to our data collection policies.',
  },
};