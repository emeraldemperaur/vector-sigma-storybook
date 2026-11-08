import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { SliderInput } from './SliderInput';
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
  title: 'χForm Components/SliderInput',
  component: SliderInput,
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
A precise, single-value scalar slider built on Radix UI primitives. Fully aligned with VectorSigma validation patterns, it strictly manages a single \`number\` primitive in Formik state (satisfying \`Yup.number()\`). 

Features enterprise-grade aesthetics, intelligent context-aware neumorphism, typography overrides, and real-time numeric readouts.

**Note:** This component must be rendered inside a \`<Formik>\` context. If you require an array of values (e.g., dual-thumb ranges), use the \`RangeSlider\` component instead.

### Import
\`\`\`tsx
import { SliderInput } from '@emeraldemperaur/vector-sigma';
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
          if (componentName.includes('SliderInput')) initialVal = '4';

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
      options: ['slider-outline', 'slider-material', 'slider-neumorphic'],
      description: 'The aesthetic design variation of the slider track and thumb.',
      table: { defaultValue: { summary: "'slider-outline'" } },
    },
    size: {
      control: 'radio',
      options: ['1', '2', '3'],
      description: 'Sizing scale for the slider track and thumb.',
      table: { defaultValue: { summary: "'2'" } },
    },
    alias: {
      control: 'text',
      description: 'The unique identifier bridging the input field to the Formik state.',
    },
    inputLabel: {
      control: 'text',
      description: 'The primary semantic label rendered above the slider track.',
    },
    width: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Defines the responsive grid column span for the component (1-12 based on the parent grid).',
      table: { defaultValue: { summary: '12' } },
    },
    min: {
      control: 'number',
      description: 'Minimum allowable numerical boundary for the slider.',
      table: { defaultValue: { summary: '0' } },
    },
    max: {
      control: 'number',
      description: 'Maximum allowable numerical boundary for the slider.',
      table: { defaultValue: { summary: '100' } },
    },
    step: {
      control: 'number',
      description: 'Incremental granularity step interval between values.',
      table: { defaultValue: { summary: '1' } },
    },
    newRow: {
      control: 'boolean',
      description: 'Forces the component to break into a new Flex/Grid row within the Form layout.',
      table: { defaultValue: { summary: 'false' } },
    },
    showValueBadge: {
      control: 'boolean',
      description: 'Toggles the real-time value pill/badge in the top-right header row.',
      table: { defaultValue: { summary: 'true' } },
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
    alias: 'numberOfRentalRooms',
    inputLabel: 'Number of Rental Rooms',
    min: 0,
    max: 10,
    step: 1,
    width: 12,
  },
  decorators: [
    (Story, context) => {
      const isErrorState = Boolean(context.args.errorText);
      const alias = context.args.alias || 'sliderField';
      // Fallback state matches the component's internal logic (Single Number)
      const initialVal = context.parameters?.formik?.initialValues?.[alias] ?? 4;

      return (
        <Row>
        <Formik
          key={`formik-sync-${context.args.errorText || 'clean'}`}
          initialValues={{ [alias]: initialVal }}
          initialErrors={isErrorState ? { [alias]: context.args.errorText as string } : {}}
          initialTouched={isErrorState ? { [alias]: true } : {}}
          onSubmit={(values) => console.log('SliderInput Submit Payload:', values)}
        >
            <Story />
        </Formik>
        </Row>
      );
    },
  ],
} satisfies Meta<typeof SliderInput>;

export default meta;
type Story = StoryObj<typeof SliderInput>;

export const Outline: Story = {
  render: (args) => <SliderInput {...args} />,
  args: {
    inputtype: 'slider-outline',
  },
};

export const Material: Story = {
  render: (args) => <SliderInput {...args} />,
  args: {
    inputtype: 'slider-material',
  },
};

export const Neumorphic: Story = {
  render: (args) => <SliderInput {...args} />,
  args: {
    inputtype: 'slider-neumorphic',
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
        story: 'Neumorphic variant utilizes soft-UI extruded drop-shadows. The track dynamically recesses into a concave shadow while the thumb protrudes outward. A tinted container background (e.g., `#e0e5ec`) is strictly required.',
      },
    },
  },
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <SliderInput {...args} size="1" alias="slider1" inputLabel="Size 1 (Compact)" />
      <SliderInput {...args} size="2" alias="slider2" inputLabel="Size 2 (Default)" />
      <SliderInput {...args} size="3" alias="slider3" inputLabel="Size 3 (Large)" />
    </>
  ),
  args: {
    inputtype: 'slider-outline',
  },
};

export const FormattedBadge: Story = {
  render: (args) => <SliderInput {...args} />,
  args: {
    inputtype: 'slider-material',
    alias: 'computeInstances',
    inputLabel: 'Provisioned EC2 Instances',
    min: 1,
    max: 50,
    step: 1,
    valueFormatter: (val) => `${val} Nodes`,
  },
  parameters: {
    formik: {
      initialValues: { computeInstances: 12 },
    },
    docs: {
      description: {
        story: 'The `valueFormatter` prop allows you to inject custom text suffixes or locale formatting (e.g., currency) directly into the real-time value badge.',
      },
    },
  },
};

export const WithHintAndTooltip: Story = {
  render: (args) => <SliderInput {...args} />,
  args: {
    inputtype: 'slider-outline',
    isHinted: true,
    hintText: 'Select the maximum room occupancy for seasonal listings.',
    hintUrl: 'https://docs.vectorsigma.io/properties/rooms',
  },
};

export const CustomTypography: Story = {
  render: (args) => <SliderInput {...args} />,
  args: {
    inputtype: 'slider-outline',
    typography: typographyPresets['Midnight Slate'],
    valueFormatter: (val) => `${val} %`,
    max: 100,
    step: 5,
  },
  parameters: {
    formik: {
      initialValues: { numberOfRentalRooms: 75 }, 
    },
    docs: {
      description: {
        story: 'Demonstrates hijacking internal Radix themes via the `typography` prop using the enterprise Midnight Slate preset. The active range track, thumb border, and numeric value badge dynamically adapt to the palette.',
      },
    },
  },
};

export const ReadOnlyState: Story = {
  render: (args) => (
    <Formik
      initialValues={{ [args.alias]: 8 }}
      onSubmit={(values) => console.log(values)}
    >
      <>
        <SliderInput {...args} />
      </>
    </Formik>
  ),
  args: {
    alias: 'lockedRooms',
    inputtype: 'slider-material',
    readOnly: true,
    inputLabel: 'Verified Room Count (Read Only)',
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
  render: (args) => <SliderInput {...args} />,
  args: {
    inputtype: 'slider-material',
    errorText: 'A valid number of rooms within the property limit is required.',
  },
};

/**
 * **Interactive Form Test:**
 * Drag the thumb, observe the scalar number primitive update in real-time, and test the submission hook.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      alert(`Form Submitted! \n\nPayload: ${JSON.stringify(values, null, 2)}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: 4 }} 
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4" style={{ width: '100%', maxWidth: '450px' }}>
              <SliderInput {...args} />
              
              <div style={{ backgroundColor: 'var(--gray-3)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text weight="bold" style={{ color: 'var(--ruby-9)' }}>
                  Live Formik State:
                </Text>
                <pre style={{ margin: 0, fontFamily: 'var(--code-font-family, monospace)', color: 'var(--gray-12)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
              
              <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer', width: '100%' }}>
                Save Capacity
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'computeNodes',
    inputLabel: 'Provisioned Compute Nodes',
    inputtype: 'slider-material',
    min: 1,
    max: 20,
    step: 1,
  },
};