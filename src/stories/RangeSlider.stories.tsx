import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { RangeSlider } from './RangeSlider';
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
  title: 'χForm Components/RangeSlider',
  component: RangeSlider,
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
An advanced, highly-responsive slider component built on Radix UI primitives. Fully aligned with VectorSigma validation patterns, it strictly manages an array of numbers (\`number[]\`) in Formik state to support both single-thumb and dual-thumb range workflows. 

Features enterprise-grade aesthetics, intelligent context-aware neumorphism, typography overrides, and real-time numeric readouts.

**Note:** This component must be rendered inside a \`<Formik>\` context.

### Import
\`\`\`tsx
import { RangeSlider } from '@emeraldemperaur/vector-sigma';
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
          if (componentName.includes('MultipleSelect') || componentName.includes('Range')) initialVal = '[25, 75]';
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
      options: ['range-outline', 'range-material', 'range-neumorphic'],
      description: 'The aesthetic design variation of the slider track and thumb.',
      table: { defaultValue: { summary: "'range-outline'" } },
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
    minStepsBetweenThumbs: {
      control: 'number',
      description: 'Minimum step distance required between dual thumbs when operating in multi-value range mode.',
      table: { defaultValue: { summary: '0' } },
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
    alias: 'coverageRadiusKm',
    inputLabel: 'Geographic Coverage Radius',
    min: 0,
    max: 100,
    step: 5,
    width: 12,
  },
  decorators: [
    (Story, context) => {
      const isErrorState = Boolean(context.args.errorText);
      const alias = context.args.alias || 'sliderField';
      const initialVal = context.parameters?.formik?.initialValues?.[alias] ?? [25];

      return (
        <Row>
        <Formik
          key={`formik-sync-${context.args.errorText || 'clean'}`}
          initialValues={{ [alias]: initialVal }}
          initialErrors={isErrorState ? { [alias]: context.args.errorText as string } : {}}
          initialTouched={isErrorState ? { [alias]: true } : {}}
          onSubmit={(values) => console.log('RangeSlider Submit Payload:', values)}
        >
            <Story />
        </Formik>
        </Row>
      );
    },
  ],
} satisfies Meta<typeof RangeSlider>;

export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const Outline: Story = {
  render: (args) => <RangeSlider {...args} />,
  args: {
    inputtype: 'range-outline',
  },
};

export const Material: Story = {
  render: (args) => <RangeSlider {...args} />,
  args: {
    inputtype: 'range-material',
  },
};

export const Neumorphic: Story = {
  render: (args) => <RangeSlider {...args} />,
  args: {
    inputtype: 'range-neumorphic',
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

/**
 * **Dual-Thumb Range Mode**
 * Because the component strictly manages an array of numbers (`number[]`) in Formik state, converting a standard slider into a dual-thumb range selector is as simple as passing an array with two default values into the Formik initialization (e.g., `[20, 80]`). 
 * The `minStepsBetweenThumbs` prop prevents the thumbs from overlapping.
 */
export const DualThumbRange: Story = {
  render: (args) => <RangeSlider {...args} />,
  args: {
    inputtype: 'range-material',
    alias: 'priceRange',
    inputLabel: 'Target Budget Bounds (Thousands)',
    min: 10,
    max: 150,
    step: 5,
    minStepsBetweenThumbs: 10,
    valueFormatter: (val) => `$${val}k`,
  },
  parameters: {
    formik: {
      initialValues: { priceRange: [30, 90] },
    },
  },
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <RangeSlider {...args} size="1" alias="range1" inputLabel="Size 1 (Compact)" />
      <RangeSlider {...args} size="2" alias="range2" inputLabel="Size 2 (Default)" />
      <RangeSlider {...args} size="3" alias="range3" inputLabel="Size 3 (Large)" />
    </>
  ),
  args: {
    inputtype: 'range-outline',
  },
};

export const WithHintAndTooltip: Story = {
  render: (args) => <RangeSlider {...args} />,
  args: {
    inputtype: 'range-outline',
    isHinted: true,
    hintText: 'Specifies the maximum geographic boundary radius for physical delivery operations.',
    hintUrl: 'https://docs.vectorsigma.io/logistics/radius',
  },
};

export const CustomTypography: Story = {
  render: (args) => <RangeSlider {...args} />,
  args: {
    inputtype: 'range-outline',
    typography: typographyPresets['Midnight Slate'],
    valueFormatter: (val) => `${val} %`,
  },
  parameters: {
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
      initialValues={{ [args.alias]: [45] }}
      onSubmit={(values) => console.log(values)}
    >
        <RangeSlider {...args} />
    </Formik>
  ),
  args: {
    alias: 'lockedCoverage',
    inputtype: 'range-material',
    readOnly: true,
    inputLabel: 'Provisioned Coverage Area (Read Only)',
    valueFormatter: (val) => `${val} miles`,
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
  render: (args) => <RangeSlider {...args} />,
  args: {
    inputtype: 'range-material',
    errorText: 'A valid operational radius within allowable bounds is required.',
  },
};

/**
 * **Interactive Form Test:**
 * Drag the dual thumbs, observe the array of numbers ([min, max]) update in real-time, and test the submission hook.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      alert(`Form Submitted! \n\nPayload: ${JSON.stringify(values, null, 2)}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: [25, 75] }} 
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4" style={{ width: '100%', maxWidth: '450px' }}>
              <RangeSlider {...args} />
              
              <div style={{ backgroundColor: 'var(--gray-3)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text weight="bold" style={{ color: 'var(--ruby-9)' }}>
                  Live Formik State:
                </Text>
                <pre style={{ margin: 0, fontFamily: 'var(--code-font-family, monospace)', color: 'var(--gray-12)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
              
              <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer', width: '100%' }}>
                Save Filter Range
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'priceRange',
    inputLabel: 'Target Budget ($k)',
    inputtype: 'range-material',
    min: 0,
    max: 100,
    step: 5,
    minStepsBetweenThumbs: 10,
  },
};