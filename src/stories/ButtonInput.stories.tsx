import type { Meta, StoryObj } from '@storybook/react';
import { ButtonInput } from './ButtonInput';
import { Icon } from '../components/icons/icons';

const meta = {
  title: 'χForm Components/ButtonInput',
  component: ButtonInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Equipped with enterprise-grade aesthetics, intelligent context-aware neumorphism, typography overrides, loading states, and advanced DX interaction handlers (like long-press). 

This component wraps Radix UI's \`Button\` while enforcing standard VectorSigma grid layout properties (\`width\`, \`newRow\`).

### Import
\`\`\`tsx
import { ButtonInput } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
      source: {
        transform: (code: string) => {
          if (code.includes("import { ButtonInput }")) {
            return code;
          }
          return `import { ButtonInput } from '@emeraldemperaur/vector-sigma';\n\n${code}`;
        },
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The label or content rendered inside the button.',
    },
    inputtype: {
      control: 'radio',
      options: ['button-outline', 'button-material', 'button-neumorphic'],
      description: 'The design aesthetic of the Button component.',
      table: { defaultValue: { summary: "'button-outline'" } },
    },
    alias: {
      control: 'text',
      description: 'The unique identifier bridging the button to the form state or DOM ID.',
    },
    size: {
      control: 'select',
      options: ['1', '2', '3', '4'],
      description: 'Radix UI scale size.',
      table: { defaultValue: { summary: "'2'" } },
    },
    color: {
      control: 'select',
      options: ['gray', 'gold', 'bronze', 'brown', 'yellow', 'amber', 'orange', 'tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass', 'lime', 'mint', 'sky'],
      description: 'Radix UI color scale theme.',
    },
    icon: {
      control: 'select',
      options: ['None', 'Paperplane', 'Delete', 'Settings', 'Stack', 'Plus'],
      mapping: {
        None: undefined,
        Paperplane: <Icon name="paperplane" />,
        Delete: <Icon name="delete" />,
        Settings: <Icon name="settings" />,
        Stack: <Icon name="stack" />,
        Plus: <Icon name="plus" />,
      },
      description: 'Optional ReactNode to render an icon alongside the button text.',
    },
    width: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Defines the responsive grid column span for the component (1-12).',
    },
    newRow: {
      control: 'boolean',
      description: 'Forces the component to break into a new Flex/Grid row.',
    },
    isLoading: {
      control: 'boolean',
      description: 'Triggers the loading state spinner and disables interactions.',
    },
    readOnly: {
      control: 'boolean',
      description: 'Disables interaction, mutating visual state to reflect read-only mode.',
    },
    isHinted: {
      control: 'boolean',
      description: 'Toggles the visibility of the contextual hint icon below the button.',
    },
    hintText: {
      control: 'text',
      description: 'The text payload displayed inside the Tooltip when isHinted is true.',
    },
    hintUrl: {
      control: 'text',
      description: 'An optional URL bound to the hint icon.',
    },
    onClick: { action: 'clicked' },
    onHover: { action: 'hovered' },
    onLongClick: { action: 'long-clicked' },
  },
  args: {
    children: 'Submit Form',
    alias: 'primary-submit',
    width: 12,
    size: '3',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', maxWidth: '600px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ButtonInput>;

export default meta;
type Story = StoryObj<typeof ButtonInput>;

export const Outline: Story = {
  args: {
    inputtype: 'button-outline',
  },
};

export const Material: Story = {
  args: {
    inputtype: 'button-material',
    color: 'blue',
  },
};

export const Neumorphic: Story = {
  args: {
    inputtype: 'button-neumorphic',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#e0e5ec', padding: '40px', width: '100%', borderRadius: '16px', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Neumorphic buttons dynamically calculate their shadows based on the background color of their nearest parent. The parent must have a tinted background (e.g., `#e0e5ec`).',
      },
    },
  },
};

export const WithIcon: Story = {
  args: {
    inputtype: 'button-material',
    children: 'Send Message',
    color: 'iris',
    icon: 'Paperplane', // Maps via argTypes to <Icon name="paperplane" />
  },
};

export const LoadingState: Story = {
  args: {
    inputtype: 'button-material',
    children: 'Processing Transaction',
    color: 'green',
    isLoading: true,
  },
};

export const WithTooltipHint: Story = {
  args: {
    inputtype: 'button-outline',
    children: 'Delete Resource',
    color: 'red',
    icon: 'Delete',
    isHinted: true,
    hintText: 'Warning: This action is permanent and cannot be undone.',
  },
};

export const LongPressInteraction: Story = {
  args: {
    inputtype: 'button-material',
    children: 'Hold for Options (600ms)',
    color: 'orange',
  },
  parameters: {
    docs: {
      description: {
        story: 'Click and hold this button for 600ms to trigger the `onLongClick` handler. Natively supported without external gesture libraries.',
      },
    },
  },
};

export const CustomTypographyOverride: Story = {
  args: {
    inputtype: 'button-outline',
    children: 'Custom Branded Button',
    typography: {
      background: '#2b1a1c',
      stroke: '#E54D2E',
      textColor: '#ffcccc',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates utilizing the `typography` prop to strictly bypass internal themes and force specific brand hex colors.',
      },
    },
  },
};