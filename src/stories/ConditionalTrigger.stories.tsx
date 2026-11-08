import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { Flex, Text, TextField, Box, Badge, Button } from '@radix-ui/themes';
import { ConditionalTrigger } from './ConditionalTrigger';
import { Column } from './Column';
import { Icon } from './Icons';
import type { InputOption } from '../utils/vinci';
import { Row } from './Row';
import { Input } from './Input';


const paymentMethods: InputOption[] = [
  { optionid: 1, optionvalue: 'credit_card', text: 'Credit Card (Stripe)' },
  { optionid: 2, optionvalue: 'wire_transfer', text: 'Corporate Wire Transfer (SWIFT / ACH)' },
  { optionid: 3, optionvalue: 'crypto_escrow', text: 'Cryptographic Escrow (USDC)' },
];

const deploymentTiers: InputOption[] = [
  { optionid: 10, optionvalue: 'starter', text: 'Starter Cloud (Shared Multi-Tenant)' },
  { optionid: 11, optionvalue: 'professional', text: 'Professional (Multi-Region HA)' },
  { optionid: 12, optionvalue: 'enterprise_dedicated', text: 'Enterprise Dedicated (Custom VPC Peering)' },
  { optionid: 13, optionvalue: 'airgap', text: 'Sovereign Air-Gapped Enclave' },
];

const recoveryStrategies: InputOption[] = [
  { optionid: 20, optionvalue: 'active_passive', text: 'Active-Passive (Cold Standby)' },
  { optionid: 21, optionvalue: 'pilot_light', text: 'Pilot Light (Warm Core Services)' },
  { optionid: 22, optionvalue: 'active_active', text: 'Active-Active Multi-Region Mesh' },
];

const identityVerifications: InputOption[] = [
  { optionid: 30, optionvalue: 'standard_email', text: 'Email Magic Link Verification' },
  { optionid: 31, optionvalue: 'hardware_fido2', text: 'Hardware Security Key (FIDO2 / WebAuthn)' },
  { optionid: 32, optionvalue: 'saml_sso', text: 'Corporate Identity Provider (SAML 2.0 / Okta)' },
];

const entityClassifications: InputOption[] = [
  { optionid: 40, optionvalue: 'commercial', text: 'Standard Commercial Business' },
  { optionid: 41, optionvalue: 'defense_contractor', text: 'ITAR / Defense Contractor' },
  { optionid: 42, optionvalue: 'financial_institution', text: 'Tier 1 Financial Institution (FINRA / SOC2)' },
];

const optionsMap = {
  'Payment Methods (3 Items)': paymentMethods,
  'Deployment Tiers (4 Items)': deploymentTiers,
  'Recovery Strategies (3 Items)': recoveryStrategies,
  'Identity Verifications (3 Items)': identityVerifications,
  'Entity Classifications (3 Items)': entityClassifications,
};

