import type { Meta, StoryObj } from '@storybook/react';
import { Flex, Text, Grid, IconButton } from '@radix-ui/themes';
import { Icon } from './icons';

const supportedIcons = [
  'sun', 'moon', 'settings', 'user', 'cube', 'heart', 'backpack', 'questionmark', 'questionmarkcircled',
  'checkcircled', 'check', 'chat', 'enter', 'exit', 'calendar', 'camera', 'star', 'starfilled', 'code',
  'plus', 'pluscircled', 'minus', 'minuscircled', 'codesandbox', 'cardstack', 'cardstackminus', 'cardstackplus',
  'stack', 'layers', 'input', 'search', 'cancel', 'close', 'crosshair', 'github', 'instagram', 'twitter',
  'linkedin', 'file', 'filetext', 'home', 'delete', 'bell', 'switch', 'caretup', 'caretdown', 'caretleft',
  'caretright', 'caretsort', 'chevronup', 'chevrondown', 'chevronleft', 'chevronright', 'doublearrowup',
  'doublearrowdown', 'doublearrowleft', 'doublearrowright', 'notallowed', 'infocircled', 'envelopeopen',
  'envelopeclosed', 'paperplane', 'lockclosed', 'lockopen', 'slider', 'refresh', 'fontsize', 'cursorarrow',
  'cursortext', 'reset', 'clock', 'idcard', 'history', 'hamburgermenu', 'elipsishorizontal', 'elipsisvertical',
  'share', 'download', 'upload', 'image', 'externallink', 'hyperlink', 'scissors', 'keyboard', 'eyeopen',
  'eyeclosed', 'avatar', 'dashboard', 'table', 'listbullet', 'activitylog', 'barchart', 'piechart', 'dropdown',
  'checkbox', 'quote', 'globe', 'rocket', 'bookmark', 'bookmarkfilled', 'pin', 'pinfilled', 'reader', 'tokens',
  'zoomin', 'zoomout', 'mixerhorizontal', 'mixervertical', 'mix', 'archive', 'crumpledpaper', 'stopwatch',
  'laptimer', 'clipboard', 'clipboardcopy', 'desktop', 'laptop', 'mobile', 'enterfullscreen', 'exitfullscreen',
  'copy', 'face', 'fontfamily', 'video', 'shuffle', 'loop', 'heading'
] as const;

const meta: Meta<typeof Icon> = {
  title: 'χForm Utilities/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A dynamic wrapper around Radix UI icons. 

Pass mapped string to the \`name\` prop to render the corresponding SVG icon. Component spreads standard \`ComponentProps\` to pass standard SVG props like \`width\`, \`height\`, \`color\`, and \`onClick\` directly to it.

### Import
\`\`\`tsx
import { Icon } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: supportedIcons,
      description: 'The mapped string name of the icon.',
    },
    color: {
      control: 'color',
      description: 'Standard CSS color string (hex, rgb, or css variable).',
    },
    width: { control: 'text' },
    height: { control: 'text' },
    onClick: { action: 'clicked' },
  },
  args: {
    name: 'sun',
    width: '24',
    height: '24',
    color: 'var(--gray-12)',
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;


/**
 * Use the Controls panel at the bottom to test different icon names, sizes, and colors.
 */
export const Playground: Story = {
  render: (args) => (
    <Flex justify="center" align="center" style={{ padding: '2rem' }}>
      <Icon {...args} />
    </Flex>
  ),
};


/**
 * **Interactive Testing:**
 * Demonstrates the Icon component accepting an \`onClick\` handler natively, 
 * and how it looks composed inside a Radix UI \`<IconButton>\`.
 */
export const Interactive: Story = {
  render: (args) => (
    <Flex gap="4" align="center" justify="center" style={{ padding: '2rem' }}>
      
      <Flex direction="column" align="center" gap="2">
        <Text size="1" color="gray">Direct onClick</Text>
        <Icon 
          {...args} 
          name="heart" 
          color="var(--red-9)" 
          onClick={() => alert('Direct SVG click registered!')} 
          style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </Flex>

      <Flex direction="column" align="center" gap="2">
        <Text size="1" color="gray">Inside IconButton</Text>
        <IconButton size="3" variant="soft" color="blue" style={{ cursor: 'pointer' }}>
          <Icon name="paperplane" width="20" height="20" />
        </IconButton>
      </Flex>

    </Flex>
  ),
};


/**
 * **Complete Icon Library:**
 * A visual reference of every supported icon string mapped in the component. 
 * Double-click the text underneath an icon to quickly copy its string name!
 */
export const IconGallery: Story = {
  render: () => (
    <Grid columns="repeat(auto-fill, minmax(120px, 1fr))" gap="4" style={{ width: '100%', padding: '1rem' }}>
      {supportedIcons.map((iconName) => (
        <Flex
          key={iconName}
          direction="column"
          align="center"
          justify="center"
          gap="3"
          style={{
            padding: '16px 8px',
            border: '1px solid var(--gray-5)',
            borderRadius: 'var(--radius-3)',
            backgroundColor: 'var(--color-surface)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <Icon name={iconName} width="24" height="24" color="var(--gray-12)" />
          <Text 
            size="1" 
            style={{ 
              userSelect: 'all', 
              color: 'var(--gray-11)',
              fontFamily: 'var(--code-font-family, monospace)',
              textAlign: 'center'
            }}
          >
            {iconName}
          </Text>
        </Flex>
      ))}
    </Grid>
  ),
  parameters: {
    controls: { disable: true }, 
  },
};