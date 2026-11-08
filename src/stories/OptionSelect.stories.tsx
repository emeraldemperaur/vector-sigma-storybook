import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { OptionSelect } from './OptionSelect';
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
  { optionid: 14, optionvalue: 'ap-southeast-2', text: 'Asia Pacific (Sydney)' },
  { optionid: 15, optionvalue: 'sa-east-1', text: 'South America (São Paulo)' },
  { optionid: 16, optionvalue: 'me-south-1', text: 'Middle East (Bahrain)' },
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
  'Cloud Regions (7 Items)': cloudRegions,
  'Resource Documentation (3 URLs)': resourceDocs,
  'Demo Entity (4 Items)': demoEntity,
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
  title: 'χForm Components/OptionSelect',
  component: OptionSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      inlineStories: false,
      story: {
        iframeHeight: '350px',
      },
      description: {
        component: `
An advanced, highly-customizable dropdown select component based on Radix UI's \`Popover\` primitive. Features real-time search filtering, intelligent portal rendering, enterprise-grade aesthetics, typography overrides, and strict Formik integration.

**Note:** This component must be rendered inside a \`<Formik>\` context. It is an evolution of the base \`Dropdown\` component, offering superior UX for large datasets via the \`enableSearch\` prop.

### Import
\`\`\`tsx
import { OptionSelect } from '@emeraldemperaur/vector-sigma';
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
    inputvariant: {
      control: 'radio',
      options: ['dropdown-outline', 'dropdown-material', 'dropdown-neumorphic'],
      description: 'The aesthetic design language of the OptionSelect trigger and popover menu.',
      table: { defaultValue: { summary: "'dropdown-outline'" } },
    },
    size: {
      control: 'radio',
      options: ['1', '2', '3'],
      description: 'Physical size scale for the OptionSelect trigger.',
      table: { defaultValue: { summary: "'2'" } },
    },
    alias: {
      control: 'text',
      description: 'The unique identifier bridging the input field to the Formik state.',
    },
    inputLabel: {
      control: 'text',
      description: 'The primary semantic label rendered above the OptionSelect field.',
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
      description: 'Placeholder text utilized when no option is selected.',
      table: { defaultValue: { summary: "'Select an option...'" } },
    },
    inputOptions: {
      control: 'select',
      options: Object.keys(optionsMap),
      mapping: optionsMap,
      description: 'The array of selectable options rendered within the menu.',
    },
    enableSearch: {
      control: 'boolean',
      description: 'Toggles the real-time search filter input at the top of the popover menu.',
      table: { defaultValue: { summary: 'false' } },
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the search filter input when `enableSearch` is true.',
      table: { defaultValue: { summary: "'Search options...'" } },
    },
    readOnly: {
      control: 'boolean',
      description: 'Disables interaction, mutating the visual state to reflect read-only mode.',
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
      const alias = context.args.alias || 'selectField';
      const initialVal = context.parameters?.formik?.initialValues?.[alias] ?? '';

      return (
        <Row>
        <Formik
          key={`formik-sync-${context.args.errorText || 'clean'}`}
          initialValues={{ [alias]: initialVal }}
          initialErrors={isErrorState ? { [alias]: context.args.errorText as string } : {}}
          initialTouched={isErrorState ? { [alias]: true } : {}}
          onSubmit={(values) => console.log('OptionSelect Submit Payload:', values)}
        >
            <Story />
        </Formik>
        </Row>
      );
    },
  ],
} satisfies Meta<typeof OptionSelect>;

export default meta;
type Story = StoryObj<typeof OptionSelect>;

export const Outline: Story = {
  render: (args) => <OptionSelect {...args} />,
  args: {
    inputvariant: 'dropdown-outline',
  },
};

export const Material: Story = {
  render: (args) => <OptionSelect {...args} />,
  args: {
    inputvariant: 'dropdown-material',
  },
};

export const Neumorphic: Story = {
  render: (args) => <OptionSelect {...args} />,
  args: {
    inputvariant: 'dropdown-neumorphic',
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
        story: 'Neumorphic variant utilizes soft-UI extruded drop-shadows. The popover menu dynamically maps its background and shadows to match the trigger. A tinted container background (e.g., `#e0e5ec`) is strictly required.',
      },
    },
  },
};

