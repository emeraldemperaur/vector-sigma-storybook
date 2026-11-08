import type { Meta, StoryObj } from '@storybook/react';
import { VectorSigma } from './VectorSigma';
import { Box } from '@radix-ui/themes';

/**
 * **Teletraan1 Rendering Engine & VectorSigma Core**
 * 
 * Teletraan1 is the underlying dynamic rendering engine that parses VectorSigma `XFormType` schemas and generates a fully interactive, Formik-bound React form. 
 * 
 * VectorSigma acts as the Object-Oriented builder and orchestration layer. It exposes a fluid API to construct `xForm` schemas programmatically and handles deep hydration, state validation, and form submission lifecycles.
 */
const meta: Meta<typeof VectorSigma> = {
  title: 'χForm Engine/VectorSigma',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: "The ultimate rendering nexus for schema-driven forms. Combine `VectorSigma` builder methods to scaffold forms programmatically, or pass raw `XFormType` JSON directly to `.transform()` to render dynamic forms fetched from an API.",
      },
      source: {
        transform: (code: string) => {
          let cleanCode = code;
          if (cleanCode.trim().startsWith('{') && cleanCode.includes('render: () => {')) {
            cleanCode = cleanCode.replace(/\{\s*render:\s*\(\)\s*=>\s*\{/, 'export default function VectorSigmaExample() {');
            cleanCode = cleanCode.substring(0, cleanCode.lastIndexOf('}')); 
          }

          return `import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Text, Button, Badge } from '@radix-ui/themes';
import { VectorSigma } from '@emeraldemperaur/vector-sigma';

${cleanCode.trim()}`;
        },
      },
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VectorSigma>;



/**
 * **Raw JSON Parsing via VectorSigma.transform()**
 * 
 * Demonstrate instantiating VectorSigma using a raw JSON string (as if fetched from a REST API).
 * Uses the `codex` display mode to render the form as a multi-step wizard.
 */
export const JSONCodexWizard: Story = {
  render: () => {
    const rawSchema = JSON.stringify({
      uuid: "usr-auth-form-v2",
      name: "Security Upgrade Wizard",
      brandColor: "#663399", 
      model: [
        {
          sectionId: "step-1",
          title: "Account Verification",
          subtitle: "Confirm your identity",
          icon: "user",
          queries: [
            {
              queryId: 1,
              inputAlias: "verifyEmail",
              inputLabel: "Primary Email Address",
              inputType: "email-input",
              inputWidth: 12,
              isRequired: true,
              inputPlaceholder: "name@company.com"
            }
          ]
        },
        {
          sectionId: "step-2",
          title: "Two-Factor Authentication",
          subtitle: "Secure your account with 2FA",
          icon: "linkedin",
          queries: [
            {
              queryId: 2,
              inputAlias: "mfaMethod",
              inputLabel: "Authentication Method",
              inputType: "radio-material",
              inputWidth: 12,
              isRequired: true,
              inputOptions: [
                { optionid: 1, optionvalue: "app", text: "Authenticator App (Recommended)" },
                { optionid: 2, optionvalue: "sms", text: "SMS Text Message" }
              ]
            },
            {
              queryId: 3,
              inputAlias: "backupPhone",
              inputLabel: "Backup Phone Number",
              inputType: "phone-material",
              inputWidth: 12,
              isRequired: false,
              isHinted: true,
              hintText: "Used for account recovery if you lose access to your primary 2FA method."
            }
          ]
        }
      ]
    });

    const instance = new VectorSigma(rawSchema);

    return (
      <Box style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        {instance.transform({
          displayMode: 'codex',
          strictValidation: true,
          theme: { accentColor: 'purple' },
          onFinish: (values) => {
            alert(`Wizard Completed!\n\nPayload: ${JSON.stringify(values, null, 2)}`);
          }
        })}
      </Box>
    );
  }
};