import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { Dropdown } from './Dropdown';
import type { InputOption } from '../utils/vinci';
import { Row } from './Row';
import { Column } from './Column';
import { Button, Flex, Text } from '@radix-ui/themes';


const corporateFleets: InputOption[] = [
  { optionid: 1, optionvalue: 'eqs', text: 'Mercedes-Benz EQS (Electric)' },
  { optionid: 2, optionvalue: 'sclass', text: 'Mercedes-Benz S-Class (Hybrid)' },
  { optionid: 3, optionvalue: 'lucid', text: 'Lucid Air Grand Touring' },
  { optionid: 4, optionvalue: 'rivian', text: 'Rivian R1S (Armored Edition)' },
];

const cloudRegions: InputOption[] = [
  { optionid: 10, optionvalue: 'us-east-1', text: 'US East (N. Virginia)' },
  { optionid: 11, optionvalue: 'us-west-2', text: 'US West (Oregon)' },
  { optionid: 12, optionvalue: 'eu-central-1', text: 'Europe (Frankfurt)' },
  { optionid: 13, optionvalue: 'ap-northeast-1', text: 'Asia Pacific (Tokyo)' },
];

const securityProtocols: InputOption[] = [
  { optionid: 20, optionvalue: 'tls12', text: 'Legacy TLS 1.2' },
  { optionid: 21, optionvalue: 'tls13', text: 'Modern TLS 1.3 (Recommended)' },
  { optionid: 22, optionvalue: 'mtls', text: 'Mutual TLS (mTLS) Mesh' },
  { optionid: 23, optionvalue: 'wireguard', text: 'Wireguard VPN Tunnel' },
];

const resourceDocs: InputOption[] = [
  { optionid: 30, optionvalue: 'api_docs', text: 'REST API Documentation', optionurl: 'https://docs.vectorsigma.io/api' },
  { optionid: 31, optionvalue: 'graphql_schema', text: 'GraphQL Schema Explorer', optionurl: 'https://docs.vectorsigma.io/graphql' },
  { optionid: 32, optionvalue: 'sdk_reference', text: 'Node.js SDK Reference', optionurl: 'https://docs.vectorsigma.io/sdk' },
];

const demoEntity: InputOption[] = [
  { optionid: 40, optionvalue: 'kaiju', text: 'Kaiju Classification' },
  { optionid: 41, optionvalue: 'meka', text: 'Meka Division' },
  { optionid: 42, optionvalue: 'zaibatsu', text: 'Zaibatsu Corp' },
  { optionid: 43, optionvalue: 'apotheosis', text: 'Apotheosis Inc.' },
];

const optionsMap = {
  'Corporate Fleets (4 Items)': corporateFleets,
  'Cloud Regions (4 Items)': cloudRegions,
  'Security Protocols (4 Items)': securityProtocols,
  'Resource Documentation (3 URLs)': resourceDocs,
  'Demo Entity (4 Items)': demoEntity,
};


const typographyPresets = {
  'Sapphire Executive': {
    background: '#0f172a',
    stroke: '#1e293b',
    textColor: '#f8fafc',
    accent: '#3b82f6', 
  },
  'Nautical Oceanic': {
    background: '#005f73',
    stroke: '#0a9396',
    textColor: '#e0fbfc',
    accent: '#0a9396', 
  },
  'Midnight Slate': {
    background: '#1e293b',
    stroke: '#334155',
    textColor: '#f8fafc',
    accent: '#38bdf8', 
  },
  'Emerald Fleet': {
    background: '#065f46',
    stroke: '#059669',
    textColor: '#ecfdf5',
    accent: '#10b981', 
  },
  'High Contrast': {
    background: '#000000',
    stroke: '#000000',
    textColor: '#ffffff',
    accent: '#ffffff', 
  },
};

