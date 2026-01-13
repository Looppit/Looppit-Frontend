import { Container, createHiddenArgs } from '@/shared/stories/components';
import { Chip } from '@/shared/ui/chip';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Looppit의 Chip 컴포넌트는 **2가지 variant**와 **2가지 size**를 제공합니다.<br/>' +
          '`themeColor`를 사용하여 테마 색상을 설정할 수 있습니다.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: '칩에 표시할 텍스트',
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost'],
      description: '칩 스타일을 선택하세요',
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: '칩 크기를 선택하세요',
      table: { defaultValue: { summary: 'sm' } },
    },
    themeColor: {
      control: 'color',
      description: '변경할 테마 색상 (pure css)',
    },
    ...createHiddenArgs(Chip, ['asChild', 'className']),
  },
  args: {
    children: '미팅하기',
    variant: 'default',
    size: 'sm',
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '미팅하기',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Chip size="sm">sm</Chip>
      <Chip size="md">md</Chip>
    </div>
  ),
};

const className = 'size-2 rounded-full shrink-0 mb-[2px]';

export const CategoryChips: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-2 gap-3 w-full">
        <Chip themeColor="#A855F7">
          <span className={className} style={{ backgroundColor: '#A855F7' }} />
          <span>커리어 및 업무</span>
        </Chip>

        <Chip themeColor="#10B981">
          <span className={className} style={{ backgroundColor: '#10B981' }} />
          <span>건강 및 활력</span>
        </Chip>

        <Chip themeColor="#06B6D4">
          <span className={className} style={{ backgroundColor: '#06B6D4' }} />
          <span>자기 계발</span>
        </Chip>

        <Chip themeColor="#FF6B35">
          <span className={className} style={{ backgroundColor: '#FF6B35' }} />
          <span>학업 및 연구</span>
        </Chip>
      </div>
    );
  },
};
