import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { RadioGroupInput } from './RadioGroupInput';
import type { InputOption } from '../utils/vinci';
import { Row } from './Row';
import { Column } from './Column';
import { Button, Flex, Text } from '@radix-ui/themes';


const deploymentRegions: InputOption[] = [
  { optionid: 1, optionvalue: 'us-east-1', text: 'US East (N. Virginia)' },
  { optionid: 2, optionvalue: 'eu-central-1', text: 'Europe (Frankfurt)' },
  { optionid: 3, optionvalue: 'ap-northeast-1', text: 'Asia Pacific (Tokyo)' },
];

const authMethods: InputOption[] = [
  { optionid: 10, optionvalue: 'sso', text: 'SAML Single Sign-On (SSO)' },
  { optionid: 11, optionvalue: 'oauth', text: 'OAuth 2.0 Provider' },
  { optionid: 12, optionvalue: 'local', text: 'Local Database (Legacy)' },
  { optionid: 13, optionvalue: 'mfa', text: 'MFA Enforced Only' },
];

const booleanOptions: InputOption[] = [
  { optionid: 20, optionvalue: 'true', text: 'Enabled' },
  { optionid: 21, optionvalue: 'false', text: 'Disabled' },
];

const optionsMap = {
  'Deployment Regions (3 Items)': deploymentRegions,
  'Auth Methods (4 Items)': authMethods,
  'Boolean Toggle (2 Items)': booleanOptions,
};


const typographyPresets = {
  'Burgundy Executive': {
    background: '#800020',
    stroke: '#800020',
    textColor: '#f8fafc',
    accent: '#800020',
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
  title: 'χForm Components/RadioGroupInput',
  component: RadioGroupInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      inlineStories: false,
      story: {
        iframeHeight: '300px',
      },
      description: {
        component: `
A versatile, enterprise-grade radio selection group. Features responsive layouts (stack, inline, or grid), optional elevated \`cardMode\` tiles, typography overrides, intelligent neumorphism, and strict Formik state binding.

**Note:** This component must be rendered inside a \`<Formik>\` context.

### Import
\`\`\`tsx
import { RadioGroupInput } from '@emeraldemperaur/vector-sigma';
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
      options: ['radio-outline', 'radio-material', 'radio-neumorphic'],
      description: 'The aesthetic design language of the Radio options.',
      table: { defaultValue: { summary: "'radio-outline'" } },
    },
    alias: {
      control: 'text',
      description: 'The unique identifier bridging the input field to the Formik state.',
    },
    inputLabel: {
      control: 'text',
      description: 'The primary semantic label rendered above the RadioGroup.',
    },
    inputOptions: {
      control: 'select',
      options: Object.keys(optionsMap),
      mapping: optionsMap,
      description: 'The array of discrete options rendered within the RadioGroup.',
    },
    direction: {
      control: 'radio',
      options: ['column', 'row'],
      description: 'Layout orientation for the radio items (vertical stack vs horizontal flow).',
      table: { defaultValue: { summary: "'column'" } },
    },
    columns: {
      control: 'text',
      description: 'Explicit CSS grid template columns (e.g. `repeat(2, 1fr)`). Overrides `direction` when supplied.',
    },
    cardMode: {
      control: 'boolean',
      description: 'Renders each radio option within an interactive, elevated selectable tile.',
      table: { defaultValue: { summary: 'false' } },
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
    readOnly: {
      control: 'boolean',
      description: 'Disables interaction across all options, mutating visual state to reflect read-only mode.',
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
    inputLabel: 'Primary Cloud Deployment Region',
    inputOptions: deploymentRegions,
    width: 12,
  },
  decorators: [
    (Story, context) => {
      const isErrorState = Boolean(context.args.errorText);
      const alias = context.args.alias || 'radioField';
      const initialVal = context.parameters?.formik?.initialValues?.[alias] ?? '';

      return (
        <Row>
        <Formik
          key={`formik-sync-${context.args.errorText || 'clean'}`}
          initialValues={{ [alias]: initialVal }}
          initialErrors={isErrorState ? { [alias]: context.args.errorText as string } : {}}
          initialTouched={isErrorState ? { [alias]: true } : {}}
          onSubmit={(values) => console.log('RadioGroupInput Submit Payload:', values)}
        >
            <Story />
        </Formik>
        </Row>
      );
    },
  ],
} satisfies Meta<typeof RadioGroupInput>;

export default meta;
type Story = StoryObj<typeof RadioGroupInput>;

export const DefaultInline: Story = {
  render: (args) => <RadioGroupInput {...args} />,
  args: {
    inputtype: 'radio-outline',
    direction: 'column',
    cardMode: false,
  },
};

/**
 * **Card Mode (Material)**
 * By enabling `cardMode`, each radio option is wrapped in a highly interactive, elevated surface tile. This is the recommended pattern for complex form architectures to increase tap targets and visual feedback.
 */
export const MaterialCards: Story = {
  render: (args) => <RadioGroupInput {...args} />,
  args: {
    inputtype: 'radio-material',
    cardMode: true,
    direction: 'column',
  },
};

export const NeumorphicCards: Story = {
  render: (args) => <RadioGroupInput {...args} />,
  args: {
    inputtype: 'radio-neumorphic',
    cardMode: true,
    direction: 'row',
  },
  decorators: [
    (Story) => (
      <>
        <Story />
      </>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Neumorphic variant utilizes soft-UI extruded drop-shadows. When selected, the card tile dynamically sinks into a concave inset shadow while highlighting the inner radio indicator. A tinted container background (e.g., `#e0e5ec`) is strictly required.',
      },
    },
  },
};

