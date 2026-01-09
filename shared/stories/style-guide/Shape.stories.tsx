import { Shape } from './Shape';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Style Guide/Shape',
  component: Shape,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Looppit의 Shape 시스템은 **일관된 모서리 반경**을 제공하여 UI 요소의 시각적 일관성을 유지합니다.<br/>' +
          '아래에 표시된 border-radius 값들은 모두 **Tailwind CSS className**으로 사용됩니다.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'select',
      options: ['rounded-small', 'rounded-medium', 'rounded-large'],
      description: '모서리 반경을 선택하세요',
    },
    children: {
      control: 'text',
      description: '카드 내부에 표시할 내용을 입력하세요',
    },
  },
  args: {
    children: 'Shape Preview',
  },
} satisfies Meta<typeof Shape>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    className: 'rounded-small',
    children: 'rounded-[12px]',
  },
};

export const Medium: Story = {
  args: {
    className: 'rounded-medium',
    children: 'rounded-[24px]',
  },
};

export const Large: Story = {
  args: {
    className: 'rounded-large',
    children: 'rounded-[32px]',
  },
};
