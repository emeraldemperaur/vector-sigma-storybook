import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';
import { Flex, Button, Text} from '@radix-ui/themes';
import { AvatarInput } from './AvatarInput';
import { Row } from './Row';
import { Column } from './Column';



const meta = {
  title: 'χForm Components/Avatar Input',
  component: AvatarInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A specialized file input for uploading profile pictures and avatars. Integrates directly with Formik state management and supports multiple enterprise design aesthetics, shapes, validation states, and tooltips.

**Note:** This component must be rendered inside a \`<Formik>\` context.

### Import
\`\`\`tsx
import { AvatarInput } from '@emeraldemperaur/vector-sigma';
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
      options: ['avatar', 'avatar-outline', 'avatar-material', 'avatar-neumorphic'],
      description: 'The aesthetic design variation of the Avatar input.',
      table: { defaultValue: { summary: "'avatar-outline'" } },
    },
    alias: {
      control: 'text',
      description: 'The required unique identifier for the input field. Maps to the Formik state key.',
    },
    inputLabel: {
      control: 'text',
      description: 'The optional label or description rendered below the input.',
    },
    shape: {
      control: 'radio',
      options: ['circle', 'square', 'rounded'],
      description: 'The layout shape of the Avatar input field.',
      table: { defaultValue: { summary: "'circle'" } },
    },
    size: {
      control: { type: 'range', min: 40, max: 300, step: 10 },
      description: 'The physical square dimension of the avatar (in pixels).',
      table: { defaultValue: { summary: '120' } },
    },
    width: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Viewport column width span (1 - 12 based on the parent layout).',
    },
    newRow: {
      control: 'boolean',
      description: 'Forces the input onto a new layout row.',
    },
    readOnly: {
      control: 'boolean',
      description: 'Disables interactions and file uploads.',
    },
    isHinted: {
      control: 'boolean',
      description: 'Renders a tooltip icon next to the label.',
    },
    hintText: {
      control: 'text',
      description: 'The content displayed inside the tooltip.',
    },
    hintUrl: {
      control: 'text',
      description: 'Optional hyperlink for the hint icon.',
    },
    errorText: {
      control: 'text',
      description: 'Custom error message rendered when the field is touched and invalid.',
    },
    accept: {
      control: 'text',
      description: 'Allowed file MIME types.',
      table: { defaultValue: { summary: "'image/*'" } },
    },
  },
  args: {
    alias: 'profileImage',
    inputLabel: 'Upload Profile',
    width: 12,
    size: 120,
    shape: 'circle',
    inputtype: 'avatar-outline',
  },
  decorators: [
    (Story, context) => {
      const isErrorState = Boolean(context.args.errorText);
      return (
        <Row>
          <Formik
            key={`formik-sync-${context.args.errorText || 'clean'}`}
            initialValues={{ [context.args.alias]: null }}
            initialErrors={isErrorState ? { [context.args.alias]: context.args.errorText as string } : {}}
            initialTouched={isErrorState ? { [context.args.alias]: true } : {}}
            onSubmit={(values) => console.log('Avatar uploaded:', values)}
          >
            <Story />
          </Formik>
        </Row>
      );
    },
  ],
} satisfies Meta<typeof AvatarInput>;

export default meta;
type Story = StoryObj<typeof AvatarInput>;

export const Outline: Story = {
  render: (args) => <AvatarInput {...args} />,
  args: {
    inputtype: 'avatar-outline',
    inputLabel: 'Upload Outline Avatar',
  },
};

export const Material: Story = {
  render: (args) => <AvatarInput {...args} />,
  args: {
    inputtype: 'avatar-material',
    inputLabel: 'Upload Material Avatar',
  },
};

export const Neumorphic: Story = {
  render: (args) => <AvatarInput {...args} />,
  args: {
    inputtype: 'avatar-neumorphic',
    inputLabel: 'Upload Neumorphic Avatar',
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
        story: 'Neumorphic design relies on shadow casting. The parent container must have a non-white/non-black background color (e.g., `#e0e5ec`) for the extrusion and inset effects to render correctly.',
      },
    },
  },
};

export const Shapes: Story = {
  render: (args) => (
    <>
      <AvatarInput {...args} alias="circleAvatar" shape="circle" inputLabel="Circle (Default)" />
      <AvatarInput {...args} alias="roundedAvatar" shape="rounded" inputLabel="Rounded" />
      <AvatarInput {...args} alias="squareAvatar" shape="square" inputLabel="Square" />
    </>
  ),
  args: {
    inputtype: 'avatar-material',
    width: 4,
    newRow: false,
  },
};

export const WithHintAndTooltip: Story = {
  render: (args) => <AvatarInput {...args} />,
  args: {
    inputtype: 'avatar-outline',
    isHinted: true,
    hintText: 'Please upload a square image at least 500x500px in size (PNG or JPG).',
    hintUrl: 'https://docs.vectorsigma.ca/avatar-guidelines',
  },
};

/**
 * **Validation State:**
 * Demonstrates how the input reacts when Formik reports an error for this field's alias.
 * (Triggered automatically in this story via Formik's `initialErrors` and `initialTouched` context injection).
 */
export const WithValidation: Story = {
  render: (args) => <AvatarInput {...args} />,
  args: {
    inputtype: 'avatar-outline',
    errorText: 'A profile picture is required for compliance.',
  },
};


/**
 * **Interactive Form Test:**
 * Select an image file to observe the Avatar thumbnail preview render dynamically, 
 * observe the injected JavaScript `File` object in the Formik state, and test the submission hook.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      const fileData = values[args.alias];
      alert(`Avatar Form Submitted! \n\nFile: ${fileData ? fileData.name : 'None'}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: null }} 
        validate={(values) => {
          if (!values[args.alias]) return { [args.alias]: 'You must upload an identity document to proceed.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit, values }) => (
          <Column span={12}>
            <Flex direction="column" gap="4" style={{ width: '100%', maxWidth: '450px' }}>
              <AvatarInput {...args} />
              
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
                Upload Payload
              </Button>
            </Flex>
          </Column>
        )}
      </Formik>
    );
  },
  args: {
    alias: 'identityDocument',
    inputtype: 'avatar-outline',
    inputLabel: 'Upload Proof of Identity',
    isHinted: true,
    hintText: 'Supports PDF, Images, Excel, JSON...',
  },
};