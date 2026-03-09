import type { Meta, StoryObj } from '@storybook/react';
import { Formik, useFormikContext } from 'formik';
import { Flex, Button, Text, Code } from '@radix-ui/themes';
import { StockInput } from './stockInput';

const FormikStateObserver = ({ fieldAlias }: { fieldAlias: string }) => {
  const { values } = useFormikContext<any>();
  return (
    <Flex direction="column" gap="1" style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--gray-3)', borderRadius: '8px' }}>
      <Text size="2" weight="bold" color="ruby">Live Formik State (Unmasked):</Text>
      <Code variant="ghost">{JSON.stringify({ [fieldAlias]: values[fieldAlias] || '' }, null, 2)}</Code>
    </Flex>
  );
};

const meta: Meta<typeof StockInput> = {
  title: 'χForm Components/StockInput',
  component: StockInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
StockInput component with built-in Formik binding.

### Import
\`\`\`tsx
import { StockInput } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'stockTargetPrice',
    width: 12,
    inputLabel: 'Target Share Price',
    defaultvalue: 'TSLA',
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
type Story = StoryObj<typeof StockInput>;

export const Outline: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <StockInput {...args} />
    </Formik>
  ),
  args: { inputvariant: 'input-outline' },
};

export const Material: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <StockInput {...args} />
    </Formik>
  ),
  args: { inputvariant: 'input-material' },
};

/**
 * **Without Ticker (Fallback Icon):**
 * If no `defaultvalue` string is provided, the component falls back to rendering a generic chart icon.
 */
export const WithoutTicker: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <StockInput {...args} />
    </Formik>
  ),
  args: { 
    inputvariant: 'input-outline',
    defaultvalue: '', 
    inputLabel: 'Generic Asset Price',
  },
};

export const InteractiveFormTest: Story = {
  render: (args) => {
    return (
      <Formik 
        initialValues={{ [args.alias]: '' }} 
        validate={(values) => {
          if (!values[args.alias] || Number(values[args.alias]) <= 0) {
            return { [args.alias]: 'Price must be greater than 0.' };
          }
          return {};
        }}
        onSubmit={(values) => alert(`Limit Order Placed! \n\nTarget Price: $${values[args.alias]}`)}
      >
        {({ handleSubmit }) => (
          <Flex direction="column" gap="4" style={{ width: '100%' }}>
            <StockInput {...args} />
            <FormikStateObserver fieldAlias={args.alias} />
            <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer' }}>
              Place Limit Order
            </Button>
          </Flex>
        )}
      </Formik>
    );
  },
  args: {
    inputvariant: 'input-outline',
    inputLabel: 'AAPL Limit Order',
    defaultvalue: 'AAPL',
    isHinted: true,
    hintText: 'Enter the maximum price you are willing to pay.',
  },
};