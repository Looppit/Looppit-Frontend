import { Container, createHiddenArgs } from '@/shared/stories/components';
import { Input } from '@/shared/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shared/ui/input-group';
import { Label } from '@/shared/ui/label';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Components/Input & Input Group',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Looppit의 Input 컴포넌트는 **shadcn UI의 Input 컴포넌트를 기반**으로 합니다. ' +
          '**Input Group**의 사용법은 [shadcn UI Input Group 문서](https://ui.shadcn.com/docs/components/input-group)를 참조하세요.<br/>' +
          'disabled 또는 readOnly일 때 disabled 스타일이 적용됩니다.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password'],
      description: '입력 필드 타입',
      table: { defaultValue: { summary: 'text' } },
    },
    value: {
      control: 'text',
      description: '입력 필드의 값',
      name: 'value',
    },
    disabled: {
      control: 'boolean',
      description: '입력 필드 비활성화 여부',
      table: { defaultValue: { summary: 'false' } },
    },
    ...createHiddenArgs(Input, [
      'readOnly',
      'defaultValue',
      'placeholder',
      'variant',
    ]),
  },
  args: {
    placeholder: '이름을 입력하세요',
    type: 'text',
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '이름을 입력하세요',
    defaultValue: 'Alex',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Label>Active</Label>
      <Input placeholder="이름을 입력하세요" value="Alex" />

      <Label>Readonly</Label>
      <Input
        placeholder="이메일 정보가 없습니다"
        value="user@example.com"
        readOnly
      />
    </div>
  ),
};

export const WithDifferentTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Label>닉네임</Label>
      <Input type="text" placeholder="텍스트 입력" defaultValue="Alex" />

      <Label>비밀번호</Label>
      <Input
        type="password"
        placeholder="비밀번호 입력"
        defaultValue="12345678"
      />

      <Label>인증번호</Label>
      <Input type="number" placeholder="숫자 입력" defaultValue="123456" />
    </div>
  ),
};

export const WithInputGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Label>이메일</Label>
      <InputGroup>
        <InputGroupInput
          type="email"
          placeholder="이메일 입력"
          defaultValue="example@example.com"
        />
        <InputGroupAddon align="inline-end">
          <span className="typography-caption-bold text-secondary/60">
            인증번호 전송
          </span>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};
