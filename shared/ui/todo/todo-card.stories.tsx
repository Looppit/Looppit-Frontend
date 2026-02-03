import { Container } from '@/shared/stories/components';
import SwipeableContainer from '@/shared/ui/swipeable-container';
import { TodoCard } from '@/shared/ui/todo/todo-card';
import { getGradient } from '@/shared/utils';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Components/TodoCard',
  component: TodoCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Looppit의 TodoCard 컴포넌트는 카테고리별 할 일 목록을 표시하는 카드입니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof TodoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <TodoCard>
        <TodoCard.Header
          title="업무"
          color="#2563eb"
          icon="ic_book"
          onTitleClick={() => {}}
          onAddClick={() => {}}
        />
        <TodoCard.Progress value={66.7} bgColor={getGradient('#2563eb')} />
        <TodoCard.ItemGroup>
          <SwipeableContainer
            actions={
              <TodoCard.ActionButton
                onOpenTodoActions={() => {}}
                onDeleteTodo={() => {}}
              />
            }
          >
            <TodoCard.Item
              label="클라이언트 메일 회신하기"
              isChecked={true}
              categoryColor="#2563eb"
              onCheckedChange={(checked) => console.log(checked)}
              onLabelClick={() => {}}
            />
          </SwipeableContainer>
          <SwipeableContainer
            actions={
              <TodoCard.ActionButton
                onOpenTodoActions={() => {}}
                onDeleteTodo={() => {}}
              />
            }
          >
            <TodoCard.Item
              label="프로젝트 문서 작성하기 (Task 1, Task 2, Task 3, Task 4)"
              isChecked={false}
              categoryColor="#2563eb"
              onCheckedChange={(checked) => console.log(checked)}
              onLabelClick={() => {}}
            />
          </SwipeableContainer>
        </TodoCard.ItemGroup>
      </TodoCard>
    </>
  ),
};
