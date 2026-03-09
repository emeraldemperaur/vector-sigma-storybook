import type { Meta, StoryObj } from '@storybook/react';
import { Formik, useFormikContext } from 'formik';
import { Flex, Button, Text, Code } from '@radix-ui/themes';
import { Dropdown } from './dropdown';

const FormikStateObserver = ({ fieldAlias }: { fieldAlias: string }) => {
  const { values } = useFormikContext<any>();
  return (
    <Flex direction="column" gap="1" style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--gray-3)', borderRadius: '8px' }}>
      <Text size="2" weight="bold" color="ruby">Live Formik State:</Text>
      <Code variant="ghost">{JSON.stringify({ [fieldAlias]: values[fieldAlias] || '' }, null, 2)}</Code>
    </Flex>
  );
};

const defaultOptions = [
  { optionid: 1, optionvalue: 'sedan', text: 'Executive Sedan' },
  { optionid: 2, optionvalue: 'suv', text: 'Armored SUV' },
  { optionid: 3, optionvalue: 'coupe', text: 'Interceptor Coupe' },
];

const meta: Meta<typeof Dropdown> = {
  title: 'χForm Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Single select Dropdown component with built-in Formik binding.

### Import
\`\`\`tsx
import { Dropdown } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'vehicleSelection',
    width: 12,
    inputLabel: 'Select VectorSigma Fleet Vehicle',
    inputOptions: defaultOptions,
  },
  decorators: [
    (Story) => (
      <Flex justify="center" align="start" style={{ padding: '2rem', width: '100%', maxWidth: '400px', minHeight: '350px' }}>
        <Story />
      </Flex>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;


export const Outline: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <Dropdown {...args} />
    </Formik>
  ),
  args: { inputtype: 'dropdown-outline' },
};

export const Material: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <Dropdown {...args} />
    </Formik>
  ),
  args: { inputtype: 'dropdown-material' },
};

export const Neumorphic: Story = {
  render: (args) => (
    <div style={{ padding: '32px', backgroundColor: '#e0e5ec', borderRadius: '16px', width: '100%' }}>
      <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
        <Dropdown {...args} />
      </Formik>
    </div>
  ),
  args: { inputtype: 'dropdown-neumorphic' },
};


/**
 * **External Links inside Dropdown:**
 * If an `inputoption` includes an `optionurl`, clicking that item will open the link in a new tab 
 * rather than just selecting a value.
 */
export const WithExternalLinks: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <Dropdown {...args} />
    </Formik>
  ),
  args: {
    inputtype: 'dropdown-outline',
    inputLabel: 'Documentation References',
    inputOptions: [
      { optionid: 1, optionvalue: 'doc1', text: 'Standard Protocol' },
      { optionid: 2, optionvalue: 'link', text: 'View External Spec Sheet ↗', optionurl: 'https://github.com/emeraldemperaur/vector-sigma' },
    ],
  },
};

/**
 * **Pre-Filled State:**
 * Demonstrates the dropdown initializing with a value already selected from Formik state.
 */
export const PreFilledState: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: 'suv' }} onSubmit={() => {}}>
      <Dropdown {...args} />
    </Formik>
  ),
  args: {
    inputtype: 'dropdown-material',
    inputLabel: 'Assigned Vehicle',
  },
};


/**
 * **Interactive Form Test & Reset Logic:**
 * This story demonstrates the `onValueChange` callback intercept, validation, and the built-in 
 * "Reset" functionality (the italicized placeholder item at the top of the list).
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      alert(`Selection Captured! \n\nValue: ${values[args.alias]}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: '' }} 
        validate={(values) => {
          if (!values[args.alias]) return { [args.alias]: 'You must select a fleet vehicle.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit }) => (
          <Flex direction="column" gap="4" style={{ width: '100%' }}>
            <Dropdown 
              {...args} 
              onValueChange={(val) => console.log('External onValueChange Callback fired:', val)}
            />
            
            <FormikStateObserver fieldAlias={args.alias} />
            
            <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer' }}>
              Confirm Selection
            </Button>
          </Flex>
        )}
      </Formik>
    );
  },
  args: {
    inputtype: 'dropdown-outline',
    inputLabel: 'Select Target Vehicle',
    placeholder: 'Clear selection...',
    isHinted: true,
    hintText: 'Selecting the placeholder item at the top will clear your current selection.',
  },
};