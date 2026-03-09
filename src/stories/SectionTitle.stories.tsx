import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '@radix-ui/themes';
import { Icon } from '../components/icons/icons';
import { SectionTitle } from './SectionTitle';

const meta: Meta<typeof SectionTitle> = {
  title: 'χForm Layout/SectionTitle',
  component: SectionTitle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A purely presentational layout component used to break up large forms into readable, distinct sections.

### Import
\`\`\`tsx
import { SectionTitle } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    title: 'Account Settings',
    width: 12,
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
type Story = StoryObj<typeof SectionTitle>;


export const Default: Story = {
  args: {
    title: 'Personal Information',
    withSeparator: true,
  },
};

export const WithSubtitleAndCenter: Story = {
  args: {
    title: 'Security Preferences',
    subTitle: 'Manage your passwords, 2FA, and authorized device sessions here.',
    align: 'center',
    withSeparator: false,
    size: '6',
    subsize: '3',
  },
};

export const WithIconAndColor: Story = {
  args: {
    title: 'Danger Zone',
    subTitle: 'Proceed with caution. These actions are irreversible.',
    titleColor: 'var(--red-9)',
    subtitleColor: 'var(--red-11)',
    withSeparator: true,
    icon: <Icon name="stack" width="24" height="24" style={{ color: 'var(--red-9)' }} />,
  },
};

export const WithBackgroundBox: Story = {
  args: {
    title: 'VectorSigma Telemetry',
    subTitle: 'Live server metrics and node health.',
    backgroundColor: 'var(--gray-3)', // Creates a nice card-like header
    withSeparator: false,
  },
};