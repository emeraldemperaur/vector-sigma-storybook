import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { Button, Flex, Text } from '@radix-ui/themes';
import { CheckboxGroupInput } from './CheckboxGroupInput';
import type { InputOption } from '../utils/vinci';
import { Column } from './Column';

const cloudProviders: InputOption[] = [
  { optionid: 1, optionvalue: 'aws', text: 'Amazon Web Services' },
  { optionid: 2, optionvalue: 'gcp', text: 'Google Cloud Platform' },
  { optionid: 3, optionvalue: 'azure', text: 'Microsoft Azure' },
  { optionid: 4, optionvalue: 'vercel', text: 'Vercel Edge Network' },
];

const userRoles: InputOption[] = [
  { optionid: 10, optionvalue: 'admin', text: 'Administrator (Full Access)' },
  { optionid: 11, optionvalue: 'editor', text: 'Content Editor' },
  { optionid: 12, optionvalue: 'viewer', text: 'Read-Only Viewer' },
];

const simpleBinary: InputOption[] = [
  { optionid: 20, optionvalue: 'yes', text: 'Yes, opt-in' },
  { optionid: 21, optionvalue: 'no', text: 'No, opt-out' },
];

const demoEntity: InputOption[] = [
  { optionid: 30, optionvalue: 'kaiju', text: 'Kaiju Classification' },
  { optionid: 31, optionvalue: 'meka', text: 'Meka Division' },
  { optionid: 32, optionvalue: 'zaibatsu', text: 'Zaibatsu Corp' },
  { optionid: 33, optionvalue: 'apotheosis', text: 'Apotheosis Inc.' },
];

const securityProtocols: InputOption[] = [
  { optionid: 40, optionvalue: 'mfa', text: 'Multi-Factor Auth (MFA)' },
  { optionid: 41, optionvalue: 'sso', text: 'SAML 2.0 Single Sign-On' },
  { optionid: 42, optionvalue: 'e2ee', text: 'End-to-End Encryption' },
  { optionid: 43, optionvalue: 'rbac', text: 'Role-Based Access Control' },
];

const optionsMap = {
  'Cloud Providers (4 Items)': cloudProviders,
  'User Roles (3 Items)': userRoles,
  'Binary (2 Items)': simpleBinary,
  'Demo Entity (4 Items)': demoEntity,
  'Security Protocols (4 Items)': securityProtocols,
};

const typographyPresets = {
  'Burgundy Executive': {
    background: '#800020',
    stroke: '#800020',
    textColor: 'var(--gray-12)',
  },
  'Nautical Oceanic': {
    background: '#005f73',
    stroke: '#0a9396',
    textColor: '#001219',
  },
  'Midnight Slate': {
    background: '#1e293b',
    stroke: '#334155',
    textColor: '#f8fafc',
  },
  'Emerald Fleet': {
    background: '#065f46',
    stroke: '#059669',
    textColor: 'var(--gray-12)',
  },
  'High Contrast': {
    background: '#000000',
    stroke: '#000000',
    textColor: '#000000',
  },
};

