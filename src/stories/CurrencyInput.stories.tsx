import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { Button, Flex, Text } from '@radix-ui/themes';
import { CurrencyInput } from './CurrencyInput';
import { Row } from './Row';
import { Column } from './Column';

const typographyPresets = {
  'Burgundy Executive': {
    background: '#800020',
    stroke: '#800020',
    textColor: 'var(--gray-12)',
    accent: '#800020',
  },
  'Nautical Oceanic': {
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
  title: 'χForm Components/CurrencyInput',
  component: CurrencyInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      inlineStories: false,
      story: {
        iframeHeight: '320px',
      },
      description: {
        component: `
Equipped with multi-currency ISO selection, dynamic fractional scaling, localized separators, enterprise-grade aesthetics, and dual Formik state bindings.

**Note:** This component binds **two** values in Formik state:
1. \`[alias]\`: The raw, unmasked numerical string amount (e.g., \`"1450.50"\`).
2. \`[alias]Currency\`: The selected ISO 4217 currency code (e.g., \`"USD"\`).

### Import
\`\`\`tsx
import { CurrencyInput } from '@emeraldemperaur/vector-sigma';
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
      options: ['input-outline', 'input-material', 'input-neumorphic'],
      description: 'The aesthetic design language of the CurrencyInput container.',
      table: { defaultValue: { summary: "'input-outline'" } },
    },
    inputtype: {
      control: 'select',
      options: ['currency', 'USD', 'EUR', 'GBP', 'NGN', 'JPY', 'CAD', 'AUD', 'CHF'],
      description: 'The operation mode. Use `"currency"` for an interactive dropdown, or a specific ISO code (e.g., `"EUR"`) to lock the component to that currency.',
      table: { defaultValue: { summary: "'currency'" } },
    },
    size: {
      control: 'select',
      options: ['1', '2', '3'],
      description: 'Sizing scale controlling component height and internal padding.',
      table: { defaultValue: { summary: "'2'" } },
    },
    alias: {
      control: 'text',
      description: 'The required unique identifier for the numerical currency amount in Formik context.',
    },
    inputLabel: {
      control: 'text',
      description: 'The primary semantic label rendered above the CurrencyInput component.',
    },
    defaultvalue: {
      control: 'text',
      description: 'The default ISO currency code selected if no Formik value is present.',
      table: { defaultValue: { summary: "'USD'" } },
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
      description: 'Placeholder numerical string displayed when the input field is empty.',
      table: { defaultValue: { summary: "'0.00'" } },
    },
    readOnly: {
      control: 'boolean',
      description: 'Disables interaction across both the currency selector and the numerical input.',
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
    alias: 'transactionAmount',
    inputLabel: 'Transaction Amount',
    inputtype: 'currency',
    width: 12,
    size: '2',
    defaultvalue: 'USD',
  },
  decorators: [
    (Story, context) => {
      const isErrorState = Boolean(context.args.errorText);
      const alias = context.args.alias || 'transactionAmount';
      const currencyAlias = `${alias}Currency`;
      
      const defaultInitialValues = {
        [alias]: context.parameters?.formik?.initialValues?.[alias] ?? '',
        [currencyAlias]: context.parameters?.formik?.initialValues?.[currencyAlias] ?? context.args.defaultvalue ?? 'USD',
      };

      return (
          <Row>
          <Formik
            key={`formik-sync-${context.args.errorText || 'clean'}`}
            initialValues={{ ...defaultInitialValues, ...(context.parameters?.formik?.initialValues || {}) }}
            initialErrors={isErrorState ? { [alias]: context.args.errorText as string } : {}}
            initialTouched={isErrorState ? { [alias]: true } : {}}
            onSubmit={(values) => console.log('Currency Input Submit Payload:', values)}
          >
            <Story />
          </Formik>
          </Row>
      );
    },
  ],
} satisfies Meta<typeof CurrencyInput>;

export default meta;
type Story = StoryObj<typeof CurrencyInput>;

export const Outline: Story = {
  render: (args) => <CurrencyInput {...args} />,
  args: {
    inputvariant: 'input-outline',
  },
};

export const Material: Story = {
  render: (args) => <CurrencyInput {...args} />,
  args: {
    inputvariant: 'input-material',
  },
};

export const Neumorphic: Story = {
  render: (args) => <CurrencyInput {...args} />,
  args: {
    inputvariant: 'input-neumorphic',
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
        story: 'Neumorphic variant utilizes soft-UI extruded drop-shadows. A tinted container background (e.g., `#e0e5ec`) is required for the extrusion effect to render accurately.',
      },
    },
  },
};


/**
 * **Dynamic Fractional Scaling (Zero Decimals)**
 * Demonstrates the internal configuration adapting to zero-decimal currencies (like the Japanese Yen). 
 * The mask and placeholder (`0` instead of `0.00`) automatically adjust to prevent fractional inputs.
 */
export const ZeroDecimalCurrency: Story = {
  render: (args) => <CurrencyInput {...args} />,
  args: {
    inputvariant: 'input-material',
    inputtype: 'JPY',
    inputLabel: 'Japanese Yen (Zero Decimals)',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <CurrencyInput {...args} size="1" alias="amt1" inputLabel="Size 1 (Compact)" />
      <CurrencyInput {...args} size="2" alias="amt2" inputLabel="Size 2 (Default)" />
      <CurrencyInput {...args} size="3" alias="amt3" inputLabel="Size 3 (Large)" />
    </>
  ),
  args: {
    inputvariant: 'input-outline',
  },
};

export const WithHintAndTooltip: Story = {
  render: (args) => <CurrencyInput {...args} />,
  args: {
    inputvariant: 'input-outline',
    isHinted: true,
    hintText: 'Foreign currency transactions are converted using real-time mid-market FX rates.',
    hintUrl: 'https://docs.vectorsigma.io/billing/fx-rates',
  },
};

export const CustomTypography: Story = {
  render: (args) => <CurrencyInput {...args} />,
  args: {
    inputvariant: 'input-outline',
    typography: typographyPresets['Burgundy Executive'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates overriding internal themes via the `typography` prop using the enterprise Burgundy preset.',
      },
    },
  },
};

export const ReadOnlyState: Story = {
  render: (args) => <CurrencyInput {...args} />,
  args: {
    inputvariant: 'input-outline',
    readOnly: true,
    inputLabel: 'Historical Invoice Amount (Read Only)',
  },
  parameters: {
    formik: {
      initialValues: { transactionAmount: '45000.50' },
    },
    docs: {
      description: {
        story: 'Demonstrates visually muting the field and blocking modifications across both the numerical input and currency dropdown when `readOnly` is enabled.',
      },
    },
  },
};

/**
 * **Interactive Form Test:**
 * Enter monetary values, observe numeric formatting and parsed numeric values, and test the submission hook.
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
          if (!values[args.alias] || Number(values[args.alias]) <= 0) {
            return { [args.alias]: 'A positive budget allocation is required.' };
          }
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4" style={{ width: '100%', maxWidth: '450px' }}>
              <CurrencyInput {...args} />
              
              <div style={{ backgroundColor: 'var(--gray-3)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text weight="bold" style={{ color: 'var(--ruby-9)' }}>
                  Live Formik State:
                </Text>
                <pre style={{ margin: 0, fontFamily: 'var(--code-font-family, monospace)', color: 'var(--gray-12)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
              
              <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer', width: '100%' }}>
                Allocate Budget
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'annualBudget',
    inputLabel: 'Annual Cloud Infrastructure Budget',
    inputtype: 'USD',
    width: 12,
  },
};