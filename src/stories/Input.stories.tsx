import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { Button, Flex, Text } from '@radix-ui/themes';
import { Input } from './Input';
import { Icon } from './Icons';
import { Row } from './Row';
import { Column } from './Column';

const iconMap = {
  'None': undefined,
  'Mail': <Icon name="envelopeopen" width="16" height="16" />,
  'Lock': <Icon name="lockclosed" width="16" height="16" />,
  'Search': <Icon name="search" width="16" height="16" />,
  'Phone': <Icon name="mobile" width="16" height="16" />,
  'Link': <Icon name="paperplane" width="16" height="16" />,
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
  title: 'χForm Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      inlineStories: false,
      story: {
        iframeHeight: '200px',
      },
      description: {
        component: `
A highly versatile, enterprise-grade text input field. Equipped with intelligent context-aware neumorphism, typography overrides, inline icon support, HTML5 type configurations, and strict Formik integration. Designed for LLM/MCP workflows.

**Note:** This component must be rendered inside a \`<Formik>\` context.

### Import
\`\`\`tsx
import { Input } from '@emeraldemperaur/vector-sigma';
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
      description: 'The aesthetic design language of the Input field.',
      table: { defaultValue: { summary: "'input-outline'" } },
    },
    inputtype: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'url', 'number', 'search', 'date', 'time'],
      description: 'The HTML input type attribute governing native browser behavior and soft keyboards.',
      table: { defaultValue: { summary: "'text'" } },
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
    icon: {
      control: 'select',
      options: Object.keys(iconMap),
      mapping: iconMap,
      description: 'Optional ReactNode to render an icon inside the left boundary of the input field.',
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
    alias: 'emailAddress',
    inputLabel: 'Corporate Email Address',
    inputtype: 'email',
    placeholder: 'name@company.com',
    width: 12,
  },
  decorators: [
    (Story, context) => {
      const isErrorState = Boolean(context.args.errorText);
      const alias = context.args.alias || 'inputField';
      const initialVal = context.parameters?.formik?.initialValues?.[alias] ?? '';

      return (
          <Row>
          <Formik
            key={`formik-sync-${context.args.errorText || 'clean'}`}
            initialValues={{ [alias]: initialVal }}
            initialErrors={isErrorState ? { [alias]: context.args.errorText as string } : {}}
            initialTouched={isErrorState ? { [alias]: true } : {}}
            onSubmit={(values) => console.log('Input Submit Payload:', values)}
          >
            <Story />
          </Formik>
          </Row>
      );
    },
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Outline: Story = {
  render: (args) => <Input {...args} />,
  args: {
    inputvariant: 'input-outline',
  },
};

export const Material: Story = {
  render: (args) => <Input {...args} />,
  args: {
    inputvariant: 'input-material',
  },
};

export const Neumorphic: Story = {
  render: (args) => <Input {...args} />,
  args: {
    inputvariant: 'input-neumorphic',
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
        story: 'Neumorphic variant utilizes soft-UI extruded drop-shadows. The input field dynamically shifts to an inset concave shadow when focused. A tinted container background (e.g., `#e0e5ec`) is strictly required.',
      },
    },
  },
};

export const WithIcon: Story = {
  render: (args) => <Input {...args} />,
  args: {
    inputvariant: 'input-outline',
    icon: iconMap['Mail'],
  },
};

export const PasswordMode: Story = {
  render: (args) => <Input {...args} />,
  args: {
    alias: 'userPassword',
    inputLabel: 'Account Password',
    inputvariant: 'input-outline',
    inputtype: 'password',
    placeholder: '••••••••••••',
    icon: iconMap['Lock'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Setting `inputtype="password"` triggers native browser password obfuscation and soft-keyboard credential integration.',
      },
    },
  },
};

export const Sizes: Story = {
  render: (args) => (
    <Flex direction="column" gap="4" style={{ width: '100%' }}>
      <Input {...args} size="1" alias="input1" inputLabel="Size 1 (Compact)" placeholder="Small input" />
      <Input {...args} size="2" alias="input2" inputLabel="Size 2 (Default)" placeholder="Medium input" />
      <Input {...args} size="3" alias="input3" inputLabel="Size 3 (Large)" placeholder="Large input" />
    </Flex>
  ),
  args: {
    inputvariant: 'input-outline',
  },
};

export const WithHintAndTooltip: Story = {
  render: (args) => <Input {...args} />,
  args: {
    inputvariant: 'input-outline',
    isHinted: true,
    hintText: 'We use this email to send deployment alerts and billing invoices.',
    hintUrl: 'https://docs.vectorsigma.io/privacy',
  },
};

export const CustomTypography: Story = {
  render: (args) => <Input {...args} />,
  args: {
    inputvariant: 'input-outline',
    typography: typographyPresets['Burgundy Executive'],
    icon: iconMap['Mail'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates hijacking internal Radix themes via the `typography` prop using the enterprise Burgundy Executive preset.',
      },
    },
  },
};

export const ReadOnlyState: Story = {
  render: (args) => (
    <Formik
      initialValues={{ [args.alias]: 'admin@vectorsigma.io' }}
      onSubmit={(values) => console.log(values)}
    >
      <Input {...args} />
    </Formik>
  ),
  args: {
    alias: 'adminEmail',
    inputtype: 'email',
    inputvariant: 'input-material',
    readOnly: true,
    inputLabel: 'Primary Administrator (Read Only)',
    icon: iconMap['Mail'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates visually muting the field and blocking keyboard input when `readOnly` is enabled.',
      },
    },
  },
};

export const WithValidation: Story = {
  render: (args) => <Input {...args} />,
  args: {
    inputvariant: 'input-material',
    errorText: 'A valid corporate email domain (@company.com) is strictly required.',
    icon: iconMap['Mail'],
  },
  parameters: {
    formik: {
      initialValues: { emailAddress: 'invalid-email-format' },
    },
  },
};

/**
 * **Interactive Form Test:**
 * Type in the field to observe real-time string state updates and test the Formik submission hook.
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
          if (!values[args.alias]) return { [args.alias]: 'You must provide an email to proceed.' };
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[args.alias])) return { [args.alias]: 'Invalid email format.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4" style={{ width: '100%', maxWidth: '450px' }}>
              <Input {...args} />
              
              <div style={{ backgroundColor: 'var(--gray-3)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text weight="bold" style={{ color: 'var(--ruby-9)' }}>
                  Live Formik State:
                </Text>
                <pre style={{ margin: 0, fontFamily: 'var(--code-font-family, monospace)', color: 'var(--gray-12)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
              
              <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer', width: '100%' }}>
                Save Email
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'userEmail',
    inputLabel: 'Corporate Email',
    inputtype: 'email',
    inputvariant: 'input-material',
    placeholder: 'name@company.com',
  },
};