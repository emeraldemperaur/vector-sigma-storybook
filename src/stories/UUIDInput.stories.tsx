import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { UUIDInput } from './UUIDInput';
import { Icon } from './Icons';
import { Row } from './Row';
import { Column } from './Column';
import { Button, Flex, Text } from '@radix-ui/themes';


const typographyPresets = {
  'Burgundy Executive': {
    background: '#800020',
    stroke: '#1e293b',
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
  title: 'χForm Components/UUIDInput',
  component: UUIDInput,
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
A specialized cryptographic identifier input built on top of the VectorSigma Input architecture. Features strict hex parsing, auto-delimiters, one-click clipboard copying, on-the-fly random UUID generation, enterprise-grade aesthetics, and strict Formik integration.

**Note:** This component must be rendered inside a \`<Formik>\` context. It inherently forces uppercase hex formatting on user input.

### Import
\`\`\`tsx
import { UUIDInput } from '@emeraldemperaur/vector-sigma';
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
      options: ['uuid-outline', 'uuid-material', 'uuid-neumorphic'],
      description: 'The aesthetic design language of the UUID field.',
      table: { defaultValue: { summary: "'uuid-outline'" } },
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
    type: {
      control: 'text',
      description: 'The format identifier string (e.g. `uuid-8-4-4-4-12`). Defines segment lengths.',
      table: { defaultValue: { summary: "'uuid-4-4-4-4'" } },
    },
    delimiter: {
      control: 'text',
      description: 'Delimiter character automatically inserted between hex chunks.',
      table: { defaultValue: { summary: "'-'" } },
    },
    enableGenerate: {
      control: 'boolean',
      description: 'Toggles an action button in the trailing slot to generate a random UUID chunk matching the format.',
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
    alias: 'apiClientKey',
    inputLabel: 'API Client Identifier (UUID)',
    width: 12,
  },
  decorators: [
    (Story, context) => {
      const isErrorState = Boolean(context.args.errorText);
      const alias = context.args.alias || 'uuidField';
      const initialVal = context.parameters?.formik?.initialValues?.[alias] ?? '';

      return (
        <Row>
        <Formik
          key={`formik-sync-${context.args.errorText || 'clean'}`}
          initialValues={{ [alias]: initialVal }}
          initialErrors={isErrorState ? { [alias]: context.args.errorText as string } : {}}
          initialTouched={isErrorState ? { [alias]: true } : {}}
          onSubmit={(values) => console.log('UUIDInput Submit Payload:', values)}
        >
            <Story />
        </Formik>
        </Row>
      );
    },
  ],
} satisfies Meta<typeof UUIDInput>;

export default meta;
type Story = StoryObj<typeof UUIDInput>;

export const Outline: Story = {
  render: (args) => <UUIDInput {...args} />,
  args: {
    inputVariant: 'uuid-outline',
  },
};

export const Material: Story = {
  render: (args) => <UUIDInput {...args} />,
  args: {
    inputVariant: 'uuid-material',
  },
};

export const Neumorphic: Story = {
  render: (args) => <UUIDInput {...args} />,
  args: {
    inputVariant: 'uuid-neumorphic',
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
        story: 'Neumorphic variant utilizes soft-UI extruded drop-shadows. The input field dynamically shifts to an inset concave shadow when focused. A tinted container background (e.g., `#e0e5ec`) is strictly required.',
      },
    },
  },
};

export const WithCustomIcon: Story = {
  render: (args) => <UUIDInput {...args} />,
  args: {
    inputVariant: 'uuid-outline',
    inputLabel: 'Secure Token (Custom Icon)',
    icon: <Icon name="lockclosed" height="15" width="15" style={{ opacity: 0.7 }} />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates overriding the default fingerprint icon by passing a custom ReactNode to the `icon` prop.',
      },
    },
  },
};

