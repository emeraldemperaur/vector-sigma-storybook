import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { DatePicker } from './DatePicker';
import { Row } from './Row';
import { Column } from './Column';
import { Button, Flex, Text } from '@radix-ui/themes';

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
  title: 'χForm Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      inlineStories: false,
      story: {
        iframeHeight: '450px', 
      },
      description: {
        component: `
Equipped with enterprise-grade aesthetics, intelligent context-aware neumorphism, typography overrides, and strict Formik integration. Designed for LLM/MCP workflows.

**Note:** This component must be rendered inside a \`<Formik>\` context. It internally stores a standard JavaScript \`Date\` object (or \`null\`) in the Formik state payload.

### Import
\`\`\`tsx
import { DatePicker } from '@emeraldemperaur/vector-sigma';
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
      options: ['datepicker-outline', 'datepicker-material', 'datepicker-neumorphic'],
      description: 'The aesthetic design language of the DatePicker component.',
      table: { defaultValue: { summary: "'datepicker-outline'" } },
    },
    alias: {
      control: 'text',
      description: 'The unique identifier bridging the input field to the Formik state.',
    },
    inputLabel: {
      control: 'text',
      description: 'The primary semantic label rendered above the DatePicker field.',
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
      description: 'Placeholder text utilized when the date state is empty or null.',
      table: { defaultValue: { summary: "'Select date'" } },
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
    alias: 'incorporationDate',
    inputLabel: 'Corporate Incorporation Date',
    width: 12,
  },
  decorators: [
    (Story, context) => {
      const isErrorState = Boolean(context.args.errorText);
      const alias = context.args.alias || 'dateField';
      const initialVal = context.parameters?.formik?.initialValues?.[alias] ?? null;

      return (
        <Row>
          <Formik
            key={`formik-sync-${context.args.errorText || 'clean'}`}
            initialValues={{ [alias]: initialVal }}
            initialErrors={isErrorState ? { [alias]: context.args.errorText as string } : {}}
            initialTouched={isErrorState ? { [alias]: true } : {}}
            onSubmit={(values) => console.log('DatePicker Submit Payload:', values)}
          >
            <Story />
          </Formik>
        </Row>
      );
    },
  ],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Outline: Story = {
  render: (args) => <DatePicker {...args} />,
  args: {
    inputtype: 'datepicker-outline',
  },
};

export const Material: Story = {
  render: (args) => <DatePicker {...args} />,
  args: {
    inputtype: 'datepicker-material',
  },
};

export const Neumorphic: Story = {
  render: (args) => <DatePicker {...args} />,
  args: {
    inputtype: 'datepicker-neumorphic',
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
        story: 'Neumorphic variant utilizes soft-UI extruded drop-shadows for both the input trigger and the calendar popover. A tinted container background (e.g., `#e0e5ec`) is required for the shadows to render correctly.',
      },
    },
  },
};

export const WithHintAndTooltip: Story = {
  render: (args) => <DatePicker {...args} />,
  args: {
    inputtype: 'datepicker-outline',
    isHinted: true,
    hintText: 'Must be a valid date registered with the federal commerce authority.',
    hintUrl: 'https://docs.vectorsigma.io/compliance/dates',
  },
};

export const CustomTypography: Story = {
  render: (args) => <DatePicker {...args} />,
  args: {
    inputtype: 'datepicker-outline',
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
  render: (args) => <DatePicker {...args} />,
  args: {
    inputtype: 'datepicker-outline',
    readOnly: true,
    inputLabel: 'Verified Formation Date (Read Only)',
  },
  parameters: {
    formik: {
      initialValues: { incorporationDate: new Date('2026-01-15T12:00:00Z') },
    },
    docs: {
      description: {
        story: 'Demonstrates visually muting the field and blocking popover interactions when `readOnly` is enabled.',
      },
    },
  },
};

export const WithValidation: Story = {
  render: (args) => <DatePicker {...args} />,
  args: {
    inputtype: 'datepicker-material',
    errorText: 'A retroactive date prior to today is strictly required.',
  },
  parameters: {
    formik: {
      initialValues: { incorporationDate: null },
    },
  },
};

/**
 * **Interactive Form Test:**
 * Pick a date, verify timestamp or ISO string binding in Formik state, and test the submission hook.
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
            return { [args.alias]: 'A scheduled launch date is required.' };
          }
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4" style={{ width: '100%', maxWidth: '450px' }}>
              <DatePicker {...args} />
              
              <div style={{ backgroundColor: 'var(--gray-3)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text weight="bold" style={{ color: 'var(--ruby-9)' }}>
                  Live Formik State:
                </Text>
                <pre style={{ margin: 0, fontFamily: 'var(--code-font-family, monospace)', color: 'var(--gray-12)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
              
              <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer', width: '100%' }}>
                Schedule Deployment
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'deploymentDate',
    inputLabel: 'Target Release Date',
    inputtype: 'datepicker-material',
    width: 12,
  },
};