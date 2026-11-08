import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { Flex, Text, TextField, Box } from '@radix-ui/themes';
import { Codex, CodexItem } from './Codex';
import { CodexControls } from './Codexcontrols';
import { Icon } from '../components/icons/icons';

const meta = {
  title: 'χForm Layout/Codex',
  component: Codex,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      inlineStories: false, 
      description: {
        component: `
Codex (Stepper) layout component for building multi-step forms. Coordinates section-by-section workflow progression, responsive progress indicators, enterprise aesthetics, and Formik step validation.

**Required Composition:**
1. \`<Codex>\` (The wrapper/provider)
2. \`<CodexItem>\` (The individual step views)
3. \`<CodexControls>\` (The navigation buttons, rendered *inside* each CodexItem)

### Import
\`\`\`tsx
import { Codex, CodexItem, CodexControls } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
      source: {
        transform: (code: string) => {
          if (code.includes("import { Codex, CodexItem, CodexControls }")) {
            return code;
          }
          return `import { Codex, CodexItem, CodexControls } from './Codex';\n\n${code}`;
        },
      },
      story: {
        iframeHeight: '400px',
      },
    },
  },
  argTypes: {
    design: {
      control: 'radio',
      options: ['outline', 'material', 'neumorphic'],
      description: 'The aesthetic design variation of the Codex component.',
      table: { defaultValue: { summary: "'outline'" } },
    },
    strictValidation: {
      control: 'boolean',
      description: 'Enables section-by-section Formik validation before allowing users to advance.',
      table: { defaultValue: { summary: 'false' } },
    },
    brandColor: {
      control: 'color',
      description: 'Custom brand color used for active/completed step lines, circles, halos, and navigation buttons.',
      table: { defaultValue: { summary: '#800020' } },
    },
    width: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Viewport column width span (1 - 12 based on the parent grid).',
      table: { defaultValue: { summary: '12' } },
    },
  },
  args: {
    brandColor: '#800020',
    width: 12,
  },
  decorators: [
    // The Formik wrapper is moved here. Storybook's AST parser ignores decorators,
    // so it will only print the beautiful Codex composition in the "Show Code" tab.
    (Story, context) => (
      <Flex justify="center" align="start" style={{ padding: '2rem', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <Formik 
          initialValues={{ firstName: '', lastName: '', password: '' }} 
          validate={(values) => {
            const errors: any = {};
            if (context.args.strictValidation) {
              if (!values.firstName) errors.firstName = 'Required';
              if (!values.password) errors.password = 'Required';
            }
            return errors;
          }}
          onSubmit={(values) => alert(`Wizard Complete! \n\n${JSON.stringify(values, null, 2)}`)}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Story />
            </form>
          )}
        </Formik>
      </Flex>
    ),
  ],
} satisfies Meta<typeof Codex>;

export default meta;
type Story = StoryObj<typeof Codex>;

/**
 * Clean render function. Because Formik is handled by the decorator,
 * Storybook will correctly parse and display this exact tree in the docs.
 */
const renderCodexStory = (args: any) => (
  <Codex {...args}>
    
    <CodexItem stepId="step-1" title="Account" subtitleDescription="Basic Info" icon={<Icon name="user" />}>
      <Flex direction="column" gap="4">
        <Box>
          <Text size="3" weight="bold" as="div">Create your account</Text>
          <Text size="2" color="gray" as="div" mb="3">Enter your basic credentials to get started.</Text>
        </Box>
        
        <Box>
          <Text size="2" weight="bold" mb="1" as="div">First Name {args.strictValidation && '*'}</Text>
          <TextField.Root name="firstName" placeholder="Jane" />
        </Box>

        <Box>
          <Text size="2" weight="bold" mb="1" as="div">Last Name</Text>
          <TextField.Root name="lastName" placeholder="Doe" />
        </Box>
        
        <CodexControls nextStepId="step-2" />
      </Flex>
    </CodexItem>

    <CodexItem stepId="step-2" title="Security" subtitleDescription="Set Password" icon={<Icon name="lockclosed" />}>
      <Flex direction="column" gap="4">
        <Box>
          <Text size="3" weight="bold" as="div">Secure your data</Text>
          <Text size="2" color="gray" as="div" mb="3">Use a strong password to protect your account.</Text>
        </Box>

        <Box>
          <Text size="2" weight="bold" mb="1" as="div">Password {args.strictValidation && '*'}</Text>
          <TextField.Root name="password" placeholder="Enter highly secure password..." type="password" />
        </Box>
        
        <CodexControls prevStepId="step-1" nextStepId="step-3" />
      </Flex>
    </CodexItem>

    <CodexItem stepId="step-3" title="Review" subtitleDescription="Confirm" icon={<Icon name="check" />}>
      <Flex direction="column" gap="4">
        <Text size="3" weight="bold" as="div">Review & Submit</Text>
        <Text size="2" color="gray" as="div">By clicking submit, you agree to the VectorSigma terms of service.</Text>
        
        <CodexControls prevStepId="step-2" finishLabel="Create Account" />
      </Flex>
    </CodexItem>

  </Codex>
);

export const Outline: Story = {
  render: renderCodexStory,
  args: { 
    design: 'outline',
    strictValidation: false,
  },
};

export const Material: Story = {
  render: renderCodexStory,
  args: { 
    design: 'material',
    strictValidation: false,
  },
};

export const Neumorphic: Story = {
  render: renderCodexStory,
  args: { 
    design: 'neumorphic',
    strictValidation: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Neumorphic design requires a tinted parent background (e.g., `#e0e5ec`) to render the extruded shadow effects correctly.',
      },
    },
  },
};

export const WithValidation: Story = {
  render: renderCodexStory,
  args: { 
    design: 'outline',
    strictValidation: true,
  },
};

