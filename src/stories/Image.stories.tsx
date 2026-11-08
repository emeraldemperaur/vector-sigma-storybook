import type { Meta, StoryObj } from '@storybook/react';
import { Flex, Grid, Text } from '@radix-ui/themes';
import { ImageOutput } from './Image';
import { Row } from './Row';

const typographyPresets = {
  'Burgundy Executive': {
    background: '#800020',
    stroke: '#570016',
    textColor: '#f8fafc',
  },
  'Nautical Oceanic': {
    background: '#005f73',
    stroke: '#003544',
    textColor: '#e0fbfc',
  },
  'Midnight Slate': {
    background: '#1e293b',
    stroke: '#0f172a',
    textColor: '#f8fafc',
  },
  'Emerald Fleet': {
    background: '#065f46',
    stroke: '#022c22',
    textColor: '#ecfdf5',
  },
  'High Contrast': {
    background: '#000000',
    stroke: '#333333',
    textColor: '#ffffff',
  },
};

const meta = {
  title: 'χForm Components/ImageOutput',
  component: ImageOutput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      inlineStories: false,
      story: {
        iframeHeight: '400px',
      },
      description: {
        component: `
A robust, responsive image display container. Features enterprise-grade aesthetic variants, fluid aspect ratios, intelligent scaling constraints, graceful empty states, and LLM-friendly typography overrides.

**Note:** Unlike form inputs, this component does not require a Formik context and is strictly used for data presentation.

### Import
\`\`\`tsx
import { ImageOutput } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
      source: {
        transform: (code: string) => {
          if (code.includes('@emeraldemperaur/vector-sigma')) {
            return code;
          }
          return `import { ImageOutput } from '@emeraldemperaur/vector-sigma';\n\n${code}`;
        },
      },
    },
  },
  argTypes: {
    design: {
      control: 'radio',
      options: ['outline', 'material', 'neumorphic'],
      description: 'The aesthetic design language of the image container.',
      table: { defaultValue: { summary: "'outline'" } },
    },
    layout: {
      control: 'radio',
      options: ['normal', 'rounded', 'squared'],
      description: 'The structural layout and corner radius of the image container.',
      table: { defaultValue: { summary: "'normal'" } },
    },
    id: {
      control: 'text',
      description: 'The required unique DOM identifier for the component.',
    },
    src: {
      control: 'text',
      description: 'The source URL for the image. If omitted or null, renders the empty fallback state.',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for accessibility and screen readers.',
      table: { defaultValue: { summary: "'Image'" } },
    },
    width: {
      control: 'text',
      description: 'Explicit width for the image container (e.g., "100%", "300px").',
      table: { defaultValue: { summary: "'100%'" } },
    },
    height: {
      control: 'text',
      description: 'Explicit height for the image container. Overrides aspect ratio height calculation if both are provided.',
    },
    aspectratio: {
      control: 'number',
      description: 'Forces the image container to maintain a specific aspect ratio (e.g., 16/9 = 1.77). Prevents layout shift.',
    },
    objectFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
      description: 'Dictates how the image should scale within its container bounds.',
      table: { defaultValue: { summary: "'cover'" } },
    },
    typography: {
      control: 'select',
      options: ['Default (Theme)', ...Object.keys(typographyPresets)],
      mapping: {
        'Default (Theme)': undefined,
        ...typographyPresets,
      },
      description: 'Centralized color overrides targeting the container border and the empty state background/text.',
      table: {
        category: 'Branding & Theme',
      },
    },
  },
  args: {
    id: 'demoImageOutput',
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    alt: 'Modern corporate architecture',
    width: '100%',
  },
} satisfies Meta<typeof ImageOutput>;

export default meta;
type Story = StoryObj<typeof ImageOutput>;

export const Default: Story = {
  render: (args) => (
    <Flex style={{ maxWidth: '600px', width: '100%', margin: '0 auto' }}>
      <ImageOutput {...args} aspectratio={16/9} />
    </Flex>
  ),
  args: {
    design: 'outline',
    layout: 'normal',
  },
};

export const MaterialRounded: Story = {
  render: (args) => (
    <Flex style={{ maxWidth: '600px', width: '100%', margin: '0 auto' }}>
      <ImageOutput {...args} aspectratio={16/9} />
    </Flex>
  ),
  args: {
    design: 'material',
    layout: 'rounded',
  },
};

export const Neumorphic: Story = {
  render: (args) => (
    <Flex style={{ maxWidth: '600px', width: '100%', margin: '0 auto' }}>
      <ImageOutput {...args} aspectratio={16/9} />
    </Flex>
  ),
  args: {
    design: 'neumorphic',
    layout: 'normal',
  },
  decorators: [
    (Story) => (
      <Row>
      <div style={{ backgroundColor: '#e0e5ec', padding: '40px', width: '100%', borderRadius: '16px' }}>
        <Story />
      </div>
      </Row> 
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Neumorphic variant utilizes soft-UI extruded drop-shadows. A tinted container background (e.g., `#e0e5ec`) is strictly required for the shadows to render correctly.',
      },
    },
  },
};

/**
 * **Aspect Ratio Constraints**
 * Demonstrates the structural stability provided by the `aspectratio` prop. The container maintains a perfect 1:1 (Square) or 21:9 (Ultrawide) ratio regardless of the viewport width or the intrinsic dimensions of the source image.
 */
export const AspectRatioLayouts: Story = {
  render: (args) => (
    <Grid columns="2" gap="4" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <Flex direction="column" gap="2">
        <Text size="2" weight="bold">1:1 (Square Profile)</Text>
        <ImageOutput {...args} aspectratio={1} layout="rounded" />
      </Flex>
      <Flex direction="column" gap="2">
        <Text size="2" weight="bold">21:9 (Ultrawide Banner)</Text>
        <ImageOutput {...args} aspectratio={21/9} />
      </Flex>
    </Grid>
  ),
  args: {
    design: 'outline',
    src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop',
  },
};

export const ObjectFitContain: Story = {
  render: (args) => (
    <Flex style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
      <ImageOutput {...args} height="300px" />
    </Flex>
  ),
  args: {
    design: 'material',
    layout: 'squared',
    objectFit: 'contain',
    src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates `objectFit: "contain"`. The image scales to fit entirely within the bounds of the fixed `height="300px"` container without cropping, resulting in letterboxing if the aspect ratios do not match.',
      },
    },
  },
};

export const EmptyState: Story = {
  render: (args) => (
    <Flex style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
      <ImageOutput {...args} height="200px" />
    </Flex>
  ),
  args: {
    design: 'outline',
    src: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the graceful fallback rendering when the `src` prop is omitted or strictly set to `null`.',
      },
    },
  },
};

export const ThemedEmptyState: Story = {
  render: (args) => (
    <Flex style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
      <ImageOutput {...args} height="200px" />
    </Flex>
  ),
  args: {
    design: 'outline',
    src: null,
    typography: typographyPresets['Midnight Slate'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates utilizing the `typography` override prop on an empty state to inject brand-specific colors into the fallback container and icon.',
      },
    },
  },
};

export const InteractiveState: Story = {
  render: (args) => (
    <Flex style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
      <ImageOutput 
        {...args} 
        aspectratio={4/3} 
        onClick={() => alert('Image container clicked! Triggering lightbox...')} 
      />
    </Flex>
  ),
  args: {
    design: 'material',
    src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop',
  },
  parameters: {
    docs: {
      description: {
        story: 'When an `onClick` handler is provided, the component automatically adapts its CSS to display a pointer cursor and a subtle `translateY` lift effect on hover.',
      },
    },
  },
};