const meta = {
  title: 'χForm Components/ConditionalTrigger',
  component: ConditionalTrigger,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      inlineStories: false,
      story: {
        iframeHeight: '440px',
      },
      description: {
        component: `
Orchestrates conditional visibility of child form inputs based on a driving trigger value. 
Supports **Toggle Switch**, **Checkbox**, and **Select Dropdown** trigger mechanisms across **Outline**, **Material**, and **Neumorphic** enterprise aesthetics.

**State Hygiene (\`fieldsToClearOnClose\`):**
When the trigger closes, any populated Formik child fields specified in \`fieldsToClearOnClose\` are immediately purged to prevent stale payload submissions.

### Import
\`\`\`tsx
import { ConditionalTrigger, Column } from '@emeraldemperaur/vector-sigma';
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
    inputtype: {
      control: 'select',
      options: [
        'conditionaltoggle-outline',
        'conditionaltoggle-material',
        'conditionaltoggle-neumorphic',
        'conditionalcheckbox-outline',
        'conditionalcheckbox-material',
        'conditionalcheckbox-neumorphic',
        'conditionalselect-outline',
        'conditionalselect-material',
        'conditionalselect-neumorphic',
      ],
      description: 'The visual aesthetic and interactive mechanism of the trigger control.',
      table: { defaultValue: { summary: "'conditionaltoggle-outline'" } },
    },
    alias: {
      control: 'text',
      description: 'The unique Formik state key driving the trigger condition.',
    },
    inputLabel: {
      control: 'text',
      description: 'The semantic label displayed alongside the trigger control.',
    },
    triggerValue: {
      control: 'text',
      description: 'The target threshold value that reveals children (boolean `true` or matching select value).',
      table: { defaultValue: { summary: 'true' } },
    },
    fieldsToClearOnClose: {
      control: 'object',
      description: 'Array of Formik child field aliases to automatically purge when the drawer closes.',
    },
    width: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Responsive column span allocation (1-12).',
      table: { defaultValue: { summary: '12' } },
    },
    newRow: {
      control: 'boolean',
      description: 'Forces the trigger onto a new row.',
      table: { defaultValue: { summary: 'false' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder string for Select trigger variations.',
    },
    readOnly: {
      control: 'boolean',
      description: 'Disables user interactions and applies read-only styling.',
      table: { defaultValue: { summary: 'false' } },
    },
    isHinted: {
      control: 'boolean',
      description: 'Displays a documentation tooltip icon adjacent to the label.',
      table: { defaultValue: { summary: 'false' } },
    },
    hintText: {
      control: 'text',
      description: 'Contextual explanation displayed in the hint tooltip.',
    },
    hintUrl: {
      control: 'text',
      description: 'Documentation reference URL bound to the hint icon.',
    },
    inputOptions: {
      control: 'select',
      options: Object.keys(optionsMap),
      mapping: optionsMap,
      description: 'Mapped option datasets for Select trigger variations.',
    },
    errorText: {
      control: 'text',
      description: 'Explicit error message overriding Formik validation.',
    },
    children: {
      control: false,
      description: 'Nested child form inputs revealed when condition is met.',
    },
  },
  args: {
    width: 12,
  },
  decorators: [
    (Story, context) => {
      const isErrorState = Boolean(context.args.errorText);
      const customInitialValues = context.parameters?.formik?.initialValues || {};
      const alias = context.args.alias || 'triggerAlias';

      const defaultTriggerVal =
        customInitialValues[alias] !== undefined
          ? customInitialValues[alias]
          : context.args.inputtype?.includes('select')
            ? ''
            : false;

      return (
          <Row>
          <Formik
            key={`formik-sync-${context.args.errorText || 'clean'}`}
            initialValues={{
              [alias]: defaultTriggerVal,
              ...customInitialValues,
            }}
            initialErrors={isErrorState ? { [alias]: context.args.errorText as string } : {}}
            initialTouched={isErrorState ? { [alias]: true } : {}}
            onSubmit={(values) => console.log('ConditionalTrigger Payload:', values)}
          >
              <Story />
          </Formik>
          </Row>
      );
    },
  ],
} satisfies Meta<typeof ConditionalTrigger>;

export default meta;
type Story = StoryObj<typeof ConditionalTrigger>;

/**
 * **Use Case 1: Custom Domain & Routing Configuration (Toggle - Outline)**
 * Common SaaS networking workflow. Toggling reveals production CNAME targets,
 * custom hostname inputs, and SSL enforcement options.
 */
export const UseCase1: Story = {
  render: (args) => (
    <ConditionalTrigger {...args}>
      <Column span={8}>
        <Flex direction="column" gap="1">
          <Text size="2" weight="bold" color="gray" as="label">
            Canonical Domain Hostname
          </Text>
          <TextField.Root name="domainHostname" placeholder="api.company.com" defaultValue="api.company.com" />
          <Text size="1" color="gray">Must be configured as an ALIAS or CNAME in your DNS registrar.</Text>
        </Flex>
      </Column>

      <Column span={4}>
        <Flex direction="column" gap="1">
          <Text size="2" weight="bold" color="gray" as="label">
            TLS Encryption Mode
          </Text>
          <TextField.Root name="tlsMode" placeholder="TLS 1.3 Strict" defaultValue="TLS 1.3 Strict" readOnly />
        </Flex>
      </Column>

      <Column span={12} newLine>
        <Box style={{ padding: '12px 16px', backgroundColor: 'var(--gray-3)', borderRadius: '6px', border: '1px solid var(--gray-5)' }}>
          <Flex align="center" justify="between">
            <Flex align="center" gap="2">
              <Icon name="tokens" color="var(--accent-9)" />
              <Text size="1" weight="medium" style={{ fontFamily: 'monospace' }}>CNAME: edge.vectorsigma.routing.net</Text>
            </Flex>
            <Badge color="green" variant="soft">DNS Ready</Badge>
          </Flex>
        </Box>
      </Column>
    </ConditionalTrigger>
  ),
  args: {
    alias: 'enableCustomDomain',
    inputtype: 'conditionaltoggle-outline',
    inputLabel: 'Route traffic through a Custom Domain',
    triggerValue: true,
    fieldsToClearOnClose: ['domainHostname', 'tlsMode'],
  },
};

/**
 * Enterprise checkout workflow. Selecting the checkbox expands complete billing
 * address fields, tax identification, and financial contact information.
 */
export const UseCase2: Story = {
  render: (args) => (
    <ConditionalTrigger {...args}>
      <Column span={12}>
        <Flex direction="column" gap="1">
          <Text size="2" weight="bold" color="gray" as="label">
            Corporate Entity Legal Name
          </Text>
          <TextField.Root name="billingLegalName" placeholder="Acme Global Corporation LLC" />
        </Flex>
      </Column>

      <Column span={8} newLine>
        <Flex direction="column" gap="1">
          <Text size="2" weight="bold" color="gray" as="label">
            Registered Headquarters Address
          </Text>
          <TextField.Root name="billingStreet" placeholder="100 Enterprise Way, Suite 400" />
        </Flex>
      </Column>

      <Column span={4}>
        <Flex direction="column" gap="1">
          <Text size="2" weight="bold" color="gray" as="label">
            VAT / Federal EIN Number
          </Text>
          <TextField.Root name="taxIdentifier" placeholder="US-849201948" />
        </Flex>
      </Column>

      <Column span={6} newLine>
        <Flex direction="column" gap="1">
          <Text size="2" weight="bold" color="gray" as="label">City</Text>
          <TextField.Root name="billingCity" placeholder="San Francisco" />
        </Flex>
      </Column>

      <Column span={6}>
        <Flex direction="column" gap="1">
          <Text size="2" weight="bold" color="gray" as="label">Postal / ZIP Code</Text>
          <TextField.Root name="billingPostal" placeholder="94107" />
        </Flex>
      </Column>
    </ConditionalTrigger>
  ),
  args: {
    alias: 'hasSeparateBilling',
    inputtype: 'conditionalcheckbox-material',
    inputLabel: 'Billing entity details are different from account owner',
    triggerValue: true,
    fieldsToClearOnClose: ['billingLegalName', 'billingStreet', 'taxIdentifier', 'billingCity', 'billingPostal'],
  },
};

/**
 * Multi-option select trigger. Only selecting "Corporate Wire Transfer"
 * (`wire_transfer`) reveals banking coordinates and SWIFT codes.
 */
export const UseCase3: Story = {
  render: (args) => (
    <ConditionalTrigger {...args}>
      <Column span={6}>
        <Flex direction="column" gap="1">
          <Text size="2" weight="bold" color="gray" as="label">Beneficiary Financial Institution</Text>
          <TextField.Root name="beneficiaryBank" placeholder="JPMorgan Chase N.A." defaultValue="JPMorgan Chase N.A." />
        </Flex>
      </Column>

      <Column span={6}>
        <Flex direction="column" gap="1">
          <Text size="2" weight="bold" color="gray" as="label">SWIFT / BIC Code</Text>
          <TextField.Root name="swiftBic" placeholder="CHASUS33XXX" defaultValue="CHASUS33XXX" />
        </Flex>
      </Column>

      <Column span={12} newLine>
        <Flex direction="column" gap="1">
          <Text size="2" weight="bold" color="gray" as="label">IBAN / Account Number</Text>
          <TextField.Root name="ibanNumber" placeholder="US44CHAS00000012345678" defaultValue="US44CHAS00000012345678" />
          <Text size="1" color="gray">Wire settlements take 1-3 business days to reconcile with VectorSigma accounts.</Text>
        </Flex>
      </Column>
    </ConditionalTrigger>
  ),
  args: {
    alias: 'settlementMethod',
    inputtype: 'conditionalselect-outline',
    inputLabel: 'Corporate Settlement Mechanism',
    placeholder: 'Choose payment method...',
    inputOptions: paymentMethods,
    triggerValue: 'wire_transfer',
    fieldsToClearOnClose: ['beneficiaryBank', 'swiftBic', 'ibanNumber'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Select **"Corporate Wire Transfer (SWIFT / ACH)"** from the dropdown to reveal the banking coordination inputs. Switching to Credit Card or Escrow automatically resets the Formik fields.',
      },
    },
  },
};

/**
 * Mission-critical cloud architecture. Renders soft-UI extruded drop shadows
 * over a tinted parent container, revealing automated failover routing parameters.
 */
export const UseCase4: Story = {
  render: (args) => (
    <ConditionalTrigger {...args}>
      <Column span={6}>
        <Flex direction="column" gap="1">
          <Text size="2" weight="bold" style={{ color: '#444' }} as="label">
            Secondary Standby Region
          </Text>
          <TextField.Root name="failoverRegion" placeholder="eu-central-1 (Frankfurt)" defaultValue="eu-central-1 (Frankfurt)" />
        </Flex>
      </Column>

      <Column span={6}>
        <Flex direction="column" gap="1">
          <Text size="2" weight="bold" style={{ color: '#444' }} as="label">
            RTO Max Tolerable Outage (Seconds)
          </Text>
          <TextField.Root name="maxRtoSeconds" placeholder="30" defaultValue="30" />
        </Flex>
      </Column>

      <Column span={12} newLine>
        <Flex direction="column" gap="1">
          <Text size="2" weight="bold" style={{ color: '#444' }} as="label">
            PagerDuty Automated Webhook Escalation
          </Text>
          <TextField.Root name="pagerdutyWebhook" placeholder="https://events.pagerduty.com/v2/enqueue" />
        </Flex>
      </Column>
    </ConditionalTrigger>
  ),
  args: {
    alias: 'enableDisasterRecovery',
    inputtype: 'conditionaltoggle-neumorphic',
    inputLabel: 'Deploy Automated Disaster Recovery Standby Cluster',
    triggerValue: true,
    fieldsToClearOnClose: ['failoverRegion', 'maxRtoSeconds', 'pagerdutyWebhook'],
  },
  decorators: [
    (Story) => (
      <>
        <Story />
      </>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Neumorphic variant calculates inset/outset lighting ratios against the parent background `#e0e5ec`. Expanding shifts from raised drop shadows to an inset concave groove.',
      },
    },
  },
};

