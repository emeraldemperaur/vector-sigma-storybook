import React from 'react';
import type { Preview } from '@storybook/react'; 
import { Theme } from '@radix-ui/themes';
import { Formik } from 'formik'; 
import '@radix-ui/themes/styles.css'; 
import { Container } from '../src/components/layouts/container/container';
import { Row } from '../src/components/layouts/row/row';


const preview: Preview = {
  parameters: {
    layout: 'fullscreen', 
  },
  
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'dark', 
      toolbar: {
        title: 'Theme',
        icon: 'mirror', 
        items: [
          { value: 'light', title: 'Light Mode', icon: 'sun' },
          { value: 'dark', title: 'Dark Mode', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const currentTheme = context.globals.theme || 'dark';
      const isDark = currentTheme === 'dark';
      const isFullscreen = context.parameters.layout === 'fullscreen';

      return (
        <Container>
        <Theme appearance={currentTheme} accentColor="ruby" radius="large">
          <div 
            style={{ 
              backgroundColor: isDark ? '#121212' : '#f8f9fa',
              color: isDark ? '#ffffff' : '#212529',
              minHeight: '100vh',
              padding: isFullscreen ? '0px' : '16px',    
              boxSizing: 'border-box',
              transition: 'background-color 0.3s ease, color 0.3s ease'
            }}
          >
            <Formik
              initialValues={{}} 
              onSubmit={(values) => {
                console.log('Storybook Formik Submit:', values);
              }}
            >
              {() => (
                <Story />
              )}
            </Formik>
          </div>
        </Theme>
        </Container>
      );
    },
  ],
};

export default preview;