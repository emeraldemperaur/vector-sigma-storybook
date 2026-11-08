import type { Meta, StoryObj } from '@storybook/react';
import { SectionTitle } from './SectionTitle';
import { Icon } from '../components/icons/icons';

const meta = {
  title: 'χForm Layout/SectionTitle',
  component: SectionTitle,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Provides structural section branding, typography hierarchy, optional action badges, and three design language implementations (Outline, Material, Neumorphic).

**Note:** This component wraps its content in a \`<Column>\`, so it expects to be placed inside a flex/grid row container (like \`<Row>\`).
        `,
      },
      source: {
        transform: (code: string) => {
          if (code.includes("import { SectionTitle }")) {
            return code;
          }
          return `import { SectionTitle } from './SectionTitle';\n\n${code}`;
        },
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Primary headline string rendered in the SectionTitle header.',
    },
    subTitle: {
      control: 'text',
      description: 'Secondary explanatory subtitle or guide text rendered below the headline.',
    },
    variant: {
      control: 'radio',
      options: ['outline', 'material', 'neumorphic', 'section-outline', 'section-material', 'section-neumorphic'],
      description: 'The aesthetic design variation of the section container and separator.',
      table: { defaultValue: { summary: "'section-outline'" } },
    },
    align: {
      control: 'radio',
      options: ['left', 'center', 'right'],
      description: 'Content horizontal alignment across viewports.',
      table: { defaultValue: { summary: "'left'" } },
    },
    size: {
      control: 'select',
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      description: 'Radix UI typography scale size for the primary heading.',
      table: { defaultValue: { summary: "'5'" } },
    },
    subsize: {
      control: 'select',
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      description: 'Radix UI typography scale size for the subtitle.',
      table: { defaultValue: { summary: "'2'" } },
    },
    tag: {
      control: 'text',
      description: 'Optional contextual pill badge or tag rendered beside the title.',
    },
    withSeparator: {
      control: 'boolean',
      description: 'Toggles the bottom horizontal divider line.',
      table: { defaultValue: { summary: 'true' } },
    },
    width: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Grid column span allocation (1 - 12 based on the parent layout).',
      table: { defaultValue: { summary: '12' } },
    },
    newRow: {
      control: 'boolean',
      description: 'Forces the section title to break onto a new grid row.',
      table: { defaultValue: { summary: 'true' } },
    },
    backgroundColor: {
      control: 'color',
      description: 'Explicit background color for the section title block.',
    },
    titleColor: {
      control: 'color',
      description: 'Direct color override for the primary title text.',
    },
    subtitleColor: {
      control: 'color',
      description: 'Direct color override for the subtitle text.',
    },
    marginBlock: {
      control: 'text',
      description: 'Outer vertical margin block applied to the section title.',
      table: { defaultValue: { summary: "'28px 0'" } },
    },
    icon: {
      control: 'select',
      options: ['None', 'User', 'Lock', 'Globe', 'Shield', 'Check'],
      mapping: {
        None: undefined,
        User: <Icon name="user" />,
        Lock: <Icon name="lockclosed" />,
        Globe: <Icon name="globe" />,
        Shield: <Icon name="shield" />,
        Check: <Icon name="check" />,
      },
      description: 'Decorative or semantic icon rendered alongside the title headline.',
    },
  },
  args: {
    width: 12,
    newRow: true,
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', maxWidth: '900px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SectionTitle>;

export default meta;
type Story = StoryObj<typeof SectionTitle>;

export const Outline: Story = {
  args: {
    variant: 'outline',
    title: 'Account Overview',
    subTitle: 'Manage your personal information and active sessions.',
    icon: 'User',
  },
};

export const Material: Story = {
  args: {
    variant: 'material',
    title: 'Security Preferences',
    subTitle: 'Configure authentication methods and cryptographic keys.',
    icon: 'Lock',
  },
};

export const Neumorphic: Story = {
  args: {
    variant: 'neumorphic',
    title: 'Network Configuration',
    subTitle: 'Adjust your API webhooks and server latency routing.',
    icon: <Icon name="globe" />,
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
        story: 'Neumorphic design relies heavily on shadow casting. The parent container must have a non-white/non-black background color (e.g., `#e0e5ec`) for the extrusion effect to render properly.',
      },
    },
  },
};

export const CenteredWithTag: Story = {
  args: {
    variant: 'outline',
    align: 'center',
    title: 'Enterprise Billing',
    subTitle: 'Review your current subscription tier and download recent invoices.',
    tag: 'Premium Tier',
  },
};

export const CustomBranding: Story = {
  args: {
    variant: 'material',
    title: 'Restricted Access',
    subTitle: 'Requires administrative privileges to modify these settings.',
    tag: 'Admin Only',
    icon: <Icon name="shield" />,
    typography: {
      background: '#2b1a1c',
      titleColor: '#ffb3b3',
      subtitleColor: '#ffcccc',
      accent: '#E54D2E',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates utilizing the `typography` prop object to explicitly override the background, text, and accent indicator colors simultaneously.',
      },
    },
  },
};

export const MinimalNoSeparator: Story = {
  args: {
    variant: 'outline',
    title: 'Quick Actions',
    withSeparator: false,
    size: '4',
    marginBlock: '12px 0',
  },
  parameters: {
    docs: {
      description: {
        story: 'A compact, separator-free configuration ideal for tighter spaces or nested sub-sections.',
      },
    },
  },
};