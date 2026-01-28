import { useState } from 'react';

import { Container } from '@/shared/stories/components';

import { Calendar } from './calendar';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Looppit의 Calendar 컴포넌트는 캘린더를 표시합니다.' +
          'type에 따라 주단위 캘린더인 **WeeklyCalendar**와 월단위 캘린더인 **MonthlyCalendar** 컴포넌트를 제공합니다.' +
          '현재 프로젝트 기획에 따라 캘린더의 모드를 single로 제한시켜 놓은 상태입니다.',
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
} satisfies Meta<typeof Calendar> as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: 'single',
    required: true,
    type: 'weekly',
    selected: new Date(),
    onSelect: () => {},
  },
};

export const Weekly: Story = {
  render: function Weekly() {
    const [selected, setSelected] = useState<Date>(new Date());
    return (
      <Calendar
        mode="single"
        required
        type="weekly"
        selected={selected}
        onSelect={(date) => setSelected(date as Date)}
      />
    );
  },
};

export const Monthly: Story = {
  render: function Monthly() {
    const [selected, setSelected] = useState<Date>(new Date());
    return (
      <Calendar
        mode="single"
        required
        type="monthly"
        selected={selected}
        onSelect={(date) => setSelected(date as Date)}
      />
    );
  },
};
