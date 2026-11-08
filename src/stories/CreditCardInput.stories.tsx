import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { Button, Flex, Text } from '@radix-ui/themes';
import { CreditCardInput } from './CreditCardInput';
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
  title: 'χForm Components/CreditCardInput',
  component: CreditCardInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      inlineStories: false,
      story: {
        iframeHeight: '280px',
      },
      description: {
        component: `
Equipped with automatic card scheme detection, dynamic I-Mask formatting (Amex/Visa/MC), brand icon rendering, enterprise aesthetics (Outline, Material, Neumorphic), and Formik integration.

**Note:** This component must be rendered inside a \`<Formik>\` context. It internally stores the **unmasked** numerical string in Formik state while presenting the user with formatted chunks (e.g., \`4111 1111 1111 1111\`).

### Import
\`\`\`tsx
import { CreditCardInput } from '@emeraldemperaur/vector-sigma';
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
      description: 'The design aesthetic of the CreditCardInput container.',
      table: { defaultValue: { summary: "'input-outline'" } },
    },
    size: {
      control: 'select',
      options: ['1', '2', '3'],
      description: 'Sizing scale for the input component (controls container height and inner padding).',
      table: { defaultValue: { summary: "'2'" } },
    },
    alias: {
      control: 'text',
      description: 'The unique identifier bridging the input field to the Formik state.',
    },
    inputLabel: {
      control: 'text',
      description: 'The primary semantic label rendered above the credit card input.',
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
      description: 'Placeholder string displayed when no digits are entered. Automatically adapts based on detected card scheme.',
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
    alias: 'paymentMethodCard',
    inputLabel: 'Primary Payment Card',
    width: 12,
    size: '2',
  },
  decorators: [
    (Story, context) => {
      const isErrorState = Boolean(context.args.errorText);
      const alias = context.args.alias || 'creditCardField';
      const initialVal = context.parameters?.formik?.initialValues?.[alias] ?? '';

      return (
          <Row>
          <Formik
            key={`formik-sync-${context.args.errorText || 'clean'}`}
            initialValues={{ [alias]: initialVal }}
            initialErrors={isErrorState ? { [alias]: context.args.errorText as string } : {}}
            initialTouched={isErrorState ? { [alias]: true } : {}}
            onSubmit={(values) => console.log('Credit Card Submit (Unmasked Payload):', values)}
          >
            <Story />
          </Formik>
          </Row>
      );
    },
  ],
} satisfies Meta<typeof CreditCardInput>;

export default meta;
type Story = StoryObj<typeof CreditCardInput>;

export const Outline: Story = {
  render: (args) => <CreditCardInput {...args} />,
  args: {
    inputvariant: 'input-outline',
  },
  parameters: {
    docs: {
      description: {
        story: 'Type `4` for Visa, `5` for Mastercard, or `34` for Amex to see the icon and input mask automatically adapt to the detected card scheme.',
      },
    },
  },
};

export const Material: Story = {
  render: (args) => <CreditCardInput {...args} />,
  args: {
    inputvariant: 'input-material',
  },
};

export const Neumorphic: Story = {
  render: (args) => <CreditCardInput {...args} />,
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
 * **American Express (Amex) Scheme Detection**
 * Demonstrates the component automatically adapting its mask to a 15-digit layout (`0000 000000 00000`) 
 * and updating the placeholder and icon when an Amex prefix (`34` or `37`) is detected.
 */
export const AmericanExpressCard: Story = {
  render: (args) => <CreditCardInput {...args} />,
  args: {
    inputvariant: 'input-outline',
    inputLabel: 'American Express Formatting',
  },
  parameters: {
    formik: {
      initialValues: { paymentMethodCard: '378282246310005' },
    },
  },
};

/**
 * **Visa Scheme Detection**
 * Demonstrates the component rendering the standard 16-digit chunked layout (`0000 0000 0000 0000`)
 * and updating the icon when a Visa prefix (`4`) is detected.
 */
export const VisaCard: Story = {
  render: (args) => <CreditCardInput {...args} />,
  args: {
    inputvariant: 'input-material',
    inputLabel: 'Visa Formatting',
  },
  parameters: {
    formik: {
      initialValues: { paymentMethodCard: '4111111111111111' },
    },
  },
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <CreditCardInput {...args} size="1" alias="card1" inputLabel="Size 1 (Compact)" />
      <CreditCardInput {...args} size="2" alias="card2" inputLabel="Size 2 (Default)" />
      <CreditCardInput {...args} size="3" alias="card3" inputLabel="Size 3 (Large)" />
    </>
  ),
  args: {
    inputvariant: 'input-outline',
  },
};

export const WithHintAndTooltip: Story = {
  render: (args) => <CreditCardInput {...args} />,
  args: {
    inputvariant: 'input-outline',
    isHinted: true,
    hintText: 'We support Visa, Mastercard, American Express, Discover, Diners Club, and JCB.',
    hintUrl: 'https://docs.vectorsigma.io/payments/security',
  },
};


export const ReadOnlyState: Story = {
  render: (args) => <CreditCardInput {...args} />,
  args: {
    inputvariant: 'input-outline',
    readOnly: true,
    inputLabel: 'Payment Method on File (Read Only)',
  },
  parameters: {
    formik: {
      initialValues: { paymentMethodCard: '4111111111111111' },
    },
    docs: {
      description: {
        story: 'Demonstrates visually muting the field and blocking modifications when `readOnly` is enabled.',
      },
    },
  },
};

/**
 * **Interactive Form Test:**
 * Type a card number to observe the dynamic scheme detection, unmasked numerical state parsing, and test the submission hook.
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
          if (!values[args.alias] || values[args.alias].length < 15) return { [args.alias]: 'Invalid card length.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4" style={{ width: '100%', maxWidth: '450px' }}>
              <CreditCardInput {...args} />
              
              <div style={{ backgroundColor: 'var(--gray-3)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text weight="bold" style={{ color: 'var(--ruby-9)' }}>
                  Live Formik State:
                </Text>
                <pre style={{ margin: 0, fontFamily: 'var(--code-font-family, monospace)', color: 'var(--gray-12)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
              
              <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer', width: '100%' }}>
                Process Payment
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'paymentCard',
    inputLabel: 'Payment Method',
    inputVariant: 'input-material',
  },
};

