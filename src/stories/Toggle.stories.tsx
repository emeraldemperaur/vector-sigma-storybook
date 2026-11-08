import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { Toggle } from './Toggle';
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
  title: 'χForm Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      inlineStories: false,
      story: {
        iframeHeight: '150px',
      },
      description: {
        component: `
A compact boolean switch built on Radix UI primitives. Fully aligned with VectorSigma validation patterns, it strictly manages a single \`boolean\` primitive in Formik state (satisfying \`Yup.boolean()\`).

Features enterprise-grade aesthetics, responsive typography overrides, and strict Formik integration.

**Note:** This component must be rendered inside a \`<Formik>\` context.

### Import
\`\`\`tsx
import { Toggle } from '@emeraldemperaur/vector-sigma';
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
      options: ['toggle-outline', 'toggle-material', 'toggle-neumorphic'],
      description: 'The aesthetic design variation of the toggle track and thumb.',
      table: { defaultValue: { summary: "'toggle-outline'" } },
    },
    size: {
      control: 'radio',
      options: ['1', '2', '3'],
      description: 'Sizing scale for the toggle track and thumb.',
      table: { defaultValue: { summary: "'2'" } },
    },
    alias: {
      control: 'text',
      description: 'The unique identifier bridging the input field to the Formik state.',
    },
    inputLabel: {
      control: 'text',
      description: 'The primary semantic label rendered beside the toggle.',
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
    alias: 'enableMFA',
    inputLabel: 'Require Multi-Factor Authentication',
    width: 12,
  },
  decorators: [
    (Story, context) => {
      const isErrorState = Boolean(context.args.errorText);
      const alias = context.args.alias || 'toggleField';
      const initialVal = context.parameters?.formik?.initialValues?.[alias] ?? false;

      return (
        <Row>
        <Formik
          key={`formik-sync-${context.args.errorText || 'clean'}`}
          initialValues={{ [alias]: initialVal }}
          initialErrors={isErrorState ? { [alias]: context.args.errorText as string } : {}}
          initialTouched={isErrorState ? { [alias]: true } : {}}
          onSubmit={(values) => console.log('Toggle Submit Payload:', values)}
        >
            <Story />
        </Formik>
        </Row>
      );
    },
  ],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Outline: Story = {
  render: (args) => <Toggle {...args} />,
  args: {
    inputvariant: 'toggle-outline',
  },
};

export const Material: Story = {
  render: (args) => <Toggle {...args} />,
  args: {
    inputvariant: 'toggle-material',
  },
};

export const Neumorphic: Story = {
  render: (args) => <Toggle {...args} />,
  args: {
    inputvariant: 'toggle-neumorphic',
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
        story: 'Neumorphic variant utilizes soft-UI extruded drop-shadows. A tinted container background (e.g., `#e0e5ec`) is strictly required.',
      },
    },
  },
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <Toggle {...args} size="1" alias="toggle1" inputLabel="Size 1 (Compact)" />
      <Toggle {...args} size="2" alias="toggle2" inputLabel="Size 2 (Default)" />
      <Toggle {...args} size="3" alias="toggle3" inputLabel="Size 3 (Large)" />
    </>
  ),
  args: {
    inputvariant: 'toggle-outline',
  },
};

export const WithHintAndTooltip: Story = {
  render: (args) => <Toggle {...args} />,
  args: {
    inputvariant: 'toggle-outline',
    isHinted: true,
    hintText: 'Enforce MFA across all fleet devices globally.',
    hintUrl: 'https://docs.vectorsigma.io/security',
  },
};

export const CustomTypography: Story = {
  render: (args) => <Toggle {...args} />,
  args: {
    inputvariant: 'toggle-outline',
    typography: typographyPresets['Midnight Slate'],
  },
  parameters: {
    formik: {
      initialValues: { enableMFA: true },
    },
    docs: {
      description: {
        story: 'Demonstrates hijacking internal Radix themes via the `typography` prop using the enterprise Midnight Slate preset.',
      },
    },
  },
};

export const ReadOnlyState: Story = {
  render: (args) => (
    <Formik
      initialValues={{ [args.alias]: true }}
      onSubmit={(values) => console.log(values)}
    >
      <>
        <Toggle {...args} />
      </>
    </Formik>
  ),
  args: {
    alias: 'lockedFeature',
    inputvariant: 'toggle-material',
    readOnly: true,
    inputLabel: 'Core API Access (Read Only)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates visually muting the track and completely disabling thumb pointer events when `readOnly` is enabled.',
      },
    },
  },
};

export const WithValidation: Story = {
  render: (args) => <Toggle {...args} />,
  args: {
    inputvariant: 'toggle-material',
    errorText: 'MFA must be enabled to proceed.',
  },
};

/**
 * **Interactive Form Test:**
 * Click the toggle, observe the boolean state flip in the observer, and test the Formik submission hook.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      const isEnabled = values[args.alias];
      alert(`Settings Saved! \n\nTelemetry is currently: ${isEnabled ? 'ACTIVE' : 'INACTIVE'}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: false }} 
        validate={(values) => {
          if (!values[args.alias]) return { [args.alias]: 'You must accept telemetry collection to proceed.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4" style={{ width: '100%', maxWidth: '450px' }}>
              <Toggle {...args} onClick={() => console.log('External onClick fired on Toggle!')} />
              
              <div style={{ backgroundColor: 'var(--gray-3)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text weight="bold" style={{ color: 'var(--ruby-9)' }}>
                  Live Formik State:
                </Text>
                <pre style={{ margin: 0, fontFamily: 'var(--code-font-family, monospace)', color: 'var(--gray-12)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
              
              <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer', width: '100%' }}>
                Save Configuration
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'enableTelemetry',
    inputLabel: 'Required Diagnostic Logs',
    inputvariant: 'toggle-material',
    isHinted: true,
    hintText: 'Toggle this on to agree to our data collection policies.',
  },
};