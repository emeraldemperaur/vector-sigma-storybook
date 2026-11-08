import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { MultipleSelect } from './MultipleSelect';
import type { InputOption } from '../utils/vinci';
import { Row } from './Row';
import { Column } from './Column';
import { Button, Flex, Text } from '@radix-ui/themes';


const userRoles: InputOption[] = [
  { optionid: 1, optionvalue: 'admin', text: 'Global Administrator' },
  { optionid: 2, optionvalue: 'billing', text: 'Billing & Procurement' },
  { optionid: 3, optionvalue: 'developer', text: 'Developer (Read/Write)' },
  { optionid: 4, optionvalue: 'viewer', text: 'Auditor (Read-Only)' },
];

const cloudRegions: InputOption[] = [
  { optionid: 10, optionvalue: 'us-east-1', text: 'US East (N. Virginia)' },
  { optionid: 11, optionvalue: 'us-west-2', text: 'US West (Oregon)' },
  { optionid: 12, optionvalue: 'eu-central-1', text: 'Europe (Frankfurt)' },
  { optionid: 13, optionvalue: 'ap-northeast-1', text: 'Asia Pacific (Tokyo)' },
  { optionid: 14, optionvalue: 'ap-southeast-2', text: 'Asia Pacific (Sydney)' },
  { optionid: 15, optionvalue: 'sa-east-1', text: 'South America (São Paulo)' },
  { optionid: 16, optionvalue: 'me-south-1', text: 'Middle East (Bahrain)' },
];

const notificationChannels: InputOption[] = [
  { optionid: 20, optionvalue: 'email', text: 'Email Digest' },
  { optionid: 21, optionvalue: 'slack', text: 'Slack Webhook' },
  { optionid: 22, optionvalue: 'pagerduty', text: 'PagerDuty Incident' },
  { optionid: 23, optionvalue: 'sms', text: 'SMS Text Message' },
];

const optionsMap = {
  'User Roles (4 Items)': userRoles,
  'Cloud Regions (7 Items)': cloudRegions,
  'Notification Channels (4 Items)': notificationChannels,
};


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
  title: 'χForm Components/MultipleSelect',
  component: MultipleSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      inlineStories: false,
      story: {
        iframeHeight: '380px',
      },
      description: {
        component: `
An advanced, highly-customizable multi-select component based on Radix UI's \`Popover\` and \`Checkbox\` primitives. Features real-time search filtering, quick "Select All / Clear All" bulk actions, intelligent portal rendering, enterprise-grade aesthetics, and strict Formik array binding.

**Note:** This component must be rendered inside a \`<Formik>\` context. It explicitly manages an array of strings/numbers in the Formik state payload.

### Import
\`\`\`tsx
import { MultipleSelect } from '@emeraldemperaur/vector-sigma';
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
          if (componentName.includes('MultipleSelect') || componentName.includes('Range')) initialVal = '[]';
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
    inputvariant: {
      control: 'radio',
      options: ['multiselect-outline', 'multiselect-material', 'multiselect-neumorphic'],
      description: 'The aesthetic design language of the MultipleSelect trigger and popover menu.',
      table: { defaultValue: { summary: "'multiselect-outline'" } },
    },
    size: {
      control: 'radio',
      options: ['1', '2', '3'],
      description: 'Physical size scale for the MultipleSelect trigger.',
      table: { defaultValue: { summary: "'2'" } },
    },
    alias: {
      control: 'text',
      description: 'The unique identifier bridging the input field to the Formik state array.',
    },
    inputLabel: {
      control: 'text',
      description: 'The primary semantic label rendered above the MultipleSelect field.',
    },
    width: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Defines the responsive grid column span for the component (1-12 based on the parent grid).',
      table: { defaultValue: { summary: '12' } },
    },
    newRow: {
      control: 'boolean',
      description: 'Forces the component to break into a new Flex/Grid row within the Form layout.',
      table: { defaultValue: { summary: 'false' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text utilized when no items are selected.',
      table: { defaultValue: { summary: "'Select options...'" } },
    },
    inputOptions: {
      control: 'select',
      options: Object.keys(optionsMap),
      mapping: optionsMap,
      description: 'The array of selectable options rendered within the menu.',
    },
    enableSearch: {
      control: 'boolean',
      description: 'Enables a real-time search filter input at the top of the popover menu for large option sets.',
      table: { defaultValue: { summary: 'false' } },
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the search filter input when `enableSearch` is true.',
      table: { defaultValue: { summary: "'Search options...'" } },
    },
    readOnly: {
      control: 'boolean',
      description: 'Disables interaction across the trigger and menu items, mutating visual state to reflect read-only mode.',
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
    alias: 'assignedUserRoles',
    inputLabel: 'Assigned Workspace Roles',
    inputOptions: userRoles,
    width: 12,
  },
  decorators: [
    (Story, context) => {
      const isErrorState = Boolean(context.args.errorText);
      const alias = context.args.alias || 'multiSelectField';
      const initialVal = context.parameters?.formik?.initialValues?.[alias] ?? [];

      return (
        <Row>
        <Formik
          key={`formik-sync-${context.args.errorText || 'clean'}`}
          initialValues={{ [alias]: initialVal }}
          initialErrors={isErrorState ? { [alias]: context.args.errorText as string } : {}}
          initialTouched={isErrorState ? { [alias]: true } : {}}
          onSubmit={(values) => console.log('MultipleSelect Submit Payload:', values)}
        >
            <Story />
        </Formik>
        </Row>
      );
    },
  ],
} satisfies Meta<typeof MultipleSelect>;

export default meta;
type Story = StoryObj<typeof MultipleSelect>;

export const Outline: Story = {
  render: (args) => <MultipleSelect {...args} />,
  args: {
    inputvariant: 'multiselect-outline',
  },
};

export const Material: Story = {
  render: (args) => <MultipleSelect {...args} />,
  args: {
    inputvariant: 'multiselect-material',
  },
};

export const Neumorphic: Story = {
  render: (args) => <MultipleSelect {...args} />,
  args: {
    inputvariant: 'multiselect-neumorphic',
  },
  decorators: [
    (Story) => (
      
        <Story />
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Neumorphic variant utilizes soft-UI extruded drop-shadows. The popover menu dynamically maps its background and shadows to match the trigger. A tinted container background (e.g., `#e0e5ec`) is strictly required.',
      },
    },
  },
};

