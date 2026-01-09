import { useState } from 'react';

import { Container, createHiddenArgs } from '@/shared/stories/components';
import { TodoItem } from '@/shared/ui/todo-item';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Components/TodoItem',
  component: TodoItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Looppit의 TodoItem 컴포넌트는 체크박스와 라벨을 포함한 할 일 항목을 표시합니다.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: '할 일 항목의 라벨',
      table: {
        required: true,
        type: { summary: 'string' },
      },
    },
    isChecked: {
      control: 'boolean',
      description: '체크박스 체크 상태',
      table: {
        required: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onCheckedChange: {
      action: 'checked-change',
      description: '체크박스 상태 변경 핸들러',
      table: {
        type: { summary: '(checked: boolean) => void' },
      },
    },
    onLabelClick: {
      action: 'label-click',
      description: '라벨 클릭 핸들러',
      table: {
        type: { summary: 'React.MouseEventHandler<HTMLDivElement>' },
      },
    },
    ...createHiddenArgs(TodoItem, ['className']),
  },
  args: {
    label: '할 일 항목',
    isChecked: false,
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof TodoItem>;

export default meta;
type Story = StoryObj<typeof meta>;

function InteractiveTodoItem({
  initialChecked = false,
  label,
}: {
  initialChecked?: boolean;
  label: string;
}) {
  const [isChecked, setIsChecked] = useState(initialChecked);
  return (
    <TodoItem
      label={label}
      isChecked={isChecked}
      onCheckedChange={setIsChecked}
      onLabelClick={() => console.log('라벨 클릭됨')}
    />
  );
}

export const Default: Story = {
  args: {
    label: '클라이언트 메일 회신하기',
    isChecked: false,
  },
};

export const Checked: Story = {
  render: () => (
    <InteractiveTodoItem label="완료된 할 일 항목" initialChecked={true} />
  ),
};

export const LongLabel: Story = {
  render: () => (
    <InteractiveTodoItem label="매우 긴 라벨 텍스트가 있는 할 일 항목입니다. 이 텍스트는 여러 줄로 표시될 수 있습니다." />
  ),
};
