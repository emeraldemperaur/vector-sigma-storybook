import type { Meta, StoryObj } from '@storybook/react';
import { Formik, useFormikContext } from 'formik';
import { Flex, Button, Text, Code } from '@radix-ui/themes';
import { File } from './file';

const FormikStateObserver = ({ fieldAlias }: { fieldAlias: string }) => {
  const { values } = useFormikContext<any>();
  const val = values[fieldAlias];
  
  const displayVal = val instanceof globalThis.File 
    ? { name: val.name, size: val.size, type: val.type } 
    : val;

  return (
    <Flex direction="column" gap="1" style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--gray-3)', borderRadius: '8px' }}>
      <Text size="2" weight="bold" color="ruby">Live Formik State:</Text>
      <Code variant="ghost">{JSON.stringify({ [fieldAlias]: displayVal || null }, null, 2)}</Code>
    </Flex>
  );
};

const meta: Meta<typeof File> = {
  title: 'χForm Components/File',
  component: File,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Single File Upload component with built-in preview support and Formik binding.

### Import
\`\`\`tsx
import { File } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'identityDocument',
    width: 12,
    inputLabel: 'Upload Proof of Identity',
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
type Story = StoryObj<typeof File>;


export const Outline: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: null }} onSubmit={() => {}}>
      <File {...args} />
    </Formik>
  ),
  args: { inputtype: 'fileinput-outline' },
};

export const Material: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: null }} onSubmit={() => {}}>
      <File {...args} />
    </Formik>
  ),
  args: { inputtype: 'fileinput-material' },
};

export const Neumorphic: Story = {
  render: (args) => (
    <div style={{ padding: '32px', backgroundColor: '#e0e5ec', borderRadius: '16px', width: '100%' }}>
      <Formik initialValues={{ [args.alias]: null }} onSubmit={() => {}}>
        <File {...args} />
      </Formik>
    </div>
  ),
  args: { inputtype: 'fileinput-neumorphic' },
};

/**
 * **Pre-Filled State & Image Preview:**
 * Demonstrates the component initializing with an existing image URL from the server.
 * Your component automatically detects the image and renders the \`<AspectRatio>\` preview!
 */
export const ImagePreviewState: Story = {
  render: (args) => (
    <Formik 
      // Passing a direct URL string as the initial value
      initialValues={{ [args.alias]: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80' }} 
      onSubmit={() => {}}
    >
      <File {...args} />
    </Formik>
  ),
  args: {
    inputtype: 'fileinput-outline',
    inputLabel: 'Profile Avatar',
    preview: true,
  },
};

/**
 * **Interactive Form Test:**
 * Click to upload a file from your machine, observe the Formik state update, and test the validation ring.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      const file = values[args.alias];
      if (!file) return alert('No file selected!');
      alert(`File Ready for Upload! \n\nName: ${file.name || 'External URL'}`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: null }} 
        validate={(values) => {
          if (!values[args.alias]) return { [args.alias]: 'An identity document is required.' };
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit }) => (
          <Flex direction="column" gap="4" style={{ width: '100%' }}>
            <File {...args} />
            <FormikStateObserver fieldAlias={args.alias} />
            <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer' }}>
              Upload Payload
            </Button>
          </Flex>
        )}
      </Formik>
    );
  },
  args: {
    inputtype: 'fileinput-material',
    preview: true,
    isHinted: true,
    hintText: 'Ensure the file is under 5MB and clearly legible.',
  },
};