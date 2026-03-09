import type { Meta, StoryObj } from '@storybook/react';
import { Formik, useFormikContext } from 'formik';
import { Flex, Button, Text, Code } from '@radix-ui/themes';
import { CountrySelect } from './CountrySelect';
import { Column } from '../components/layouts/column/column';
import { Row } from '../components/layouts/row/row';

const FormikStateObserver = ({ fieldAlias }: { fieldAlias: string }) => {
  const { values } = useFormikContext<any>();
  return (
    <Flex direction="column" gap="1" style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--gray-3)', borderRadius: '8px' }}>
      <Text size="2" weight="bold" color="ruby">Live Formik State:</Text>
      <Code variant="ghost">{JSON.stringify(values[fieldAlias] || 'null', null, 2)}</Code>
    </Flex>
  );
};

const meta: Meta<typeof CountrySelect> = {
  title: 'χForm Components/CountrySelect',
  component: CountrySelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
CountrySelect component with deep Formik integration and material, outline & neumorphic design variants.

### Import
\`\`\`tsx
import { CountrySelect } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'citizenshipCountry',
    width: 12,
    inputLabel: 'Country of Citizenship',
  },
  decorators: [
    (Story) => (
       <Row>
       <Column span={12}>
       <Flex justify="center" align="start" style={{ padding: '2rem', width: '100%', maxWidth: '400px', minHeight: '350px' }}>
       <Story />
       </Flex>
       </Column>
      </Row>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CountrySelect>;


export const Outline: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <CountrySelect {...args} />
    </Formik>
  ),
  args: {
    inputtype: 'countryselect-outline',
  },
};

export const Material: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
      <CountrySelect {...args} />
    </Formik>
  ),
  args: {
    inputtype: 'countryselect-material',
  },
};

/**
 * **Neumorphic Setup:** * Requires a parent container with a defined background color to accurately calculate shadow variants.
 */
export const Neumorphic: Story = {
  render: (args) => (
    <div style={{ padding: '32px', backgroundColor: '#e0e5ec', borderRadius: '16px', width: '100%' }}>
      <Formik initialValues={{ [args.alias]: '' }} onSubmit={() => {}}>
        <CountrySelect {...args} />
      </Formik>
    </div>
  ),
  args: {
    inputtype: 'countryselect-neumorphic',
  },
};


/**
 * Demonstrates the `enableSearch` and `multiselect` props working together.
 */
export const MultiSelectWithSearch: Story = {
  render: (args) => (
    <Formik<Record<string, any>> initialValues={{ [args.alias]: [] }} onSubmit={() => {}}>
      <CountrySelect {...args} />
    </Formik>
  ),
  args: {
    inputtype: 'countryselect-outline',
    inputLabel: 'Select Operating Regions',
    multiselect: true,
    enableSearch: true,
    placeholder: 'Search & select regions...',
  },
};

/**
 * Demonstrates pre-filling the dropdown via Formik's initial values.
 */
export const PreSelectedValue: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: 'CA' }} onSubmit={() => {}}>
      <CountrySelect {...args} />
    </Formik>
  ),
  args: {
    inputtype: 'countryselect-material',
    inputLabel: 'Primary Deployment Node',
  },
};


/**
 * **Interactive Interaction Test:**
 * Use this story to test how the component interacts with a parent form. 
 * Clicking the Submit button triggers a mock `onSubmit` function, logging the payload.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    // Mock submit handler
    const handleMockSubmit = (values: any) => {
      alert(`Payload Ready! \n\n${JSON.stringify(values, null, 2)}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik initialValues={{ [args.alias]: '' }} onSubmit={handleMockSubmit}>
        {({ handleSubmit }) => (
          <Flex direction="column" gap="4" style={{ width: '100%' }}>
            <CountrySelect {...args} />
            
            {/* Live State Observer */}
            <FormikStateObserver fieldAlias={args.alias} />
            
            {/* Mock Submit Button */}
            <Button 
              type="button" 
              onClick={() => handleSubmit()} 
              color="ruby" 
              size="3" 
              style={{ marginTop: '16px', cursor: 'pointer' }}
            >
              Test Form Submission
            </Button>
          </Flex>
        )}
      </Formik>
    );
  },
  args: {
    inputtype: 'countryselect-outline',
    inputLabel: 'Select Target Vector',
    enableSearch: true,
  },
};