/**
 * **Real-Time Search Filtering**
 * By enabling the `enableSearch` prop, a dedicated search input is injected at the top of the popover menu. This allows users to filter large datasets rapidly. The popover canvas dynamically shrinks if the filtered results are smaller than the max height constraint.
 */
export const SearchableMode: Story = {
  render: (args) => <OptionSelect {...args} />,
  args: {
    inputvariant: 'dropdown-outline',
    enableSearch: true,
    searchPlaceholder: 'Search AWS regions...',
    inputLabel: 'Global Fleet Deployment',
    inputOptions: cloudRegions,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <OptionSelect {...args} size="1" alias="os1" inputLabel="Size 1 (Compact)" />
      <OptionSelect {...args} size="2" alias="os2" inputLabel="Size 2 (Default)" />
      <OptionSelect {...args} size="3" alias="os3" inputLabel="Size 3 (Large)" />
    </>
  ),
  args: {
    inputvariant: 'dropdown-outline',
  },
};

/**
 * **URL Navigation Mode**
 * Options that include an `optionurl` property will execute `window.open` (in a new tab) when selected. The popover safely closes and triggers a standard Formik state update concurrently.
 */
export const UrlNavigation: Story = {
  render: (args) => <OptionSelect {...args} />,
  args: {
    inputvariant: 'dropdown-outline',
    alias: 'documentationLinks',
    inputLabel: 'Technical Documentation',
    placeholder: 'Select an API reference...',
    inputOptions: resourceDocs,
  },
};

export const WithHintAndTooltip: Story = {
  render: (args) => <OptionSelect {...args} />,
  args: {
    inputvariant: 'dropdown-outline',
    isHinted: true,
    hintText: 'Cross-region deployment may incur additional egress data transfer costs.',
    hintUrl: 'https://docs.vectorsigma.io/billing',
  },
};

export const CustomTypography: Story = {
  render: (args) => <OptionSelect {...args} />,
  args: {
    inputvariant: 'dropdown-outline',
    typography: typographyPresets['Burgundy Executive'],
    enableSearch: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates hijacking internal Radix themes via the `typography` prop using the enterprise Burgundy Executive preset. The popover menu, search input, selection highlights, and icons all dynamically adapt to the custom palette.',
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
        <OptionSelect {...args} />
    </Formik>
  ),
  args: {
    alias: 'lockedRegion',
    inputvariant: 'dropdown-material',
    readOnly: true,
    inputLabel: 'Provisioned Region (Read Only)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates visually muting the field and blocking popover interactions when `readOnly` is enabled. The clear selection (X) icon is automatically hidden.',
      },
    },
  },
};

export const WithValidation: Story = {
  render: (args) => <OptionSelect {...args} />,
  args: {
    inputvariant: 'dropdown-material',
    errorText: 'A target cloud region must be selected to proceed with deployment.',
  },
};

/**
 * **Interactive Form Test:**
 * Open the popover, search for an item, make a selection, observe the state update, and test the submission hook.
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
          if (!values[args.alias]) return { [args.alias]: 'You must select a region.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4" style={{ width: '100%', maxWidth: '450px' }}>
              <OptionSelect {...args} />
              
              <div style={{ backgroundColor: 'var(--gray-3)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text weight="bold" style={{ color: 'var(--ruby-9)' }}>
                  Live Formik State:
                </Text>
                <pre style={{ margin: 0, fontFamily: 'var(--code-font-family, monospace)', color: 'var(--gray-12)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
              
              <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer', width: '100%' }}>
                Provision Resource
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'targetRegion',
    inputLabel: 'Datacenter Region',
    inputvariant: 'dropdown-material',
    enableSearch: true,
    inputOptions: [
      { optionid: 1, optionvalue: 'us-east-1', text: 'US East (N. Virginia)' },
      { optionid: 2, optionvalue: 'eu-central-1', text: 'Europe (Frankfurt)' },
      { optionid: 3, optionvalue: 'ap-northeast-1', text: 'Asia Pacific (Tokyo)' },
    ]
  },
};