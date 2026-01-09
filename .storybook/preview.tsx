import { wantedSans } from '../shared/assets/fonts';

import type { Preview } from '@storybook/nextjs';

import '../app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <div className={`${wantedSans.variable} font-wanted-sans antialiased`}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default preview;
