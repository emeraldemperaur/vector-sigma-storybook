import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { TextAreaInput } from './InputTextArea';
import { Row } from './Row';
import { Column } from './Column';
import { Button, Flex, Text } from '@radix-ui/themes';

const meta = {
  title: 'χForm Components/TextAreaInput',
  component: TextAreaInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      inlineStories: false,
      story: {
        iframeHeight: '300px',
      },
      description: {
        component: `
A scalable multi-line text input component. Features enterprise-grade aesthetic variants, configurable row heights, manual resize constraints, and strict Formik binding. Designed for LLM/MCP workflows where extended text entry is required.

**Note:** This component must be rendered inside a \`<Formik>\` context.

### Import
\`\`\`tsx
import { TextAreaInput } from '@emeraldemperaur/vector-sigma';
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
      options: ['textarea-outline', 'textarea-material', 'textarea-neumorphic'],
      description: 'The aesthetic design language of the TextArea.',
      table: { defaultValue: { summary: "'textarea-outline'" } },
    },
    alias: {
      control: 'text',
      description: 'The unique identifier bridging the input field to the Formik state.',
    },
    inputLabel: {
      control: 'text',
      description: 'Display label rendered above the textarea.',
    },
    placeholder: {
      control: 'text',
      description: 'Helper text rendered inside the empty textarea.',
    },
    rows: {
      control: { type: 'range', min: 2, max: 20, step: 1 },
      description: 'Base number of visible text lines before scrolling is required.',
      table: { defaultValue: { summary: '4' } },
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Dictates the axes on which the user can manually resize the textarea.',
      table: { defaultValue: { summary: "'vertical'" } },
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
    readOnly: {
      control: 'boolean',
      description: 'Disables interaction, mutating the visual state to reflect read-only/disabled mode.',
      table: { defaultValue: { summary: 'false' } },
    },
    errorText: {
      control: 'text',
      description: 'Explicit error string to override standard Formik validation messages.',
    },
  },
  args: {
    alias: 'systemPrompt',
    inputLabel: 'System Prompt Configuration',
    placeholder: 'Enter the detailed behavioral instructions for the AI agent...',
    width: 12,
    rows: 4,
    resize: 'vertical',
  },
  decorators: [
    (Story, context) => {
      const isErrorState = Boolean(context.args.errorText);
      const alias = context.args.alias || 'textareaField';
      const initialVal = context.parameters?.formik?.initialValues?.[alias] ?? '';

      return (
          <Row>
          <Formik
            key={`formik-sync-${context.args.errorText || 'clean'}`}
            initialValues={{ [alias]: initialVal }}
            initialErrors={isErrorState ? { [alias]: context.args.errorText as string } : {}}
            initialTouched={isErrorState ? { [alias]: true } : {}}
            onSubmit={(values) => console.log('TextArea Submit Payload:', values)}
          >
            <Story />
          </Formik>
          </Row>
      );
    },
  ],
} satisfies Meta<typeof TextAreaInput>;

export default meta;
type Story = StoryObj<typeof TextAreaInput>;

export const Outline: Story = {
  render: (args) => <TextAreaInput {...args} />,
  args: {
    inputtype: 'textarea-outline',
  },
};

export const Material: Story = {
  render: (args) => <TextAreaInput {...args} />,
  args: {
    inputtype: 'textarea-material',
  },
};

export const Neumorphic: Story = {
  render: (args) => <TextAreaInput {...args} />,
  args: {
    inputtype: 'textarea-neumorphic',
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
        story: 'Neumorphic variant utilizes soft-UI extruded drop-shadows. The input field dynamically shifts to an inset concave shadow when focused. A tinted container background (e.g., `#e0e5ec`) is strictly required for accurate rendering.',
      },
    },
  },
};

export const ExtendedHeight: Story = {
  render: (args) => <TextAreaInput {...args} />,
  args: {
    inputtype: 'textarea-outline',
    rows: 8,
    inputLabel: 'Extended Documentation',
    placeholder: 'Type comprehensive notes here...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Adjust the `rows` prop to naturally extend the vertical footprint of the input without requiring CSS height overrides.',
      },
    },
  },
};

export const ResizeDisabled: Story = {
  render: (args) => <TextAreaInput {...args} />,
  args: {
    inputtype: 'textarea-material',
    resize: 'none',
    inputLabel: 'Fixed Layout Input (Resize Disabled)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Setting `resize="none"` removes the native browser grab-handle, preventing users from manipulating the field dimensions. Highly recommended for strict grid layouts.',
      },
    },
  },
};

export const ReadOnlyState: Story = {
  render: (args) => (
    <Formik
      initialValues={{ [args.alias]: 'You are an autonomous agent designed to process CSV uploads and return structured JSON arrays.' }}
      onSubmit={(values) => console.log(values)}
    >
      <TextAreaInput {...args} />
    </Formik>
  ),
  args: {
    alias: 'lockedPrompt',
    inputtype: 'textarea-outline',
    readOnly: true,
    inputLabel: 'Inherited System Prompt (Read Only)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates visually muting the field and blocking keyboard input when `readOnly` is enabled.',
      },
    },
  },
};

export const WithValidation: Story = {
  render: (args) => <TextAreaInput {...args} />,
  args: {
    inputtype: 'textarea-material',
    errorText: 'The system prompt must be at least 50 characters long.',
  },
  parameters: {
    formik: {
      initialValues: { systemPrompt: 'Too short' },
    },
  },
};

/**
 * **Interactive Form Test:**
 * Type in the textarea to observe real-time string state updates and test the Formik submission hook.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      alert(`Form Submitted! \n\nPayload: ${JSON.stringify(values, null, 2)}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: '' }} 
        validate={(values) => {
          if (!values[args.alias] || values[args.alias].length < 10) return { [args.alias]: 'Please enter at least 10 characters.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4">
              <TextAreaInput {...args} />
              
              <div style={{ backgroundColor: 'var(--gray-3)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Text weight="bold" style={{ color: 'var(--ruby-9)' }}>
                  Live Formik State:
                </Text>
                <pre style={{ margin: 0, fontFamily: 'var(--code-font-family, monospace)', color: 'var(--gray-12)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
              
              <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer', width: '100%' }}>
                Save Notes
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'meetingNotes',
    inputLabel: 'Meeting Notes',
    inputtype: 'textarea-material',
    rows: 4,
  },
};