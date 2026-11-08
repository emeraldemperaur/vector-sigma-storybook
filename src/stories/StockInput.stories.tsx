import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { StockInput } from './StockInput';
import { Row } from './Row';
import { Column } from './Column';
import { Button, Flex, Text } from '@radix-ui/themes';

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
  title: 'χForm Components/StockInput',
  component: StockInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      inlineStories: false,
      story: {
        iframeHeight: '220px',
      },
      description: {
        component: `
A specialized financial input component designed for equities and derivatives. Features dynamic \`I-Mask\` monetary formatting, left-aligned ticker symbol badges, enterprise-grade aesthetics, and strict Formik integration.

**Note:** This component must be rendered inside a \`<Formik>\` context. It unmasks the input internally, storing raw numerical strings (e.g., \`1500.50\`) in the Formik state while preserving comma-separated visual formatting for the user.

### Import
\`\`\`tsx
import { StockInput } from '@emeraldemperaur/vector-sigma';
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
    inputVariant: {
      control: 'radio',
      options: ['input-outline', 'input-material', 'input-neumorphic'],
      description: 'The aesthetic design language of the Stock Input field.',
      table: { defaultValue: { summary: "'input-outline'" } },
    },
    size: {
      control: 'radio',
      options: ['1', '2', '3'],
      description: 'The physical height sizing scale for the container and ticker badge.',
      table: { defaultValue: { summary: "'2'" } },
    },
    alias: {
      control: 'text',
      description: 'The unique identifier bridging the input field to the Formik state.',
    },
    inputLabel: {
      control: 'text',
      description: 'The primary semantic label rendered above the Input field.',
    },
    width: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Defines the responsive grid column span for the component (1-12 based on the parent grid).',
      table: { defaultValue: { summary: '12' } },
    },
    ticker: {
      control: 'text',
      description: 'Stock ticker symbol displayed in the leading badge pill (falls back to a chart icon if omitted).',
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
    alias: 'executionPrice',
    inputLabel: 'Execution Share Price',
    ticker: 'NVDA',
    width: 12,
  },
  decorators: [
    (Story, context) => {
      const isErrorState = Boolean(context.args.errorText);
      const alias = context.args.alias || 'stockField';
      const initialVal = context.parameters?.formik?.initialValues?.[alias] ?? '';

      return (
        <Row>
        <Formik
          key={`formik-sync-${context.args.errorText || 'clean'}`}
          initialValues={{ [alias]: initialVal }}
          initialErrors={isErrorState ? { [alias]: context.args.errorText as string } : {}}
          initialTouched={isErrorState ? { [alias]: true } : {}}
          onSubmit={(values) => console.log('StockInput Submit Payload:', values)}
        >
            <Story />
        </Formik>
        </Row>
      );
    },
  ],
} satisfies Meta<typeof StockInput>;

export default meta;
type Story = StoryObj<typeof StockInput>;

export const Outline: Story = {
  render: (args) => <StockInput {...args} />,
  args: {
    inputVariant: 'input-outline',
  },
};

export const Material: Story = {
  render: (args) => <StockInput {...args} />,
  args: {
    inputVariant: 'input-material',
  },
};

export const Neumorphic: Story = {
  render: (args) => <StockInput {...args} />,
  args: {
    inputVariant: 'input-neumorphic',
  },
  decorators: [
    (Story) => (
      
        <Story />
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Neumorphic variant utilizes soft-UI extruded drop-shadows. The ticker badge dynamically inherits concave inset shadowing to match the input well. A tinted container background (e.g., `#e0e5ec`) is strictly required.',
      },
    },
  },
};

/**
 * **Ticker Badge Rendering**
 * If a `ticker` string (e.g., "TSLA") is provided, it is rendered in a pill badge on the left. If omitted, the component gracefully falls back to a generic line chart icon.
 */
export const TickerVariations: Story = {
  render: (args) => (
    <>
      <StockInput {...args} alias="stock1" inputLabel="Specific Equity" ticker="TSLA" />
      <StockInput {...args} alias="stock2" inputLabel="Generic Market Order" ticker="" />
    </>
  ),
  args: {
    inputVariant: 'input-outline',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <StockInput {...args} size="1" alias="stk1" inputLabel="Size 1 (Compact)" />
      <StockInput {...args} size="2" alias="stk2" inputLabel="Size 2 (Default)" />
      <StockInput {...args} size="3" alias="stk3" inputLabel="Size 3 (Large)" />
    </>
  ),
  args: {
    inputVariant: 'input-outline',
    ticker: 'AAPL',
  },
};

export const WithHintAndTooltip: Story = {
  render: (args) => <StockInput {...args} />,
  args: {
    inputVariant: 'input-outline',
    isHinted: true,
    hintText: 'Market limit price pegged at 4:00 PM EST market close.',
    hintUrl: 'https://docs.vectorsigma.io/trading/equities',
  },
};

export const CustomTypography: Story = {
  render: (args) => <StockInput {...args} />,
  args: {
    inputVariant: 'input-outline',
    typography: typographyPresets['Emerald Fleet'],
    ticker: 'MSFT',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates hijacking internal Radix themes via the `typography` prop using the enterprise Emerald Fleet preset. The ticker badge dynamically absorbs the accent color for its background tint and text.',
      },
    },
  },
};

export const ReadOnlyState: Story = {
  render: (args) => (
    <Formik
      initialValues={{ [args.alias]: '1045.25' }}
      onSubmit={(values) => console.log(values)}
    >
      <>
        <StockInput {...args} />
      </>
    </Formik>
  ),
  args: {
    alias: 'lockedStockPrice',
    inputVariant: 'input-material',
    readOnly: true,
    inputLabel: 'Settled Execution Price (Read Only)',
    ticker: 'PLTR',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates visually muting the field and blocking keyboard input when `readOnly` is enabled. I-Mask formatting (commas and decimal places) safely applies to the raw numeric default value.',
      },
    },
  },
};

export const WithValidation: Story = {
  render: (args) => <StockInput {...args} />,
  args: {
    inputVariant: 'input-material',
    errorText: 'A valid positive share valuation is required to place this order.',
    ticker: 'AMD',
  },
};


/**
 * **Interactive Form Test:**
 * Type a monetary value to observe the thousands-separator masking, raw float state parsing, and test the submission hook.
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
          if (!values[args.alias] || Number(values[args.alias]) <= 0) return { [args.alias]: 'Price must be greater than zero.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4" style={{ width: '100%', maxWidth: '450px' }}>
              <StockInput {...args} />
              
              <div style={{ backgroundColor: 'var(--gray-3)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text weight="bold" style={{ color: 'var(--ruby-9)' }}>
                  Live Formik State:
                </Text>
                <pre style={{ margin: 0, fontFamily: 'var(--code-font-family, monospace)', color: 'var(--gray-12)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
              
              <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer', width: '100%' }}>
                Execute Trade
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'limitPrice',
    inputLabel: 'Limit Order Price',
    ticker: 'AAPL',
    inputVariant: 'input-material',
  },
};