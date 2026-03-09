import type { Meta, StoryObj } from '@storybook/react';
import { Formik, useFormikContext } from 'formik';
import { Flex, Button, Text, Code } from '@radix-ui/themes';
import { FileMultiple } from './filemultiple';

const FormikStateObserver = ({ fieldAlias }: { fieldAlias: string }) => {
  const { values } = useFormikContext<any>();
  const valArray = values[fieldAlias] || [];
  
  const displayVal = valArray.map((file: any) => {
    return file instanceof globalThis.File 
      ? { name: file.name, size: file.size, type: file.type } 
      : file;
  });

  return (
    <Flex direction="column" gap="1" style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--gray-3)', borderRadius: '8px' }}>
      <Text size="2" weight="bold" color="ruby">Live Formik State (Array):</Text>
      <Code variant="ghost">{JSON.stringify({ [fieldAlias]: displayVal }, null, 2)}</Code>
    </Flex>
  );
};

const meta: Meta<typeof FileMultiple> = {
  title: 'χForm Components/FileMultiple',
  component: FileMultiple,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Multi-File Upload component with beautiful thumbnail grid generation and Formik array binding.

### Import
\`\`\`tsx
import { FileMultiple } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    alias: 'certificationFiles',
    width: 12,
    inputLabel: 'Upload Certification Documents',
  },
  decorators: [
    (Story) => (
      <Flex justify="center" align="start" style={{ padding: '2rem', width: '100%', maxWidth: '600px' }}>
        <Story />
      </Flex>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FileMultiple>;


export const Outline: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: [] }} onSubmit={() => {}}>
      <FileMultiple {...args} />
    </Formik>
  ),
  args: { inputtype: 'filemultiple-outline' },
};

export const Material: Story = {
  render: (args) => (
    <Formik initialValues={{ [args.alias]: [] }} onSubmit={() => {}}>
      <FileMultiple {...args} />
    </Formik>
  ),
  args: { inputtype: 'filemultiple-material' },
};

export const Neumorphic: Story = {
  render: (args) => (
    <div style={{ padding: '32px', backgroundColor: '#e0e5ec', borderRadius: '16px', width: '100%' }}>
      <Formik initialValues={{ [args.alias]: [] }} onSubmit={() => {}}>
        <FileMultiple {...args} />
      </Formik>
    </div>
  ),
  args: { inputtype: 'filemultiple-neumorphic' },
};

/**
 * **Pre-Filled Grid State:**
 * Passes an array of existing file URLs to demonstrate the Radix Grid layout and thumbnail generation.
 */
export const PreFilledGrid: Story = {
  render: (args) => (
    <Formik 
      initialValues={{ 
        [args.alias]: [
          'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=150&q=80',
          'document-report-q3.pdf',
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=150&q=80'
        ] 
      }} 
      onSubmit={() => {}}
    >
      <FileMultiple {...args} />
    </Formik>
  ),
  args: {
    inputtype: 'filemultiple-outline',
    inputLabel: 'Project Assets',
    preview: true,
  },
};

/**
 * **Interactive Form Test:**
 * Upload multiple files to see them append to the grid, test the "X" remove buttons, and watch the Formik array update live.
 */
export const InteractiveFormTest: Story = {
  render: (args) => {
    const handleMockSubmit = (values: any) => {
      const files = values[args.alias];
      if (!files || files.length === 0) return alert('No files selected!');
      alert(`Batch Ready! \n\n${files.length} files prepared for upload.`);
      console.log('Mock Form Submitted:', values);
    };

    return (
      <Formik 
        initialValues={{ [args.alias]: [] }} 
        validate={(values) => {
          if (!values[args.alias] || values[args.alias].length === 0) {
            return { [args.alias]: 'At least one file is required.' };
          }
          return {};
        }}
        onSubmit={handleMockSubmit}
      >
        {({ handleSubmit }) => (
          <Flex direction="column" gap="4" style={{ width: '100%' }}>
            <FileMultiple {...args} />
            <FormikStateObserver fieldAlias={args.alias} />
            <Button type="button" onClick={() => handleSubmit()} color="ruby" size="3" style={{ cursor: 'pointer' }}>
              Upload Batch
            </Button>
          </Flex>
        )}
      </Formik>
    );
  },
  args: {
    inputtype: 'filemultiple-material',
    inputLabel: 'Batch Asset Upload',
    isHinted: true,
    hintText: 'You can select multiple files at once from the dialog.',
  },
};