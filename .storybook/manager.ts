import { addons } from 'storybook/manager-api';
import VectorSigmaTheme from './VectorSigmaTheme';

addons.setConfig({
  theme: VectorSigmaTheme,
});

window.onload = () => {
  const existingIcons = document.querySelectorAll('link[rel*="icon"]');
  existingIcons.forEach((icon) => icon.remove());

  const customFavicon = document.createElement('link');
  customFavicon.rel = 'icon';
  customFavicon.type = 'image/png';
  customFavicon.href = '/me_logo.png?v=2';

  document.head.appendChild(customFavicon);
};