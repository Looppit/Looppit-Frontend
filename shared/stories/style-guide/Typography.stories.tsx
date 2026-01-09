import { Typography } from './Typography';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Style Guide/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Looppit의 타이포그래피 시스템은 **Wanted Sans** 폰트를 기반으로 하며, 명확한 계층 구조와 가독성을 위해 크기와 굵기를 조합한 **6가지 스타일**을 제공합니다.<br/>' +
          '아래에 표시된 텍스트 크기들은 모두 **Tailwind CSS className**으로 사용됩니다.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'select',
      options: [
        'typography-title-lg',
        'typography-medium',
        'typography-body-bold',
        'typography-body-semibold',
        'typography-caption-bold',
        'typography-caption-medium',
      ],
      description: '폰트 굵기를 선택하세요',
    },
    children: {
      control: 'text',
      description: '표시할 텍스트를 입력하세요',
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TitleLarge: Story = {
  args: {
    className: 'typography-title-lg',
    children: 'Title Large',
  },
};

export const TitleMedium: Story = {
  args: {
    className: 'typography-title-medium',
    children: 'Title Medium',
  },
};

export const BodyBold: Story = {
  args: {
    className: 'typography-body-bold',
    children: 'Body Bold',
  },
};

export const BodySemibold: Story = {
  args: {
    className: 'typography-body-semibold',
    children: 'Body Semibold',
  },
};

export const CaptionBold: Story = {
  args: {
    className: 'typography-caption-bold',
    children: 'Caption Bold',
  },
};

export const CaptionMedium: Story = {
  args: {
    className: 'typography-caption-medium',
    children: 'Caption Medium',
  },
};