/**
 * **Random UUID Generation**
 * By enabling the `enableGenerate` prop, a shuffle icon appears in the trailing slot. When clicked, it securely generates a random hex string conforming exactly to the specified segment format and updates the Formik state.
 */
export const WithGenerateEnabled: Story = {
  render: (args) => <UUIDInput {...args} />,
  args: {
    inputVariant: 'uuid-outline',
    enableGenerate: true,
    inputLabel: 'Cryptographic License Key',
    type: 'uuid-8-4-4-4-12',
    placeholder: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
  },
};

/**
 * **Custom Formatting & Delimiters**
 * The component's parsing engine is highly flexible. You can define custom chunk lengths using the `type` prop (e.g., `uuid-6-6-6`) and swap the delimiter character (e.g., `:`). The component will automatically format user input to match.
 */
export const CustomFormatting: Story = {
  render: (args) => <UUIDInput {...args} />,
  args: {
    inputVariant: 'uuid-material',
    enableGenerate: true,
    inputLabel: 'MAC Address (Custom Format)',
    type: 'uuid-2-2-2-2-2-2',
    delimiter: ':',
    placeholder: 'XX:XX:XX:XX:XX:XX',
  },
};

export const WithHintAndTooltip: Story = {
  render: (args) => <UUIDInput {...args} />,
  args: {
    inputVariant: 'uuid-outline',
    isHinted: true,
    hintText: 'This unique identifier is used to verify HMAC request signatures during API handshakes.',
    hintUrl: 'https://docs.vectorsigma.io/auth/tokens',
  },
};

export const CustomTypography: Story = {
  render: (args) => <UUIDInput {...args} />,
  args: {
    inputVariant: 'uuid-outline',
    typography: typographyPresets['Burgundy Executive'],
    enableGenerate: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates hijacking internal Radix themes via the `typography` prop using the enterprise Burgundy Executive preset. Notice how the active copy checkmark inherits the custom text color.',
      },
    },
  },
};

export const ReadOnlyState: Story = {
  render: (args) => (
    <Formik
      initialValues={{ [args.alias]: '7A98B34F-8E12-4C5D-A011-3F7C92D5EB19' }}
      onSubmit={(values) => console.log(values)}
    >
      <>
        <UUIDInput {...args} />
      </>
    </Formik>
  ),
  args: {
    alias: 'lockedUUID',
    inputVariant: 'uuid-material',
    readOnly: true,
    enableGenerate: true,
    inputLabel: 'Provisioned Hardware ID (Read Only)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates visually muting the field and blocking keyboard input when `readOnly` is enabled. The generate button is automatically suppressed, but the copy-to-clipboard functionality remains active for DX convenience.',
      },
    },
  },
};

export const WithValidation: Story = {
  render: (args) => <UUIDInput {...args} />,
  args: {
    inputVariant: 'uuid-material',
    errorText: 'The provided UUID fails checksum validation.',
  },
  parameters: {
    formik: {
      initialValues: { apiClientKey: 'INVALID-HEX-STRING' },
    },
  },
};

/**
 * **Interactive Form Test:**
 * Click the generate button or manually type to observe the auto-formatted hex string state, and test the submission hook.
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
          if (!values[args.alias] || values[args.alias].length < 36) return { [args.alias]: 'A complete 128-bit UUID is required.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4" style={{ width: '100%', maxWidth: '450px' }}>
              <UUIDInput {...args} />
              
              <div style={{ backgroundColor: 'var(--gray-3)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text weight="bold" style={{ color: 'var(--ruby-9)' }}>
                  Live Formik State:
                </Text>
                <pre style={{ margin: 0, fontFamily: 'var(--code-font-family, monospace)', color: 'var(--gray-12)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
              
              <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer', width: '100%' }}>
                Generate & Save
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'deviceUUID',
    inputLabel: 'Device Hardware ID',
    inputVariant: 'uuid-material',
    enableGenerate: true,
  },
};