const meta = {
  title: 'χForm Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      inlineStories: false,
      story: {
        iframeHeight: '340px',
      },
      description: {
        component: `
Equipped with enterprise-grade aesthetics, intelligent context-aware neumorphism, optional URL linking, typography overrides, and strict Formik integration. Designed for LLM/MCP workflows.

**Note:** This component must be rendered inside a \`<Formik>\` context.

### Import
\`\`\`tsx
import { Dropdown } from '@emeraldemperaur/vector-sigma';
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
      options: ['dropdown-outline', 'dropdown-material', 'dropdown-neumorphic'],
      description: 'The aesthetic design language of the Dropdown trigger and menu.',
      table: { defaultValue: { summary: "'dropdown-outline'" } },
    },
    alias: {
      control: 'text',
      description: 'The unique identifier bridging the input field to the Formik state.',
    },
    inputLabel: {
      control: 'text',
      description: 'The primary semantic label rendered above the Dropdown field.',
    },
    width: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Defines the responsive grid column span for the component (1-12 based on the parent grid).',
      table: { defaultValue: { summary: '12' } },
    },
    newRow: {
      control: 'boolean',
      description: 'Forces the component to break into a new Flex/Grid row within the Form layout.',
      table: { defaultValue: { summary: 'false' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text utilized when the state is empty or null. Acts as the reset trigger within the dropdown menu.',
      table: { defaultValue: { summary: "'Select an option...'" } },
    },
    inputOptions: {
      control: 'select',
      options: Object.keys(optionsMap),
      mapping: optionsMap,
      description: 'The array of discrete options rendered within the Dropdown. Select from 5 mapped presets.',
    },
    readOnly: {
      control: 'boolean',
      description: 'Disables interaction, mutating the visual state to reflect read-only/disabled mode.',
      table: { defaultValue: { summary: 'false' } },
    },
    isHinted: {
      control: 'boolean',
      description: 'Toggles the visibility of the contextual hint icon and tooltip next to the label.',
      table: { defaultValue: { summary: 'false' } },
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
    alias: 'deploymentRegion',
    inputLabel: 'Target Cloud Deployment Region',
    inputOptions: cloudRegions,
    width: 12,
  },
  decorators: [
    (Story, context) => {
      const isErrorState = Boolean(context.args.errorText);
      const alias = context.args.alias || 'dropdownField';
      const initialVal = context.parameters?.formik?.initialValues?.[alias] ?? '';

      return (
        <Row>
          <Formik
            key={`formik-sync-${context.args.errorText || 'clean'}`}
            initialValues={{ [alias]: initialVal }}
            initialErrors={isErrorState ? { [alias]: context.args.errorText as string } : {}}
            initialTouched={isErrorState ? { [alias]: true } : {}}
            onSubmit={(values) => console.log('Dropdown Selection Submit:', values)}
          >
            <Story />
          </Formik>
        </Row>
      );
    },
  ],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Outline: Story = {
  render: (args) => <Dropdown {...args} />,
  args: {
    inputtype: 'dropdown-outline',
  },
};

export const Material: Story = {
  render: (args) => <Dropdown {...args} />,
  args: {
    inputtype: 'dropdown-material',
  },
};

export const Neumorphic: Story = {
  render: (args) => <Dropdown {...args} />,
  args: {
    inputtype: 'dropdown-neumorphic',
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
        story: 'Neumorphic dropdowns dynamically map their recessed and extruded shadows based on parent background colors. A tinted background wrapper (e.g., `#e0e5ec`) is strictly required.',
      },
    },
  },
};

/**
 * **URL Navigation Mode**
 * Options that include an `optionurl` property will open external links in a new tab when clicked, bypassing standard selection mechanics.
 */
export const UrlNavigation: Story = {
  render: (args) => <Dropdown {...args} />,
  args: {
    inputtype: 'dropdown-outline',
    alias: 'documentationLinks',
    inputLabel: 'Technical Documentation',
    placeholder: 'Select an API reference...',
    inputOptions: resourceDocs,
  },
  parameters: {
    docs: {
      description: {
        story: 'When an option contains an `optionurl` key, the component wraps the item in a semantic `<a>` tag and executes `window.open` rather than updating Formik state.',
      },
    },
  },
};

export const WithHintAndTooltip: Story = {
  render: (args) => <Dropdown {...args} />,
  args: {
    inputtype: 'dropdown-outline',
    isHinted: true,
    hintText: 'Cross-region deployment may incur additional egress data transfer costs.',
    hintUrl: 'https://docs.vectorsigma.io/billing',
  },
};



export const ReadOnlyState: Story = {
  render: (args) => (
    <Formik
      initialValues={{ [args.alias]: 'us-east-1' }}
      onSubmit={(values) => console.log(values)}
    >
      <Dropdown {...args} />
    </Formik>
  ),
  args: {
    alias: 'lockedRegion',
    inputtype: 'dropdown-material',
    readOnly: true,
    inputLabel: 'Provisioned Region (Read Only)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates visually muting the field and blocking popover interactions when `readOnly` is enabled.',
      },
    },
  },
};

export const WithValidation: Story = {
  render: (args) => <Dropdown {...args} />,
  args: {
    inputtype: 'dropdown-material',
    errorText: 'A target cloud region must be selected to proceed with deployment.',
  },
};

/**
 * **Interactive Form Test:**
 * Select a menu item, verify exact string assignment in Formik state, and test the submission hook.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      alert(`Form Submitted! \n\nPayload: ${JSON.stringify(values, null, 2)}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: '' }} 
        validate={(values) => {
          if (!values[args.alias]) {
            return { [args.alias]: 'Please select a support tier.' };
          }
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4" style={{ width: '100%', maxWidth: '450px' }}>
              <Dropdown {...args} />
              
              <div style={{ backgroundColor: 'var(--gray-3)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text weight="bold" style={{ color: 'var(--ruby-9)' }}>
                  Live Formik State:
                </Text>
                <pre style={{ margin: 0, fontFamily: 'var(--code-font-family, monospace)', color: 'var(--gray-12)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
              
              <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer', width: '100%' }}>
                Confirm Tier
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'supportPlan',
    inputLabel: 'Production Support Tier',
    inputtype: 'dropdown-material',
    width: 12,
    inputOptions: [
      { optionid: 1, optionvalue: 'standard', text: 'Standard SLA (24 Hours)' },
      { optionid: 2, optionvalue: 'enterprise', text: 'Enterprise SLA (1 Hour)' },
      { optionid: 3, optionvalue: 'mission_critical', text: 'Mission Critical (15 Min)' },
    ],
  },
};