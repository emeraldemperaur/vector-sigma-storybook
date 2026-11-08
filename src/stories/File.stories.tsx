import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { Button, Flex, Text } from '@radix-ui/themes';
import { File as FileInput } from './File'; 
import { Column } from './Column';


const typographyPresets = {
  'Burgundy Executive': {
    background: '#0f172a',
    stroke: '#1e293b',
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
  title: 'χForm Components/FileInput',
  component: FileInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      inlineStories: false,
      story: {
        iframeHeight: '250px',
      },
      description: {
        component: `
Equipped with enterprise-grade aesthetics, HTML5 Drag & Drop, dynamic image previews, typography overrides, and strict Formik integration. Designed for LLM/MCP workflows.

**Note:** This component must be rendered inside a \`<Formik>\` context. It internally binds a native standard JavaScript \`File\` object (or \`null\`) directly into the Formik state payload.

### Import
\`\`\`tsx
// The component is exported as 'File', but is aliased here to avoid native DOM clashes
import { File as FileInput } from '@emeraldemperaur/vector-sigma';
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
      control: 'radio',
      options: ['fileinput-outline', 'fileinput-material', 'fileinput-neumorphic'],
      description: 'The aesthetic design language of the File dropzone.',
      table: { defaultValue: { summary: "'fileinput-outline'" } },
    },
    alias: {
      control: 'text',
      description: 'The unique identifier bridging the input field to the Formik state.',
    },
    inputLabel: {
      control: 'text',
      description: 'The primary semantic label rendered above the File dropzone.',
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
    preview: {
      control: 'boolean',
      description: 'If true, attempts to render a visual image thumbnail when a valid image file is selected.',
      table: { defaultValue: { summary: 'false' } },
    },
    readOnly: {
      control: 'boolean',
      description: 'Disables interaction, mutating the visual state to reflect read-only/disabled mode.',
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
    alias: 'certificationDocument',
    inputLabel: 'Upload PMP® Certification',
    width: 12,
  },
  decorators: [
    (Story, context) => {
      const isErrorState = Boolean(context.args.errorText);
      const alias = context.args.alias || 'fileField';
      const initialVal = context.parameters?.formik?.initialValues?.[alias] ?? null;

      return (
        <Flex justify="center" align="start" style={{ padding: '2rem', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
          <Formik
            key={`formik-sync-${context.args.errorText || 'clean'}`}
            initialValues={{ [alias]: initialVal }}
            initialErrors={isErrorState ? { [alias]: context.args.errorText as string } : {}}
            initialTouched={isErrorState ? { [alias]: true } : {}}
            onSubmit={(values) => console.log('FileInput Submit Payload:', values)}
          >
            <Story />
          </Formik>
        </Flex>
      );
    },
  ],
} satisfies Meta<typeof FileInput>;

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Outline: Story = {
  render: (args) => <FileInput {...args} />,
  args: {
    inputtype: 'fileinput-outline',
  },
};

export const Material: Story = {
  render: (args) => <FileInput {...args} />,
  args: {
    inputtype: 'fileinput-material',
  },
};

export const Neumorphic: Story = {
  render: (args) => <FileInput {...args} />,
  args: {
    inputtype: 'fileinput-neumorphic',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#e0e5ec', padding: '40px', width: '100%', borderRadius: '16px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Neumorphic variant utilizes soft-UI extruded drop-shadows. The dropzone dynamically shifts to an inset concave shadow when dragging a file over it. A tinted container background (e.g., `#e0e5ec`) is strictly required.',
      },
    },
  },
};

/**
 * **Image Preview Mode**
 * Demonstrates enabling the `preview` boolean. When a user uploads a valid `image/*` file format (JPG, PNG, WebP), the standard file icon is replaced with a dynamically generated `URL.createObjectURL` visual thumbnail.
 */
export const ImagePreviewMode: Story = {
  render: (args) => <FileInput {...args} />,
  args: {
    inputtype: 'fileinput-outline',
    inputLabel: 'Profile Photo (With Preview)',
    alias: 'profilePhoto',
    preview: true,
  },
};

export const WithHintAndTooltip: Story = {
  render: (args) => <FileInput {...args} />,
  args: {
    inputtype: 'fileinput-outline',
    isHinted: true,
    hintText: 'Ensure the certification document is a clear, legible PDF or JPG under 5MB.',
    hintUrl: 'https://docs.vectorsigma.io/certifications',
  },
};

export const CustomTypography: Story = {
  render: (args) => <FileInput {...args} />,
  args: {
    inputtype: 'fileinput-outline',
    typography: typographyPresets['Burgundy Executive'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates hijacking internal Radix themes via the `typography` prop using the enterprise Burgundy Executive preset.',
      },
    },
  },
};

export const ReadOnlyState: Story = {
  render: (args) => (
    <Formik
      initialValues={{
        [args.alias]: new File([''], 'PMP_Certification_2026_Validated.pdf', { type: 'application/pdf' }),
      }}
      onSubmit={(values) => console.log(values)}
    >
      <FileInput {...args} />
    </Formik>
  ),
  args: {
    alias: 'certificationDocument',
    inputtype: 'fileinput-material',
    readOnly: true,
    inputLabel: 'Verified Certification (Read Only)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates mounting the component with a pre-populated native `File` object in Formik state. Visually mutes the dropzone, disables drag-and-drop, and removes the "clear file" action when `readOnly` is enabled.',
      },
    },
  },
};

export const WithValidation: Story = {
  render: (args) => <FileInput {...args} />,
  args: {
    inputtype: 'fileinput-material',
    errorText: 'Proof of PMP® certification is strictly required to proceed.',
  },
  parameters: {
    formik: {
      initialValues: { certificationDocument: null },
    },
  },
};

/**
 * **Interactive Form Test:**
 * Upload a single file, observe metadata serialization in Formik state, and test the submission hook.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      const file = values[args.alias];
      alert(`File Submitted! \n\nName: ${file ? file.name : 'None'} (${file ? file.size : 0} bytes)`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: null }} 
        validate={(values) => {
          if (!values[args.alias]) {
            return { [args.alias]: 'A compliance certificate is required.' };
          }
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4" style={{ width: '100%', maxWidth: '450px' }}>
              <FileInput {...args} />
              
              <div style={{ backgroundColor: 'var(--gray-3)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text weight="bold" style={{ color: 'var(--ruby-9)' }}>
                  Live Formik State:
                </Text>
                <pre style={{ margin: 0, fontFamily: 'var(--code-font-family, monospace)', color: 'var(--gray-12)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(
                    values,
                    (_key, value) => value instanceof File ? { name: value.name, size: value.size, type: value.type } : value,
                    2
                  )}
                </pre>
              </div>
              
              <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer', width: '100%' }}>
                Upload Certificate
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'complianceCertificate',
    inputLabel: 'Upload Compliance Certificate',
    inputtype: 'fileinput-material',
    width: 12,
  },
};