const meta = {
  title: 'χForm Components/CheckboxGroupInput',
  component: CheckboxGroupInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A robust multi-selection input array. Supports enterprise-grade aesthetics, Formik array bindings, responsive grid layouts, typography overrides, and context-aware neumorphic rendering.

**Note:** This component must be rendered inside a \`<Formik>\` context and binds to an array state.

### Import
\`\`\`tsx
import { CheckboxGroupInput } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
      source: {
        transform: (code: string, context: any) => {
          const componentName = context.component?.name || 'Component';
          
          if (context.name !== 'Interactive Form Test') {
            if (code.includes('@emeraldemperaur/vector-sigma')) return code;
            return `import { ${componentName} } from '@emeraldemperaur/vector-sigma';\n\n${code}`;
          }
          const alias = context.args.alias || 'formField';
          const props = Object.entries(context.args)
            .filter(([_, val]) => val !== undefined && typeof val !== 'function')
            .map(([key, val]) => typeof val === 'string' ? `${key}="${val}"` : `${key}={${JSON.stringify(val)}}`)
            .join('\n            ');
          
          const componentCode = `<${componentName}\n            ${props}\n          />`;
          let initialVal = "''";
          if (componentName.includes('Avatar')) initialVal = 'null';
          if (componentName.includes('Toggle')) initialVal = 'false';
          if (componentName.includes('MultipleSelect') || componentName.includes('Range')) initialVal = '[]';
          if (componentName.includes('SliderInput')) initialVal = '0';

          return `import { ${componentName} } from '@emeraldemperaur/vector-sigma';
import { Formik, Form } from 'formik';

export default function FormExample() {
  return (
    <Formik
      initialValues={{ ${alias}: ${initialVal} }}
      onSubmit={(values) => console.log('Submitted payload:', values)}
    >
      {({ isSubmitting }) => (
        <Form style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          ${componentCode}
          
          <button type="submit" disabled={isSubmitting}>
            Save Configuration
          </button>
        </Form>
      )}
    </Formik>
  );
}`;
        },
      },
    },
  },
  argTypes: {
    inputtype: {
      control: 'radio',
      options: ['checkbox-outline', 'checkbox-material', 'checkbox-neumorphic'],
      description: 'The aesthetic design language of the Checkbox Group component.',
      table: { defaultValue: { summary: "'checkbox-outline'" } },
    },
    alias: {
      control: 'text',
      description: 'The unique identifier bridging the group to the Formik state array.',
    },
    inputLabel: {
      control: 'text',
      description: 'The primary semantic label rendered above the Checkbox Group.',
    },
    inputOptions: {
      control: 'select',
      options: Object.keys(optionsMap),
      mapping: optionsMap,
      description: 'The array of discrete options rendered within the Checkbox Group. Select from 5 mapped presets.',
    },
    width: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Responsive grid column span for the component (1-12 based on the parent grid).',
    },
    newRow: {
      control: 'boolean',
      description: 'Forces the component to break into a new Flex/Grid row within the Form layout.',
    },
    direction: {
      control: 'radio',
      options: ['row', 'column'],
      description: 'The CSS flex direction for internal grid rendering if explicit columns aren\'t provided.',
      table: { defaultValue: { summary: "'row'" } },
    },
    columns: {
      control: 'text',
      description: 'Explicit CSS grid-template-columns definition for complex structural layouts.',
    },
    readOnly: {
      control: 'boolean',
      description: 'Disables interaction, mutating the visual state to reflect read-only mode.',
    },
    isHinted: {
      control: 'boolean',
      description: 'Toggles the visibility of the contextual hint icon and tooltip next to the label.',
    },
    hintText: {
      control: 'text',
      description: 'The text payload displayed inside the Tooltip when isHinted is true.',
    },
    hintUrl: {
      control: 'text',
      description: 'An optional URL bound to the hint icon.',
    },
    errorText: {
      control: 'text',
      description: 'Explicit error string to override standard Formik validation messages.',
    },
    typography: {
      control: 'select',
      options: ['Default (Theme)', ...Object.keys(typographyPresets)],
      mapping: {
        'Default (Theme)': undefined,
        ...typographyPresets,
      },
      description: 'Centralized color and typography overrides. Select from 5 mapped enterprise brand palettes.',
      table: {
        category: 'Branding & Theme',
      },
    },
  },
  args: {
    alias: 'cloudProviders',
    inputLabel: 'Target Robotics Providers',
    inputOptions: demoEntity,
    width: 12,
    direction: 'row',
  },
  decorators: [
    (Story, context) => {
      const isErrorState = Boolean(context.args.errorText);
      return (
        <Flex justify="center" align="start" style={{ padding: '2rem', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <Formik
            key={`formik-sync-${context.args.errorText || 'clean'}`}
            initialValues={{ [context.args.alias]: ['kaiju'] }}
            initialErrors={isErrorState ? { [context.args.alias]: context.args.errorText as string } : {}}
            initialTouched={isErrorState ? { [context.args.alias]: true } : {}}
            onSubmit={(values) => console.log('Checkbox Group Selection:', values)}
          >
            <Story />
          </Formik>
        </Flex>
      );
    },
  ],
} satisfies Meta<typeof CheckboxGroupInput>;

export default meta;
type Story = StoryObj<typeof CheckboxGroupInput>;

export const Outline: Story = {
  render: (args) => <CheckboxGroupInput {...args} />,
  args: {
    inputtype: 'checkbox-outline',
  },
};

export const Material: Story = {
  render: (args) => <CheckboxGroupInput {...args} />,
  args: {
    inputtype: 'checkbox-material',
  },
};

export const Neumorphic: Story = {
  render: (args) => <CheckboxGroupInput {...args} />,
  args: {
    inputtype: 'checkbox-neumorphic',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#e0e5ec', padding: '40px', width: '100%', borderRadius: '16px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Neumorphic components dynamically map shadows based on parent background colors. A tinted background wrapper (e.g., `#e0e5ec`) is strictly required.',
      },
    },
  },
};

