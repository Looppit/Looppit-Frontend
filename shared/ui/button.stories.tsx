import { Container, createHiddenArgs } from '@/shared/stories/components';
import { Button } from '@/shared/ui/button';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Looppit의 Button 컴포넌트는 **4가지 variant**를 제공합니다. (default, secondary, destructive, outline)<br/>' +
          'outline variant는 **OutlineIcon**을 사용하여 아이콘과 함께 표시할 수 있습니다.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: '버튼에 표시할 텍스트',
    },
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: '버튼 스타일을 선택하세요',
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['title', 'body'],
      description: '글씨 크기를 선택하세요',
      table: { defaultValue: { summary: 'title' } },
    },
    align: {
      control: 'select',
      options: ['center', 'start'],
      description: '내용 정렬을 선택하세요',
      table: { defaultValue: { summary: 'center' } },
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
      table: { defaultValue: { summary: 'false' } },
    },
    ...createHiddenArgs(Button, ['asChild', 'type']),
  },
  args: {
    children: '버튼',
    variant: 'default',
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '저장하기',
  },
};

export const Secondary: Story = {
  args: {
    children: '돌아가기',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: '삭제하기',
    variant: 'destructive',
  },
};

export const OutlineWithIcon: Story = {
  render: () => (
    <>
      <Button variant="outline" size="body" align="start">
        <Button.OutlineIcon
          icon="ic_schedule"
          bgColor="bg-green-500/15"
          iconClassName="fill-green-400"
        />
        내일로 미루기
      </Button>
    </>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button>저장하기</Button>
      <Button variant="secondary">돌아가기</Button>
      <Button variant="destructive">삭제하기</Button>
      <Button variant="outline" size="body" align="start">
        <Button.OutlineIcon
          icon="ic_edit"
          bgColor="bg-gray-500/15"
          iconClassName="fill-gray-400"
        />
        수정하기
      </Button>
      <Button variant="outline" size="body" align="start">
        <Button.OutlineIcon
          icon="ic_schedule"
          bgColor="bg-green-500/15"
          iconClassName="fill-green-400"
        />
        내일로 미루기
      </Button>
      <Button variant="outline" size="body" align="start">
        <Button.OutlineIcon
          icon="ic_delete"
          bgColor="bg-destructive/10"
          iconClassName="fill-destructive"
        />
        삭제하기
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button disabled>저장하기</Button>
      <Button variant="secondary" disabled>
        돌아가기
      </Button>
      <Button variant="destructive" disabled>
        삭제하기
      </Button>
    </div>
  ),
};
