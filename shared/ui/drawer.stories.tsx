import { createHiddenArgs } from '@/shared/stories/components';

import { Button } from './button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Looppit의 Drawer 컴포넌트는 **shadcn UI의 Drawer 컴포넌트를 기반**으로 합니다. ' +
          '**Drawer**의 사용법은 [shadcn UI Drawer 문서](https://ui.shadcn.com/docs/components/drawer)를 참조하세요.<br/>' +
          '`DrawerHeader`, `DrawerTitle`, `DrawerDescription`는 미 사용시 에러가 발생하며, `className="sr-only"`로 숨길 수 있습니다.',
      },
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: '바텀시트 방향 설정',
    },
    ...createHiddenArgs(Drawer, ['open', 'onOpenChange']),
  },
  args: {
    direction: 'bottom',
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <>
        <Drawer>
          <DrawerTrigger>
            <Button>Open</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>제목</DrawerTitle>
              <DrawerDescription />
            </DrawerHeader>
            <DrawerClose>닫기</DrawerClose>
          </DrawerContent>
        </Drawer>
      </>
    );
  },
};
