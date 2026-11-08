import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { CountrySelect } from './CountrySelect';
import { Row } from './Row';
import { Button, Flex, Text } from '@radix-ui/themes';
import { Column } from './Column';

const typographyPresets = {
  'Burgundy Executive (#800020)': {
    background: '#800020',
    stroke: '#800020',
    textColor: 'var(--gray-12)',
    accent: '#800020',
  },
  'Nautical Oceanic (#005f73)': {
    background: '#005f73',
    stroke: '#0a9396',
    textColor: '#001219',
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
    textColor: 'var(--gray-12)',
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
  title: 'χForm Components/CountrySelect',
  component: CountrySelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      inlineStories: false,
      story: {
        iframeHeight: '380px',
      },
      description: {
        component: `
Equipped with search filtering, multi-select array support, dynamic flag rendering, typography overrides, and enterprise-grade popover animations.

**Note:** This component must be rendered inside a \`<Formik>\` context. When \`multiselect\` is enabled, the state payload automatically changes from a single string to an array of strings.

### Import
\`\`\`tsx
import { CountrySelect } from '@emeraldemperaur/vector-sigma';
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
      options: ['countryselect-outline', 'countryselect-material', 'countryselect-neumorphic'],
      description: 'The aesthetic design language of the CountrySelect trigger.',
      table: { defaultValue: { summary: "'countryselect-outline'" } },
    },
    alias: {
      control: 'text',
      description: 'The unique identifier bridging the input field to the Formik state.',
    },
    inputLabel: {
      control: 'text',
      description: 'The primary semantic label rendered above the CountrySelect field.',
    },
    width: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Defines the responsive grid column span for the component (1-12 based on the parent grid).',
    },
    newRow: {
      control: 'boolean',
      description: 'Forces the component to break into a new Flex/Grid row within the Form layout.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text utilized when the state is empty or null.',
      table: { defaultValue: { summary: "'Select Country...'" } },
    },
    multiselect: {
      control: 'boolean',
      description: 'Toggles array support, allowing multiple country selections.',
      table: { defaultValue: { summary: 'false' } },
    },
    enableSearch: {
      control: 'boolean',
      description: 'Injects a search bar into the dropdown header to quickly filter the country list.',
      table: { defaultValue: { summary: 'false' } },
    },
    displayFlag: {
      control: 'boolean',
      description: 'Toggles the rendering of the SVG country flag icon next to the country name.',
      table: { defaultValue: { summary: 'true' } },
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
    alias: 'deploymentRegion',
    inputLabel: 'Primary Deployment Region',
    width: 12,
  },
  decorators: [
    (Story, context) => {
      const isErrorState = Boolean(context.args.errorText);
      const alias = context.args.alias || 'countryField';
      const initialVal = context.args.multiselect ? ['CA'] : 'CA';

      return (
          <Row>
          <Formik
            key={`formik-sync-${context.args.errorText || 'clean'}`}
            initialValues={{ [alias]: initialVal }}
            initialErrors={isErrorState ? { [alias]: context.args.errorText as string } : {}}
            initialTouched={isErrorState ? { [alias]: true } : {}}
            onSubmit={(values) => console.log('Country Selection Submit:', values)}
          >
            <Story />
          </Formik>
          </Row>
      );
    },
  ],
} satisfies Meta<typeof CountrySelect>;

export default meta;
type Story = StoryObj<typeof CountrySelect>;

export const Outline: Story = {
  render: (args) => <CountrySelect {...args} />,
  args: {
    inputtype: 'countryselect-outline',
  },
};

export const Material: Story = {
  render: (args) => <CountrySelect {...args} />,
  args: {
    inputtype: 'countryselect-material',
  },
};

export const Neumorphic: Story = {
  render: (args) => <CountrySelect {...args} />,
  args: {
    inputtype: 'countryselect-neumorphic',
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

export const SearchEnabled: Story = {
  render: (args) => <CountrySelect {...args} />,
  args: {
    inputtype: 'countryselect-outline',
    enableSearch: true,
    inputLabel: 'Filterable Region Select',
  },
};

export const MultiSelect: Story = {
  render: (args) => <CountrySelect {...args} />,
  args: {
    inputtype: 'countryselect-material',
    multiselect: true,
    enableSearch: true,
    alias: 'targetRegions',
    inputLabel: 'Target Egress Regions (Multi)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Enabling `multiselect` transforms the dropdown into a checkbox list and automatically switches the Formik state payload to an array of strings.',
      },
    },
  },
};

export const FlagsDisabled: Story = {
  render: (args) => <CountrySelect {...args} />,
  args: {
    inputtype: 'countryselect-outline',
    displayFlag: false,
    inputLabel: 'Minimalist Selection (No Flags)',
  },
};

export const WithHintAndTooltip: Story = {
  render: (args) => <CountrySelect {...args} />,
  args: {
    inputtype: 'countryselect-outline',
    isHinted: true,
    hintText: 'Selecting regions outside of North America may incur additional latency and cross-border egress fees.',
    hintUrl: 'https://docs.vectorsigma.io/routing',
  },
};

export const CustomTypography: Story = {
  render: (args) => <CountrySelect {...args} />,
  args: {
    inputtype: 'countryselect-outline',
    typography: typographyPresets['Burgundy Executive (#800020)'],
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
  render: (args) => <CountrySelect {...args} />,
  args: {
    inputtype: 'countryselect-material',
    errorText: 'A valid operational country of origin is strictly required.',
  },
  parameters: {
    formik: {
      initialValues: { deploymentRegion: '' },
    },
  },
};

/**
 * **Interactive Form Test:**
 * Select a jurisdiction, observe the selected ISO code in Formik state, and test the submission hook.
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
            return { [args.alias]: 'Please select a deployment country.' };
          }
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4" style={{ width: '100%', maxWidth: '450px' }}>
              <CountrySelect {...args} />
              
              <div style={{ backgroundColor: 'var(--gray-3)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text weight="bold" style={{ color: 'var(--ruby-9)' }}>
                  Live Formik State:
                </Text>
                <pre style={{ margin: 0, fontFamily: 'var(--code-font-family, monospace)', color: 'var(--gray-12)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
              
              <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer', width: '100%' }}>
                Confirm Jurisdiction
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'hostingCountry',
    inputLabel: 'Primary Data Hosting Country',
    inputtype: 'countryselect-material',
    width: 12,
  },
};