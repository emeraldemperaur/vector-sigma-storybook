import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { PhoneInput } from './PhoneInput';
import { Row } from './Row';
import { Column } from './Column';
import { Button, Flex, Text } from '@radix-ui/themes';

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
  title: 'χForm Components/PhoneInput',
  component: PhoneInput,
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
An international phone number input built on top of the VectorSigma Input architecture. Features a built-in searchable country code selector, automatic E.164 formatting via \`react-phone-number-input\`, intelligent context-aware neumorphism, and strict Formik integration.

**Note:** This component must be rendered inside a \`<Formik>\` context. It internally binds and parses standard E.164 formatted strings (e.g., \`+14155552671\`) directly into the Formik state payload.

### Import
\`\`\`tsx
import { PhoneInput } from '@emeraldemperaur/vector-sigma';
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
      description: 'The aesthetic design language of the Phone Input field.',
      table: { defaultValue: { summary: "'input-outline'" } },
    },
    size: {
      control: 'radio',
      options: ['1', '2', '3'],
      description: 'The physical height sizing scale for the Radix TextField.',
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
    newRow: {
      control: 'boolean',
      description: 'Forces the component to break into a new Flex/Grid row within the Form layout.',
      table: { defaultValue: { summary: 'false' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text utilized when the state is empty.',
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
    alias: 'onCallPhone',
    inputLabel: 'On-Call Escalation Number',
    placeholder: 'Enter phone number...',
    width: 12,
  },
  decorators: [
    (Story, context) => {
      const isErrorState = Boolean(context.args.errorText);
      const alias = context.args.alias || 'phoneField';
      const initialVal = context.parameters?.formik?.initialValues?.[alias] ?? '';

      return (
        <Row>
        <Formik
          key={`formik-sync-${context.args.errorText || 'clean'}`}
          initialValues={{ [alias]: initialVal }}
          initialErrors={isErrorState ? { [alias]: context.args.errorText as string } : {}}
          initialTouched={isErrorState ? { [alias]: true } : {}}
          onSubmit={(values) => console.log('PhoneInput Submit Payload:', values)}
        >
            <Story />
        </Formik>
        </Row>
      );
    },
  ],
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof PhoneInput>;

export const Outline: Story = {
  render: (args) => <PhoneInput {...args} />,
  args: {
    inputvariant: 'input-outline',
  },
};

export const Material: Story = {
  render: (args) => <PhoneInput {...args} />,
  args: {
    inputvariant: 'input-material',
  },
};

export const Neumorphic: Story = {
  render: (args) => <PhoneInput {...args} />,
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
        story: 'Neumorphic variant utilizes soft-UI extruded drop-shadows. The country selector inherently inherits the transparent blending properties. A tinted container background (e.g., `#e0e5ec`) is strictly required.',
      },
    },
  },
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <PhoneInput {...args} size="1" alias="phone1" inputLabel="Size 1 (Compact)" />
      <PhoneInput {...args} size="2" alias="phone2" inputLabel="Size 2 (Default)" />
      <PhoneInput {...args} size="3" alias="phone3" inputLabel="Size 3 (Large)" />
    </>
  ),
  args: {
    inputvariant: 'input-outline',
  },
};

export const WithHintAndTooltip: Story = {
  render: (args) => <PhoneInput {...args} />,
  args: {
    inputvariant: 'input-outline',
    isHinted: true,
    hintText: 'This number will be tied directly to PagerDuty automated escalations.',
    hintUrl: 'https://docs.vectorsigma.io/escalations',
  },
};

export const CustomTypography: Story = {
  render: (args) => <PhoneInput {...args} />,
  args: {
    inputvariant: 'input-outline',
    typography: typographyPresets['Midnight Slate'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates hijacking internal Radix themes via the `typography` prop using the enterprise Midnight Slate preset. The country dropdown background and text adapt automatically.',
      },
    },
  },
};

export const ReadOnlyState: Story = {
  render: (args) => (
    <Formik
      initialValues={{ [args.alias]: '+14155552671' }}
      onSubmit={(values) => console.log(values)}
    >
      <>
        <PhoneInput {...args} />
      </>
    </Formik>
  ),
  args: {
    alias: 'lockedPhone',
    inputvariant: 'input-material',
    readOnly: true,
    inputLabel: 'Verified System Contact (Read Only)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates visually muting the field and blocking both keyboard input and country selection dropdown interactions when `readOnly` is enabled.',
      },
    },
  },
};

export const WithValidation: Story = {
  render: (args) => <PhoneInput {...args} />,
  args: {
    inputvariant: 'input-material',
    errorText: 'A valid international phone number is strictly required to proceed.',
  },
  parameters: {
    formik: {
      initialValues: { onCallPhone: '+1' }, 
    },
  },
};

/**
 * **Interactive Form Test:**
 * Select a country, type a local number, observe the automatic E.164 state conversion, and test the submission hook.
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
          if (!values[args.alias] || values[args.alias].length < 10) return { [args.alias]: 'A valid international phone number is required.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4" style={{ width: '100%', maxWidth: '450px' }}>
              <PhoneInput {...args} />
              
              <div style={{ backgroundColor: 'var(--gray-3)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text weight="bold" style={{ color: 'var(--ruby-9)' }}>
                  Live Formik State:
                </Text>
                <pre style={{ margin: 0, fontFamily: 'var(--code-font-family, monospace)', color: 'var(--gray-12)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
              
              <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer', width: '100%' }}>
                Save Contact
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'contactPhone',
    inputLabel: 'Emergency Contact',
    inputvariant: 'input-material',
  },
};