import type { Meta, StoryObj } from '@storybook/react';
import { Formik, useFormikContext } from 'formik';
import { Flex, Button, Text, Code } from '@radix-ui/themes';
import { CreditCardInput } from './CreditCardInput';

const FormikStateObserver = ({ fieldAlias }: { fieldAlias: string }) => {
  const { values } = useFormikContext<any>();
  return (
    <Flex direction="column" gap="1" style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--gray-3)', borderRadius: '8px' }}>
      <Text size="2" weight="bold" color="ruby">Live Formik State (Unmasked):</Text>
      <Code variant="ghost">{JSON.stringify(values[fieldAlias] || 'null', null, 2)}</Code>
      <Text size="1" color="gray" style={{ marginTop: 4 }}>
        Note :: IMask visually adds spaces, but Formik stores only the raw string
      </Text>
    </Flex>
  );
};

const meta: Meta<typeof CreditCardInput> = {
  title: 'χForm Components/CreditCardInput',
  component: CreditCardInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
CreditCardInput component with deep Formik integration and material, outline & neumorphic design variants.

### Import
\`\`\`tsx
import { CreditCardInput } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'paymentCard',
    width: 12,
    inputLabel: 'Credit Card Number',
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
type Story = StoryObj<typeof CreditCardInput>;


export const Outline: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <CreditCardInput {...args} />
    </Formik>
  ),
  args: {
    inputvariant: 'input-outline',
  },
};

export const Material: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <CreditCardInput {...args} />
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
        <CreditCardInput {...args} />
      </Formik>
    </div>
  ),
  args: {
    inputvariant: 'input-neumorphic',
  },
};


/**
 * **Amex Masking Test:**
 * American Express cards use a 4-6-5 spacing format instead of the standard 4-4-4-4.
 * Start typing an Amex number (e.g., starting with 34 or 37) to see the icon and mask change dynamically!
 */
export const AmericanExpressTest: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '378211' }} onSubmit={() => {}}>
      <CreditCardInput {...args} />
    </Formik>
  ),
  args: {
    inputvariant: 'input-outline',
    inputLabel: 'Corporate Amex Card',
  },
};

/**
 * **Visa Masking Test:**
 * Demonstrates the standard 16-digit layout with the Visa icon activating automatically.
 */
export const VisaTest: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '41111111' }} onSubmit={() => {}}>
      <CreditCardInput {...args} />
    </Formik>
  ),
  args: {
    inputvariant: 'input-material',
    inputLabel: 'Primary Visa Card',
  },
};

/**
 * **Interactive Form Test:**
 * Type a card number, blur the input to see the touched state, and click submit to test the Formik payload.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      alert(`Secure Payload Ready! \n\nCard Data: ${values[args.alias]}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: '' }} 
        validate={(values) => {
          const errors: any = {};
          if (!values[args.alias] || values[args.alias].length < 15) {
            errors[args.alias] = 'A valid 15 or 16 digit card number is required.';
          }
          return errors;
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit }) => (
          <Flex direction="column" gap="4" style={{ width: '100%' }}>
            <CreditCardInput {...args} />
            
            <FormikStateObserver fieldAlias={args.alias} />
            
            <Button 
              type="button" 
              onClick={() => handleSubmit()} 
              color="ruby" 
              size="3" 
              style={{ marginTop: '16px', cursor: 'pointer' }}
            >
              Process Payment
            </Button>
          </Flex>
        )}
      </Formik>
    );
  },
  args: {
    inputvariant: 'input-outline',
    inputLabel: 'Checkout Payment Method',
    isHinted: true,
    hintText: 'We do not store full card numbers on our servers.',
  },
};