/**
 * High-security Zero Trust enforcement. Demonstrates contextual documentation tooltips
 * paired with security key serial and backup officer delegation inputs.
 */
export const UseCase5: Story = {
  render: (args) => (
    <ConditionalTrigger {...args}>
      <Column span={6}>
        <Flex direction="column" gap="1">
          <Text size="2" weight="bold" color="gray" as="label">FIDO2 Token Public Registration Key</Text>
          <TextField.Root name="fido2Key" placeholder="fido2-sk-pub-992104-af92" />
        </Flex>
      </Column>

      <Column span={6}>
        <Flex direction="column" gap="1">
          <Text size="2" weight="bold" color="gray" as="label">Cryptographic Token Serial Number</Text>
          <TextField.Root name="tokenSerial" placeholder="YK5C-9281-0021" />
        </Flex>
      </Column>

      <Column span={12} newLine>
        <Flex direction="column" gap="1">
          <Text size="2" weight="bold" color="gray" as="label">Designated Security Officer Escrow Email</Text>
          <TextField.Root name="secOfficerEmail" placeholder="infosec-lead@company.internal" />
          <Text size="1" color="gray">Officer approval is required for cryptographic hardware replacement requests.</Text>
        </Flex>
      </Column>
    </ConditionalTrigger>
  ),
  args: {
    alias: 'requireHardwareAuth',
    inputtype: 'conditionalcheckbox-outline',
    inputLabel: 'Enforce Mandatory Physical Security Key (YubiKey / Titan)',
    triggerValue: true,
    isHinted: true,
    hintText: 'All administrative database operations will require physical token presence.',
    hintUrl: 'https://docs.vectorsigma.io/zero-trust/hardware-tokens',
    fieldsToClearOnClose: ['fido2Key', 'tokenSerial', 'secOfficerEmail'],
  },
};

