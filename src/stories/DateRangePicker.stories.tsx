import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { DateRangePicker } from './DateRangePicker';
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
  title: 'χForm Components/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      inlineStories: false,
      story: {
        iframeHeight: '480px', 
      },
      description: {
        component: `
Equipped with enterprise-grade aesthetics, intelligent context-aware neumorphism, typography overrides, and strict Formik integration. Designed for LLM/MCP workflows.

**Note:** This component must be rendered inside a \`<Formik>\` context. It internally stores the selection as an object containing \`{ from: Date | null, to: Date | null }\` in the Formik state payload.

### Import
\`\`\`tsx
import { DateRangePicker } from '@emeraldemperaur/vector-sigma';
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
      options: ['daterangepicker-outline', 'daterangepicker-material', 'daterangepicker-neumorphic'],
      description: 'The aesthetic design language of the DateRangePicker component.',
      table: { defaultValue: { summary: "'daterangepicker-outline'" } },
    },
    alias: {
      control: 'text',
      description: 'The unique identifier bridging the input field to the Formik state.',
    },
    inputLabel: {
      control: 'text',
      description: 'The primary semantic label rendered above the DateRangePicker field.',
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
      table: { defaultValue: { summary: "'Select date range'" } },
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
    alias: 'hotelReservationDates',
    inputLabel: 'Hotel Reservation (Check-In / Check-Out)',
    width: 12,
  },
  decorators: [
    (Story, context) => {
      const isErrorState = Boolean(context.args.errorText);
      const alias = context.args.alias || 'dateRangeField';
      const initialVal = context.parameters?.formik?.initialValues?.[alias] ?? { from: null, to: null };

      return (
        <Row>
          <Formik
            key={`formik-sync-${context.args.errorText || 'clean'}`}
            initialValues={{ [alias]: initialVal }}
            initialErrors={isErrorState ? { [alias]: context.args.errorText as string } : {}}
            initialTouched={isErrorState ? { [alias]: true } : {}}
            onSubmit={(values) => console.log('DateRangePicker Submit Payload:', values)}
          >
            <Story />
          </Formik>
        </Row>
      );
    },
  ],
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Outline: Story = {
  render: (args) => <DateRangePicker {...args} />,
  args: {
    inputtype: 'daterangepicker-outline',
  },
};

export const Material: Story = {
  render: (args) => <DateRangePicker {...args} />,
  args: {
    inputtype: 'daterangepicker-material',
  },
};

export const Neumorphic: Story = {
  render: (args) => <DateRangePicker {...args} />,
  args: {
    inputtype: 'daterangepicker-neumorphic',
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
        story: 'Neumorphic variant utilizes soft-UI extruded drop-shadows. The calendar dynamically alters its styling to inset shadows for selected ranges. A tinted container background (e.g., `#e0e5ec`) is required.',
      },
    },
  },
};

export const WithHintAndTooltip: Story = {
  render: (args) => <DateRangePicker {...args} />,
  args: {
    inputtype: 'daterangepicker-outline',
    isHinted: true,
    hintText: 'Check-in begins at 3:00 PM local time. Check-out is strictly enforced at 11:00 AM.',
    hintUrl: 'https://docs.vectorsigma.io/hotel-policies',
  },
};

export const CustomTypography: Story = {
  render: (args) => <DateRangePicker {...args} />,
  args: {
    inputtype: 'daterangepicker-outline',
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

export const PrePopulatedState: Story = {
  render: (args) => (
    <Formik
      initialValues={{
        [args.alias]: {
          from: new Date('2026-12-01T12:00:00Z'),
          to: new Date('2026-12-10T12:00:00Z'),
        },
      }}
      onSubmit={(values) => console.log(values)}
    >
      <DateRangePicker {...args} />
    </Formik>
  ),
  args: {
    alias: 'hotelReservationDates',
    inputtype: 'daterangepicker-outline',
    inputLabel: 'Pre-Populated Trip Itinerary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates mounting the component with a pre-selected date range by injecting an object with `from` and `to` properties into Formik`s `initialValues`.',
      },
    },
  },
};

export const ReadOnlyState: Story = {
  render: (args) => (
    <Formik
      initialValues={{
        [args.alias]: {
          from: new Date('2026-05-01T12:00:00Z'),
          to: new Date('2026-05-15T12:00:00Z'),
        },
      }}
      onSubmit={(values) => console.log(values)}
    >
      <DateRangePicker {...args} />
    </Formik>
  ),
  args: {
    alias: 'verifiedEventDates',
    inputtype: 'daterangepicker-outline',
    readOnly: true,
    inputLabel: 'Verified Event Dates (Read Only)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates visually muting the field and blocking popover interactions when `readOnly` is enabled.',
      },
    },
  },
};

export const WithValidation: Story = {
  render: (args) => <DateRangePicker {...args} />,
  args: {
    inputtype: 'daterangepicker-material',
    errorText: 'Both a valid check-in and check-out date are required to proceed.',
  },
  parameters: {
    formik: {
      initialValues: { hotelReservationDates: { from: null, to: null } },
    },
  },
};

/**
 * **Interactive Form Test:**
 * Select date boundaries, observe the range object or array state, and test the submission hook.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      alert(`Form Submitted! \n\nPayload: ${JSON.stringify(values, null, 2)}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: { from: '', to: '' } }} 
        validate={(values) => {
          const val = values[args.alias];
          if (!val || !val.from || !val.to) {
            return { [args.alias]: 'Complete start and end dates are required.' };
          }
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4" style={{ width: '100%', maxWidth: '450px' }}>
              <DateRangePicker {...args} />
              
              <div style={{ backgroundColor: 'var(--gray-3)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text weight="bold" style={{ color: 'var(--ruby-9)' }}>
                  Live Formik State:
                </Text>
                <pre style={{ margin: 0, fontFamily: 'var(--code-font-family, monospace)', color: 'var(--gray-12)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
              
              <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer', width: '100%' }}>
                Apply Audit Range
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'auditPeriod',
    inputLabel: 'Compliance Audit Window',
    inputtype: 'daterangepicker-material',
    width: 12,
  },
};