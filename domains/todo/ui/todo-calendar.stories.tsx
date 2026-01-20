

import { Container } from '@/shared/stories/components';

import { TodoCalendar } from './todo-calendar';

import type { Meta, StoryObj } from '@storybook/nextjs';

type StorybookTodoCalendarProps = {
  type: 'weekly' | 'monthly';
  completedColors: { color: string; id: string }[];
  selected: Date;
  onSelect: (date: Date) => void;
};

const meta = {
  title: 'Components/TodoCalendar',
  component: TodoCalendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Looppit의 Calendar 컴포넌트는 캘린더를 표시합니다.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['weekly', 'monthly'],
      description: '캘린더 타입을 선택하세요',
      table: {
        defaultValue: { summary: 'weekly' },
      },
    },
    selected: {
      control: 'date',
      description: '선택된 날짜를 설정하세요',
      table: {
        defaultValue: { summary: new Date().toISOString() },
      },
    },
    onSelect: {
      action: 'select',
      description: '날짜 선택 시 호출되는 핸들러',
      table: {
        type: { summary: '(date: Date) => void' },
      },
    },
  },
  args: {
    type: 'weekly',
    selected: new Date(),
    onSelect: () => {},
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<StorybookTodoCalendarProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: 'single',
    required: true,
    type: 'weekly',
    selected: new Date(),
    onSelect: () => {},
    completedColors: [{ color: 'rgb(139, 92, 246)', id: '1' }, { color: 'rgb(239, 68, 68)', id: '2' }, { color: 'rgb(234, 179, 8)', id: '3' }, { color: 'rgb(34, 197, 94)', id: '4' }, { color: 'rgb(59, 130, 246)', id: '5' }, { color: 'rgb(16, 185, 129)', id: '6' }, { color: 'rgb(229, 231, 235)', id: '7' }],
  },
};
