import type { Meta, StoryObj } from '@storybook/react';
import { Flex, Grid, Text, Card } from '@radix-ui/themes';
import { FlagIcon } from './Flagicon';

const meta = {
  title: 'χForm Utilities/FlagIcon',
  component: FlagIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded', 
    docs: {
      inlineStories: true,
      story: {
        iframeHeight: '100px', 
      },
      description: {
        component: `
A lightweight, strictly-typed wrapper around \`country-flag-icons\`. 
Renders standard 3x2 SVG flags based on ISO 3166-1 alpha-2 country codes, with explicit exception handling for the European Union (\`EU\`).

### Import
\`\`\`tsx
import { FlagIcon } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
      source: {
        transform: (code: string) => {
          if (code.includes('@emeraldemperaur/vector-sigma')) {
            return code;
          }
          return `import { FlagIcon } from '@emeraldemperaur/vector-sigma';\n\n${code}`;
        },
      },
    },
  },
  argTypes: {
    country: {
      control: 'text',
      description: 'The ISO 3166-1 alpha-2 country code (e.g., "US", "GB", "JP", "NG") or "EU".',
      table: {
        type: { summary: "CountryCode | 'EU'" },
      },
    },
  },
  args: {
    country: 'US',
  },
} satisfies Meta<typeof FlagIcon>;

export default meta;
type Story = StoryObj<typeof FlagIcon>;

export const Default: Story = {
  render: (args) => <FlagIcon {...args} />,
};

export const EuropeanUnion: Story = {
  render: (args) => <FlagIcon {...args} />,
  args: {
    country: 'EU',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the hardcoded bypass logic for the European Union (EU) flag, which requires explicit handling as it is not a standard ISO 3166-1 alpha-2 country code.',
      },
    },
  },
};

export const InvalidFallback: Story = {
  render: (args) => <FlagIcon {...args} />,
  args: {
    country: 'INVALID' as any,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the fallback rendering behavior (a blank gray 18x12px container) when an unrecognized or invalid country code is supplied.',
      },
    },
  },
};

export const FlagGallery: Story = {
  render: () => {
    const sampleCountries = [
      'US', 'GB', 'CA', 'JP', 'DE', 'FR', 'IT', 'ES', 'AU', 'NZ',
      'BR', 'AR', 'MX', 'CL', 'IN', 'CN', 'KR', 'SG', 'ZA', 'NG',
      'KE', 'EG', 'AE', 'SA', 'CH', 'SE', 'NO', 'DK', 'FI', 'NL',
      'BE', 'VA', 'EU'
    ];
    
    return (
      <Grid columns="6" gap="4" style={{ width: '100%', maxWidth: '600px' }}>
        {sampleCountries.map((code) => (
          <Card key={code} size="1" style={{ display: 'flex', justifyContent: 'center' }}>
            <Flex direction="column" align="center" gap="2" style={{ padding: '8px' }}>
              <FlagIcon country={code as any} />
              <Text size="1" weight="medium" style={{ color: 'var(--gray-11)', letterSpacing: '0.05em' }}>
                {code}
              </Text>
            </Flex>
          </Card>
        ))}
      </Grid>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A visual gallery mapping a subset of 33 common ISO codes (including Vatican City) to their respective FlagIcon component outputs.',
      },
    },
  },
};