/**
 * **Grid Layout Constraints**
 * You can override the standard `direction` prop by passing explicit CSS grid parameters to the `columns` prop (e.g., `repeat(2, 1fr)`). This is extremely useful for structuring wide tiles into multi-column arrays.
 */
export const GridLayout: Story = {
  render: (args) => <RadioGroupInput {...args} />,
  args: {
    inputtype: 'radio-outline',
    cardMode: true,
    alias: 'authenticationMethod',
    inputLabel: 'Authentication Policy',
    inputOptions: authMethods,
    columns: 'repeat(2, 1fr)',
  },
};

export const WithHintAndTooltip: Story = {
  render: (args) => <RadioGroupInput {...args} />,
  args: {
    inputtype: 'radio-outline',
    cardMode: true,
    isHinted: true,
    hintText: 'Select the region closest to your primary database replica to minimize latency.',
    hintUrl: 'https://docs.vectorsigma.io/infrastructure/regions',
  },
};

export const CustomTypography: Story = {
  render: (args) => <RadioGroupInput {...args} />,
  args: {
    inputtype: 'radio-outline',
    cardMode: true,
    typography: typographyPresets['Burgundy Executive'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates hijacking internal Radix themes via the `typography` prop using the enterprise Burgundy Executive preset. Notice how the card border, background, and radio selection indicator dynamically inherit the brand palette.',
      },
    },
  },
};

export const ReadOnlyState: Story = {
  render: (args) => (
    <Formik
      initialValues={{ [args.alias]: 'us-east-1' }}
      onSubmit={(values) => console.log(values)}
    >
      <>
        <RadioGroupInput {...args} />
      </>
    </Formik>
  ),
  args: {
    alias: 'lockedRegion',
    inputtype: 'radio-material',
    cardMode: true,
    readOnly: true,
    inputLabel: 'Provisioned Region (Read Only)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates visually muting the entire group and blocking click interactions when `readOnly` is enabled. The active selection is preserved and displayed in a disabled state.',
      },
    },
  },
};

export const WithValidation: Story = {
  render: (args) => <RadioGroupInput {...args} />,
  args: {
    inputtype: 'radio-outline',
    cardMode: true,
    errorText: 'You must select a deployment region to proceed with provisioning.',
  },
};

/**
 * **Interactive Form Test:**
 * Select an option to observe the exact string value written to the Formik state, and test the submission hook.
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
          if (!values[args.alias]) return { [args.alias]: 'A tier selection is required.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4" style={{ width: '100%', maxWidth: '450px' }}>
              <RadioGroupInput {...args} />
              
              <div style={{ backgroundColor: 'var(--gray-3)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text weight="bold" style={{ color: 'var(--ruby-9)' }}>
                  Live Formik State:
                </Text>
                <pre style={{ margin: 0, fontFamily: 'var(--code-font-family, monospace)', color: 'var(--gray-12)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
              
              <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer', width: '100%' }}>
                Confirm Plan
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'subscriptionTier',
    inputLabel: 'Select Plan Tier',
    inputtype: 'radio-material',
    cardMode: true,
    direction: 'column',
    inputOptions: [
      { optionid: 1, optionvalue: 'basic', text: 'Basic ($9/mo)' },
      { optionid: 2, optionvalue: 'pro', text: 'Pro ($29/mo)' },
      { optionid: 3, optionvalue: 'enterprise', text: 'Enterprise' },
    ]
  },
};