/**
 * **Real-Time Search & Bulk Actions**
 * When an option array contains more than 3 items, the component automatically injects "Select All" and "Clear All" bulk actions into the popover. Enabling `enableSearch` layers a fast, client-side filtering input on top of the dataset.
 */
export const SearchableBulkMode: Story = {
  render: (args) => <MultipleSelect {...args} />,
  args: {
    inputvariant: 'multiselect-outline',
    enableSearch: true,
    searchPlaceholder: 'Search AWS regions...',
    inputLabel: 'Global Fleet Targets',
    inputOptions: cloudRegions,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <MultipleSelect {...args} size="1" alias="ms1" inputLabel="Size 1 (Compact)" />
      <MultipleSelect {...args} size="2" alias="ms2" inputLabel="Size 2 (Default)" />
      <MultipleSelect {...args} size="3" alias="ms3" inputLabel="Size 3 (Large)" />
    </>
  ),
  args: {
    inputvariant: 'multiselect-outline',
  },
};

export const WithHintAndTooltip: Story = {
  render: (args) => <MultipleSelect {...args} />,
  args: {
    inputvariant: 'multiselect-outline',
    isHinted: true,
    hintText: 'Users inherit compound permissions from all selected security groups simultaneously.',
    hintUrl: 'https://docs.vectorsigma.io/iam/roles',
  },
};

export const CustomTypography: Story = {
  render: (args) => <MultipleSelect {...args} />,
  args: {
    inputvariant: 'multiselect-outline',
    typography: typographyPresets['Burgundy Executive'],
    enableSearch: true,
    inputOptions: notificationChannels,
    inputLabel: 'Alerting Subscriptions',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates hijacking internal Radix themes via the `typography` prop using the enterprise Burgundy Executive preset. The popover canvas, search box, list items, and active checkbox fills seamlessly map to the custom palette.',
      },
    },
  },
};

export const ReadOnlyState: Story = {
  render: (args) => (
    <Formik
      initialValues={{ [args.alias]: ['admin', 'developer'] }}
      onSubmit={(values) => console.log(values)}
    >
        <MultipleSelect {...args} />
    </Formik>
  ),
  args: {
    alias: 'lockedRoles',
    inputvariant: 'multiselect-material',
    readOnly: true,
    inputLabel: 'Inherited Workspace Roles (Read Only)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates visually muting the field and blocking popover interactions when `readOnly` is enabled. Pre-populated array states are cleanly formatted into a comma-separated list on the trigger.',
      },
    },
  },
};

export const WithValidation: Story = {
  render: (args) => <MultipleSelect {...args} />,
  args: {
    inputvariant: 'multiselect-material',
    errorText: 'At least one role assignment is required to provision this account.',
  },
};


/**
 * **Interactive Form Test:**
 * Select multiple items, test the "Select All" bulk action, observe the array state mutations, and test the submission hook.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      alert(`Form Submitted! \n\nPayload: ${JSON.stringify(values, null, 2)}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: [] }} 
        validate={(values) => {
          if (!values[args.alias] || values[args.alias].length === 0) return { [args.alias]: 'Please assign at least one role.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4" style={{ width: '100%', maxWidth: '450px' }}>
              <MultipleSelect {...args} />
              
              <div style={{ backgroundColor: 'var(--gray-3)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text weight="bold" style={{ color: 'var(--ruby-9)' }}>
                  Live Formik State:
                </Text>
                <pre style={{ margin: 0, fontFamily: 'var(--code-font-family, monospace)', color: 'var(--gray-12)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
              
              <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer', width: '100%' }}>
                Update Permissions
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'userRoles',
    inputLabel: 'Assign IAM Roles',
    inputvariant: 'multiselect-material',
    enableSearch: true,
    inputOptions: [
      { optionid: 1, optionvalue: 'admin', text: 'Global Administrator' },
      { optionid: 2, optionvalue: 'billing', text: 'Billing & Procurement' },
      { optionid: 3, optionvalue: 'developer', text: 'Developer (Read/Write)' },
      { optionid: 4, optionvalue: 'viewer', text: 'Auditor (Read-Only)' },
    ]
  },
};