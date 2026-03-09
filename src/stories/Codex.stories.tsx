import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { Flex, Text, TextField } from '@radix-ui/themes';
import { Icon } from '../components/icons/icons';
import { Codex, CodexItem } from './codex';
import { CodexControls } from './codexcontrols';
import { Input } from './input';

const meta: Meta<typeof Codex> = {
  title: 'χForm Layout/Codex',
  component: Codex,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Codex (Stepper) layout component for building multi-step forms.

**Required Composition:**
1. \`<Codex>\` (The wrapper/provider)
2. \`<CodexItem>\` (The individual step views)
3. \`<CodexControls>\` (The navigation buttons, rendered *inside* CodexItem)

### Import
\`\`\`tsx
import { Codex, CodexItem, CodexControls } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    width: 12,
  },
  decorators: [
    (Story) => (
      <Flex justify="center" align="start" style={{ padding: '2rem', width: '100%', maxWidth: '700px' }}>
        <Story />
      </Flex>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Codex>;


const MockCodexApp = (args: any) => {
  return (
    <Formik 
      initialValues={{ firstName: '', lastName: '', password: '' }} 
      onSubmit={(values) => alert(`Wizard Complete! \n\n${JSON.stringify(values, null, 2)}`)}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Codex {...args}>
            
            <CodexItem stepId="step-1" title="Account" subtitleDescription="Basic Info" icon={<Icon name="user" />}>
              <Flex direction="column" gap="4">
                <Text size="3" weight="bold">Create your account</Text>
                <Input alias="firstName" inputLabel="First Name" width={12} />
                <Input alias="lastName" inputLabel="Last Name" width={12} />
                
                <CodexControls nextStepId="step-2" />
              </Flex>
            </CodexItem>

            <CodexItem stepId="step-2" title="Security" subtitleDescription="Set Password" icon={<Icon name="lockclosed" />}>
              <Flex direction="column" gap="4">
                <Text size="3" weight="bold">Secure your data</Text>
                <TextField.Root placeholder="Enter highly secure password..." type="password" />
                
                <CodexControls prevStepId="step-1" nextStepId="step-3" />
              </Flex>
            </CodexItem>

            <CodexItem stepId="step-3" title="Review" subtitleDescription="Confirm" icon={<Icon name="check" />}>
              <Flex direction="column" gap="4">
                <Text size="3" weight="bold">Review & Submit</Text>
                <Text size="2" color="gray">By clicking submit, you agree to the VectorSigma terms of service.</Text>
                
                <CodexControls prevStepId="step-2" finishLabel="Create Account" />
              </Flex>
            </CodexItem>

          </Codex>
        </form>
      )}
    </Formik>
  );
};



export const Outline: Story = {
  render: (args) => <MockCodexApp {...args} />,
  args: { design: 'outline' },
};

export const Material: Story = {
  render: (args) => <MockCodexApp {...args} />,
  args: { design: 'material' },
};

export const Neumorphic: Story = {
  render: (args) => (
    <div style={{ padding: '32px', backgroundColor: '#e0e5ec', borderRadius: '16px', width: '100%' }}>
      <MockCodexApp {...args} />
    </div>
  ),
  args: { design: 'neumorphic' },
};

/**
 * **Custom Branding:**
 * Demonstrates overriding the active step and button colors using a custom CSS variable/hex.
 */
export const CustomBranding: Story = {
  render: (args) => <MockCodexApp {...args} />,
  args: { 
    design: 'outline',
    brandColor: 'var(--ruby-9)'
  },
};