export const ColumnLayout: Story = {
  render: (args) => <CheckboxGroupInput {...args} />,
  args: {
    inputtype: 'checkbox-outline',
    direction: 'column',
    inputLabel: 'Strict Vertical Alignment',
    inputOptions: userRoles,
  },
};

export const CustomGridColumns: Story = {
  render: (args) => <CheckboxGroupInput {...args} />,
  args: {
    inputtype: 'checkbox-material',
    columns: '1fr 2fr 1fr',
    inputLabel: 'Custom Grid Mapping (1fr 2fr 1fr)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Bypasses the default responsive grid and forces a strict CSS `grid-template-columns` layout.',
      },
    },
  },
};

export const WithHintAndTooltip: Story = {
  render: (args) => <CheckboxGroupInput {...args} />,
  args: {
    inputtype: 'checkbox-outline',
    isHinted: true,
    hintText: 'Multi-region deployments across different providers require Enterprise Billing verification.',
    hintUrl: 'https://docs.vectorsigma.ca/deployments',
  },
};

export const CustomTypography: Story = {
  render: (args) => <CheckboxGroupInput {...args} />,
  args: {
    inputtype: 'checkbox-outline',
    typography: typographyPresets['Burgundy Executive'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates hijacking internal Radix themes via the `typography` prop using the enterprise Burgundy (#800020) preset.',
      },
    },
  },
};

export const WithValidation: Story = {
  render: (args) => <CheckboxGroupInput {...args} />,
  args: {
    inputtype: 'checkbox-material',
    errorText: 'At least one target provider must be selected to proceed.',
  },
};

/**
 * **Interactive Form Test:**
 * Toggle checkboxes, observe array state mutations, and test the Formik submission hook.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      alert(`Form Submitted! \n\nPayload: ${JSON.stringify(values, null, 2)}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: [] }} 
        validate={(values) => {
          if (!values[args.alias] || values[args.alias].length === 0) {
            return { [args.alias]: 'Select at least one notification channel.' };
          }
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4">
              <CheckboxGroupInput {...args} />
              
              <div style={{ backgroundColor: 'var(--gray-3)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text weight="bold" style={{ color: 'var(--ruby-9)' }}>
                  Live Formik State:
                </Text>
                <pre style={{ margin: 0, fontFamily: 'var(--code-font-family, monospace)', color: 'var(--gray-12)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
              
              <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer', width: '100%' }}>
                Save Preferences
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'notificationPreferences',
    inputLabel: 'Alerting Subscriptions',
    inputtype: 'checkbox-material',
    width: 12,
    inputOptions: [
      { optionid: 1, optionvalue: 'email', text: 'Email Digest' },
      { optionid: 2, optionvalue: 'slack', text: 'Slack Notification' },
      { optionid: 3, optionvalue: 'sms', text: 'Urgent SMS' },
    ],
  },
};