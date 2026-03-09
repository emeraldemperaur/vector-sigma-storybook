import type { Meta, StoryObj } from '@storybook/react';
import { Formik, useFormikContext } from 'formik';
import { Flex, Button, Text, Code } from '@radix-ui/themes';
import { RangeSlider } from './RangeSlider';

const FormikStateObserver = ({ fieldAlias }: { fieldAlias: string }) => {
  const { values } = useFormikContext<any>();
  return (
    <Flex direction="column" gap="1" style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--gray-3)', borderRadius: '8px' }}>
      <Text size="2" weight="bold" color="ruby">Live Formik State (Array):</Text>
      <Code variant="ghost">{JSON.stringify({ [fieldAlias]: values[fieldAlias] || [] }, null, 2)}</Code>
      <Text size="1" color="gray" style={{ marginTop: 4 }}>
        RangeSlider automatically renders two thumbs when Formik context is initialized with an array of two values.
      </Text>
    </Flex>
  );
};

const meta: Meta<typeof RangeSlider> = {
  title: 'χForm Components/RangeSlider',
  component: RangeSlider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Multi-thumb Range Slider component. **Must** be initialized in Formik with an array (e.g., \`[20, 80]\`) to activate the dual-thumb UI.

### Import
\`\`\`tsx
import { RangeSlider } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'targetPriceRange',
    width: 12,
    inputLabel: 'Target Budget Range ($)',
    minvalue: 0,
    maxvalue: 1000,
    stepvalue: 10,
    minStepsBetweenThumbs: 5,
  },
  decorators: [
    (Story) => (
      <Flex justify="center" align="start" style={{ padding: '2rem', width: '100%', maxWidth: '400px' }}>
        <Story />
      </Flex>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;


export const Outline: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: [200, 800] }} onSubmit={() => {}}>
      <RangeSlider {...args} />
    </Formik>
  ),
  args: { inputtype: 'range-outline' },
};

export const Material: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: [200, 800] }} onSubmit={() => {}}>
      <RangeSlider {...args} />
    </Formik>
  ),
  args: { inputtype: 'range-material' },
};

export const Neumorphic: Story = {
  render: (args) => (
    <div style={{ padding: '32px', backgroundColor: '#e0e5ec', borderRadius: '16px', width: '100%' }}>
      <Formik initialValues={{ [args.alias]: [200, 800] }} onSubmit={() => {}}>
        <RangeSlider {...args} />
      </Formik>
    </div>
  ),
  args: { inputtype: 'range-neumorphic' },
};


/**
 * **Interactive Form Test:**
 * Validates the distance between the two points and demonstrates how the array values sync perfectly with the label text above the track.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      const [min, max] = values[args.alias];
      alert(`Parameters Secured! \n\nMin: $${min}\nMax: $${max}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: [300, 700] }} 
        validate={(values) => {
          const [min, max] = values[args.alias];
          if (max - min < 100) return { [args.alias]: 'Minimum spread must be at least $100.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit }) => (
          <Flex direction="column" gap="4" style={{ width: '100%' }}>
            <RangeSlider {...args} />
            <FormikStateObserver fieldAlias={args.alias} />
            <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer' }}>
              Set Financial Parameters
            </Button>
          </Flex>
        )}
      </Formik>
    );
  },
  args: {
    inputtype: 'range-outline',
    inputLabel: 'Procurement Variance Range',
    isHinted: true,
    hintText: 'Drag the left and right handles. Thumbs cannot be placed closer than $50 apart (minStepsBetweenThumbs).',
  },
};