/**
 * Demonstrates inline error state formatting and validation alerts when a required
 * regulatory policy trigger is left unconfirmed or invalid.
 */
export const UseCase6: Story = {
  render: (args) => (
    <ConditionalTrigger {...args}>
      <Column span={12}>
        <Flex direction="column" gap="1">
          <Text size="2" weight="bold" color="gray" as="label">Designated Data Protection Officer (DPO)</Text>
          <TextField.Root name="dpoName" placeholder="Dr. Elena Vance" />
        </Flex>
      </Column>
    </ConditionalTrigger>
  ),
  args: {
    alias: 'gdprSovereignty',
    inputtype: 'conditionaltoggle-material',
    inputLabel: 'European Union Sovereign Data Processing Mandate',
    triggerValue: true,
    errorText: 'Sovereign compliance mandate must be formally acknowledged by your data controller before account provisioning.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component when Formik marks the trigger field as touched and invalid, alerting the user to mandatory compliance gates.',
      },
    },
  },
};

/**
 * **Interactive Form Test:**
 * Toggle the trigger to reveal the child Input field. Observe how toggling the trigger
 * back to 'false' automatically wipes the state of the revealed children to prevent stale data.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      alert(`Form Submitted! \n\nPayload: ${JSON.stringify(values, null, 2)}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: false, customApiKey: '' }} 
        validate={(values) => {
          const errors: any = {};
          if (values[args.alias] && !values.customApiKey) {
            errors.customApiKey = 'API Key is required when override is enabled.';
          }
          return errors;
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4" style={{ width: '100%', maxWidth: '500px' }}>
              
              <ConditionalTrigger {...args}>
                <Input 
                  alias="customApiKey" 
                  inputLabel="Custom Model API Key" 
                  width={12} 
                  inputvariant="input-material"
                  placeholder="sk-..."
                />
              </ConditionalTrigger>
              
              <div style={{ backgroundColor: 'var(--gray-3)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text weight="bold" style={{ color: 'var(--ruby-9)' }}>
                  Live Formik State:
                </Text>
                <pre style={{ margin: 0, fontFamily: 'var(--code-font-family, monospace)', color: 'var(--gray-12)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
              
              <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer', width: '100%' }}>
                Apply Configuration
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'enableCustomModel',
    inputLabel: 'Use Custom LLM Provider',
    inputtype: 'conditionaltoggle-material',
    triggerValue: true,
    width: 12,
    fieldsToClearOnClose: ['customApiKey'], 
  },
};