import type { Meta, StoryObj } from '@storybook/react';
import { Formik, useFormikContext } from 'formik';
import { Flex, Button, Text, Code } from '@radix-ui/themes';
import { OptionSelect } from './OptionSelect';

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
  { optionid: 1, optionvalue: 'kaiju', text: 'Kaiju Class' },
  { optionid: 2, optionvalue: 'mekagodzilla', text: 'MekaGodzilla Class' },
  { optionid: 3, optionvalue: 'zaibatsu', text: 'Zaibatsu Elite' },
];

const meta: Meta<typeof OptionSelect> = {
  title: 'χForm Components/OptionSelect',
  component: OptionSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Single Select component with built-in Formik binding.

### Import
\`\`\`tsx
import { OptionSelect } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'unitClassification',
    width: 12,
    inputLabel: 'Select VectorSigma Classification',
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
type Story = StoryObj<typeof OptionSelect>;


export const Outline: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <OptionSelect {...args} />
    </Formik>
  ),
  args: { inputtype: 'dropdown-outline' },
};

export const Material: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <OptionSelect {...args} />
    </Formik>
  ),
  args: { inputtype: 'dropdown-material' },
};

export const Neumorphic: Story = {
  render: (args) => (
    <div style={{ padding: '32px', backgroundColor: '#e0e5ec', borderRadius: '16px', width: '100%' }}>
      <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
        <OptionSelect {...args} />
      </Formik>
    </div>
  ),
  args: { inputtype: 'dropdown-neumorphic' },
};


/**
 * **With External Link Option:**
 * If an option contains an `optionurl`, clicking it will open that URL in a new tab instead of selecting it.
 */
export const WithLinkOption: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <OptionSelect {...args} />
    </Formik>
  ),
  args: {
    inputtype: 'dropdown-outline',
    inputOptions: [
      ...defaultOptions,
      { optionid: 4, optionvalue: 'link', text: 'View External Logs ↗', optionurl: 'https://github.com/emeraldemperaur/vector-sigma' }
    ]
  },
};

/**
 * **Interactive Form Test:**
 * Validates selection and demonstrates the built-in "Reset" feature (the top italicized option).
 * Look at the Actions tab or Console to see the `onValueChange` mock callback firing!
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      alert(`Unit Assigned! \n\nClass: ${values[args.alias]}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: '' }} 
        validate={(values) => {
          if (!values[args.alias]) return { [args.alias]: 'A classification is required.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit }) => (
          <Flex direction="column" gap="4" style={{ width: '100%' }}>
            <OptionSelect 
              {...args} 
              onValueChange={(val) => console.log('Mock onValueChange fired! New value:', val)}
            />
            <FormikStateObserver fieldAlias={args.alias} />
            <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer' }}>
              Confirm Assignment
            </Button>
          </Flex>
        )}
      </Formik>
    );
  },
  args: {
    inputtype: 'dropdown-material',
    placeholder: 'Clear selection...',
    isHinted: true,
    hintText: 'Select the top placeholder item to reset the Formik state.',
  },
};