import { Container, createHiddenArgs } from '@/shared/stories/components';
import { Skeleton } from '@/shared/ui/skeleton';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '로딩 상태를 표시하는 스켈레톤 컴포넌트입니다. 다양한 크기와 variant를 지원합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default'],
      description: '스켈레톤 배경 색상 variant',
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: '스켈레톤 높이 크기',
      table: { defaultValue: { summary: 'md' } },
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
    ...createHiddenArgs(Skeleton, ['data-slot']),
  },
  args: {
    variant: 'default',
    size: 'md',
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'w-64',
  },
};

export const Sizes: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-4 w-64">
        <Skeleton size="sm" />
        <Skeleton size="md" />
        <Skeleton size="lg" />
        <Skeleton size="xl" />
      </div>
    </>
  ),
};

export const Variants: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-4 w-64">
        <Skeleton variant="default" />
      </div>
    </>
  ),
};

export const TextSkeleton: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-3 w-64">
        <Skeleton className="w-3/4 h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-5/6 h-4" />
      </div>
    </>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-4 w-80 p-4 bg-card rounded-small border border-white/5">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="w-3/4 h-4" />
            <Skeleton className="w-1/2 h-3" />
          </div>
        </div>
        <Skeleton className="w-full h-20" />
        <div className="flex gap-2">
          <Skeleton className="w-16 h-6 rounded-full" />
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>
      </div>
    </>
  ),
};
