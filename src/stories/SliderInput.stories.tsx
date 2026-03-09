import type { Meta, StoryObj } from '@storybook/react';
import { Formik, useFormikContext } from 'formik';
import { Flex, Button, Text, Code } from '@radix-ui/themes';
import { SliderInput } from './SliderInput';

const FormikStateObserver = ({ fieldAlias }: { fieldAlias: string }) => {
  const { values } = useFormikContext<any>();
  return (
    <Flex direction="column" gap="1" style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--gray-3)', borderRadius: '8px' }}>
      <Text size="2" weight="bold" color="ruby">Live Formik State:</Text>
      <Code variant="ghost">{JSON.stringify({ [fieldAlias]: values[fieldAlias] || 0 }, null, 2)}</Code>
    </Flex>
  );
};

const meta: Meta<typeof SliderInput> = {
  title: 'χForm Components/SliderInput',
  component: SliderInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Single-value Slider component. Binds a single numeric value to Formik state.

### Import
\`\`\`tsx
import { SliderInput } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'serverInstances',
    width: 12,
    inputLabel: 'Number of Deployed Instances',
    minvalue: 0,
    maxvalue: 100,
    stepvalue: 1,
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
type Story = StoryObj<typeof SliderInput>;

// --- DESIGN VARIANTS ---

export const Outline: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: 25 }} onSubmit={() => {}}>
      <SliderInput {...args} />
    </Formik>
  ),
  args: { inputtype: 'slider-outline' },
};

export const Material: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: 50 }} onSubmit={() => {}}>
      <SliderInput {...args} />
    </Formik>
  ),
  args: { inputtype: 'slider-material' },
};

export const Neumorphic: Story = {
  render: (args) => (
    <div style={{ padding: '32px', backgroundColor: '#e0e5ec', borderRadius: '16px', width: '100%' }}>
      <Formik initialValues={{ [args.alias]: 75 }} onSubmit={() => {}}>
        <SliderInput {...args} />
      </Formik>
    </div>
  ),
  args: { inputtype: 'slider-neumorphic' },
};

// --- INTERACTIVE TESTING ---

/**
 * **Interactive Form Test:**
 * Drag the slider, observe the live Formik state update, and test the mock submission validation.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      alert(`Capacity Set! \n\nInstances: ${values[args.alias]}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: 0 }} 
        validate={(values) => {
          if (values[args.alias] === 0) return { [args.alias]: 'You must deploy at least 1 instance.' };
          if (values[args.alias] > 90) return { [args.alias]: 'Warning: Approaching maximum server load limit.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit }) => (
          <Flex direction="column" gap="4" style={{ width: '100%' }}>
            <SliderInput {...args} />
            <FormikStateObserver fieldAlias={args.alias} />
            <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer' }}>
              Provision Servers
            </Button>
          </Flex>
        )}
      </Formik>
    );
  },
  args: {
    inputtype: 'slider-outline',
    inputLabel: 'Server Capacity Allocation',
    isHinted: true,
    hintText: 'Drag the slider to increase or decrease active server instances.',
  },
};