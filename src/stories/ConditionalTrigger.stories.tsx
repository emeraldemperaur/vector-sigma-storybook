import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { Flex, Text, TextField } from '@radix-ui/themes';
import { ConditionalTrigger } from './ConditionalTrigger';
import { Column } from '../components/layouts/column/column'; 

const MockRevealedChild = () => (
  <Column span={12}> 
    <Flex direction="column" gap="2" style={{ width: '100%', padding: '12px', backgroundColor: 'var(--gray-3)', borderRadius: '8px' }}>
      <Text size="2" weight="bold" color="ruby">Secured Config Unlocked</Text>
      <TextField.Root placeholder="Enter override code..." />
    </Flex>
  </Column>
);

const meta: Meta<typeof ConditionalTrigger> = {
  title: 'χForm Components/ConditionalTrigger',
  component: ConditionalTrigger,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
ConditionalTrigger component with deep Formik integration and material, outline & neumorphic design variants.

### Import
\`\`\`tsx
import { ConditionalTrigger } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    width: 12,
    children: <MockRevealedChild />,
  },
  decorators: [
    (Story) => (
      <Flex justify="center" align="start" style={{ padding: '2rem', width: '100%', maxWidth: '500px' }}>
        <Story />
      </Flex>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ConditionalTrigger>;


/**
 * Standard Switch Toggle (Outline Design).
 * Clicking the switch sets the Formik state to `true`, matching the default `triggerValue`.
 */
export const ToggleOutline: Story = {
  render: (args) => (
    <Formik<Record<string, any>> initialValues={{ [args.alias]: false }} onSubmit={() => {}}>
      <ConditionalTrigger {...args} />
    </Formik>
  ),
  args: {
    inputtype: 'conditionaltoggle-outline',
    alias: 'enableOverride',
    inputLabel: 'Enable System Override',
    triggerValue: true, // Reveals children when Formik state === true
  },
};


/**
 * Checkbox Trigger (Material Design).
 * Features a distinct left-border accent and deeper shadows when activated.
 */
export const CheckboxMaterial: Story = {
  render: (args) => (
    <Formik<Record<string, any>> initialValues={{ [args.alias]: false }} onSubmit={() => {}}>
      <ConditionalTrigger {...args} />
    </Formik>
  ),
  args: {
    inputtype: 'conditionalcheckbox-material',
    alias: 'agreeToTerms',
    inputLabel: 'Acknowledge Risk Protocol',
    triggerValue: true,
  },
};


/**
 * Select Dropdown Trigger (Neumorphic Design).
 * The children are only revealed when the user explicitly selects the "Admin" option from the dropdown.
 */
export const SelectNeumorphic: Story = {
  render: (args) => (
    <div style={{ padding: '32px', backgroundColor: '#e0e5ec', borderRadius: '16px', width: '100%' }}>
      <Formik<Record<string, any>> initialValues={{ [args.alias]: 'user' }} onSubmit={() => {}}>
        <ConditionalTrigger {...args} />
      </Formik>
    </div>
  ),
  args: {
    inputtype: 'conditionalselect-neumorphic',
    alias: 'accessLevel',
    inputLabel: 'Select Access Level',
    triggerValue: 'admin', 
    placeholder: 'Choose a role...',
    inputOptions: [
      { optionid: 1, optionvalue: 'guest', text: 'Guest Access' },
      { optionid: 2, optionvalue: 'user', text: 'Standard User' },
      { optionid: 3, optionvalue: 'admin', text: 'Admin Clearance' },
    ],
  },
};


/**
 * Demonstrates the component booting up already opened because the initial Formik data matches the trigger value.
 */
export const PreRevealedState: Story = {
  render: (args) => (
    <Formik<Record<string, any>> 
      // The initial state matches the triggerValue, so the child is visible on mount!
      initialValues={{ [args.alias]: true }} 
      onSubmit={() => {}}
    >
      <ConditionalTrigger {...args} />
    </Formik>
  ),
  args: {
    inputtype: 'conditionaltoggle-material',
    alias: 'alwaysOn',
    inputLabel: 'Force Active Connection',
    triggerValue: true,
  },
};


/**
 * Demonstrates the component with a contextual tooltip hint and a forced Formik error state.
 */
export const HintAndErrorState: Story = {
  render: (args) => (
    <Formik<Record<string, any>> 
      initialValues={{ [args.alias]: false }} 
      initialTouched={{ [args.alias]: true }}
      initialErrors={{ [args.alias]: 'Authorization required.' }}
      onSubmit={() => {}}
    >
      <ConditionalTrigger {...args} />
    </Formik>
  ),
  args: {
    inputtype: 'conditionalcheckbox-outline',
    alias: 'authCheck',
    inputLabel: 'Require Manual Authorization',
    triggerValue: true,
    isHinted: true,
    hintText: 'Enabling this will require a secondary password input.',
    errorText: 'You must authorize to proceed.',
  },
};