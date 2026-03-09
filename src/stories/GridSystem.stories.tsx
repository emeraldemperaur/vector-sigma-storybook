import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '@radix-ui/themes';
import { Container } from './container';
import { Row } from './row';
import { Column } from './column';

const MockCard = ({ 
  children, 
  design = 'outline', 
  onClick 
}: { 
  children: React.ReactNode; 
  design?: 'outline' | 'material' | 'neumorphic';
  onClick?: () => void;
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
    width: '100%',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'transform 0.2s ease',
    textAlign: 'center',
  };

  const designs: Record<string, React.CSSProperties> = {
    'outline': { border: '1px dashed var(--gray-8)', borderRadius: '8px', backgroundColor: 'transparent' },
    'material': { backgroundColor: 'var(--color-surface)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '4px' },
    'neumorphic': { backgroundColor: '#e0e5ec', borderRadius: '16px', boxShadow: '6px 6px 12px #bec3c9, -6px -6px 12px #ffffff' }
  };

  return (
    <div 
      style={{ ...baseStyle, ...designs[design] }} 
      onClick={onClick}
      onMouseEnter={(e) => onClick && (e.currentTarget.style.transform = 'scale(0.98)')}
      onMouseLeave={(e) => onClick && (e.currentTarget.style.transform = 'scale(1)')}
    >
      <Text size="2" weight="bold" style={{ color: design === 'neumorphic' ? '#555' : 'var(--gray-12)' }}>
        {children}
      </Text>
    </div>
  );
};

const meta: Meta<typeof Container> = {
  title: 'χForm Layout/Grid System',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Core xForm layout engine. Relies on classic 12-column CSS Grid for width/span dimension enforcement.

**Composition Rule:**
Always nest in this order: \`<Container>\` → \`<Row>\` → \`<Column>\`.

### Import
\`\`\`tsx
import { Container, Row, Column } from '@emeraldemperaur/vector-sigma';
\`\`\`
        `,
      },
    },
  },
  args: {
    fluid: false,
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const StandardGrid: Story = {
  render: (args) => (
    <Container {...args}>
      <Row gap="4">
        <Column span={12}><MockCard design="material">span=12 (Full Width)</MockCard></Column>
        
        <Column span={6}><MockCard design="material">span=6 (Half)</MockCard></Column>
        <Column span={6}><MockCard design="material">span=6 (Half)</MockCard></Column>
        
        <Column span={4}><MockCard design="material">span=4 (Third)</MockCard></Column>
        <Column span={4}><MockCard design="material">span=4 (Third)</MockCard></Column>
        <Column span={4}><MockCard design="material">span=4 (Third)</MockCard></Column>
        
        <Column span={3}><MockCard design="material">span=3</MockCard></Column>
        <Column span={3}><MockCard design="material">span=3</MockCard></Column>
        <Column span={3}><MockCard design="material">span=3</MockCard></Column>
        <Column span={3}><MockCard design="material">span=3</MockCard></Column>
      </Row>
    </Container>
  ),
};

/**
 * **Responsive Behavior:**
 * Resize your Storybook browser window to see these columns stack!
 * They are set to take up 12 columns on mobile, 6 on tablets, and 3 on large desktop screens.
 */
export const ResponsiveBreakpoints: Story = {
  render: (args) => (
    <Container {...args}>
      <Row gap="4">
        {[1, 2, 3, 4].map((i) => (
          <Column key={i} xs={12} md={6} lg={3}>
            <MockCard design="outline">
              xs=12 | md=6 | lg=3
            </MockCard>
          </Column>
        ))}
      </Row>
    </Container>
  ),
};
/**
 * **Fluid Width:**
 * Setting \`fluid={true}\` allows the container to bypass Radix's max-width constraints and fill 100% of the screen width.
 */
export const FluidNeumorphicLayout: Story = {
  render: (args) => (
    <div style={{ backgroundColor: '#e0e5ec', padding: '40px 0', width: '100%' }}>
      <Container {...args} fluid>
        <Row gap="6">
          <Column span={8}><MockCard design="neumorphic">Main Content Area (span=8)</MockCard></Column>
          <Column span={4}><MockCard design="neumorphic">Sidebar (span=4)</MockCard></Column>
        </Row>
      </Container>
    </div>
  ),
};

/**
 * **Interactive Grid Testing:**
 * Click on the grid items below to test the mock \`onClick\` functions and interaction states inside the columns.
 */
export const InteractiveLayout: Story = {
  render: (args) => (
    <Container {...args}>
      <Row gap="4">
        <Column span={4}>
          <MockCard design="material" onClick={() => alert('Left Column Clicked!')}>
            Click Me (Left)
          </MockCard>
        </Column>
        <Column span={4}>
          <MockCard design="material" onClick={() => alert('Center Column Clicked!')}>
            Click Me (Center)
          </MockCard>
        </Column>
        <Column span={4}>
          <MockCard design="material" onClick={() => alert('Right Column Clicked!')}>
            Click Me (Right)
          </MockCard>
        </Column>
        
        <Column span={12} newLine>
          <MockCard design="outline" onClick={() => alert('Full Width Action Triggered!')}>
            Full Width Action Button
          </MockCard>
        </Column>
      </Row>
    </Container>
  ),
};