import type { Meta, StoryObj } from '@storybook/react';
import { Formik, useFormikContext } from 'formik';
import { Flex, Button, Text, Code } from '@radix-ui/themes';
import { CurrencyInput } from './CurrencyInput';

const FormikStateObserver = ({ fieldAlias }: { fieldAlias: string }) => {
  const { values } = useFormikContext<any>();
  const currencyAlias = `${fieldAlias}Currency`;
  
  return (
    <Flex direction="column" gap="1" style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--gray-3)', borderRadius: '8px' }}>
      <Text size="2" weight="bold" color="ruby">Live Formik State:</Text>
      <Code variant="ghost">
        {JSON.stringify({
          [fieldAlias]: values[fieldAlias] || '',
          [currencyAlias]: values[currencyAlias] || 'USD'
        }, null, 2)}
      </Code>
      <Text size="1" color="gray" style={{ marginTop: 4 }}>
        Notice how this component updates both the amount and the currency code simultaneously!
      </Text>
    </Flex>
  );
};

const meta: Meta<typeof CurrencyInput> = {
  title: 'χForm Components/CurrencyInput',
  component: CurrencyInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
CurrencyInput component with deep Formik integration and material, outline & neumorphic design variants.

### Import
\`\`\`tsx
import { CurrencyInput } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'productPrice',
    width: 12,
    inputLabel: 'List Price',
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
type Story = StoryObj<typeof CurrencyInput>;


export const Outline: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <CurrencyInput {...args} />
    </Formik>
  ),
  args: {
    inputvariant: 'input-outline',
  },
};

export const Material: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <CurrencyInput {...args} />
    </Formik>
  ),
  args: {
    inputvariant: 'input-material',
  },
};

export const Neumorphic: Story = {
  render: (args) => (
    <div style={{ padding: '32px', backgroundColor: '#e0e5ec', borderRadius: '16px', width: '100%' }}>
      <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
        <CurrencyInput {...args} />
      </Formik>
    </div>
  ),
  args: {
    inputvariant: 'input-neumorphic',
  },
};


/**
 * **Fixed Currency Mode:**
 * By passing a specific currency code to `inputtype` instead of "currency", 
 * the dropdown becomes read-only and locks the user into that specific currency.
 */
export const FixedCurrency: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <CurrencyInput {...args} />
    </Formik>
  ),
  args: {
    inputvariant: 'input-outline',
    inputLabel: 'European Tariff (Locked)',
    inputtype: 'EUR',
  },
};

/**
 * **Pre-Filled State:**
 * Demonstrates how the `react-imask` perfectly formats existing numeric data passed down from Formik.
 */
export const PreFilledState: Story = {
  render: (args) => (
    <Formik 
      initialValues={{ [args.alias]: '1450000.50', [`${args.alias}Currency`]: 'JPY' }} 
      onSubmit={() => {}}
    >
      <CurrencyInput {...args} />
    </Formik>
  ),
  args: {
    inputvariant: 'input-material',
    inputLabel: 'Target Revenue',
    inputtype: 'currency',
  },
};


/**
 * **Interactive Form Test:**
 * Change the currency in the dropdown, type an amount, and click submit. 
 * Watch how it validates and structures the payload.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      alert(`Financial Payload Ready! \n\nAmount: ${values[args.alias]}\nCurrency: ${values[`${args.alias}Currency`]}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: '', [`${args.alias}Currency`]: 'USD' }} 
        validate={(values) => {
          const errors: any = {};
          if (!values[args.alias] || Number(values[args.alias]) <= 0) {
            errors[args.alias] = 'Price must be greater than zero.';
          }
          return errors;
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit }) => (
          <Flex direction="column" gap="4" style={{ width: '100%' }}>
            <CurrencyInput {...args} />
            
            <FormikStateObserver fieldAlias={args.alias} />
            
            <Button 
              type="button" 
              onClick={() => handleSubmit()} 
              color="ruby" 
              size="3" 
              style={{ marginTop: '16px', cursor: 'pointer' }}
            >
              Authorize Transaction
            </Button>
          </Flex>
        )}
      </Formik>
    );
  },
  args: {
    inputvariant: 'input-outline',
    inputLabel: 'Transfer Amount',
    isHinted: true,
    hintText: 'Enter the exact settlement amount in your local currency.',
  },
};