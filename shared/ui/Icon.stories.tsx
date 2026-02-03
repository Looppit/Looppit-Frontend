import { allIcons, Icon, IconProps, type IconSize } from '@/shared/ui/icon';

import type { Meta, StoryObj } from '@storybook/nextjs';

const ICON_SIZES: IconSize[] = ['12', '14', '16', '18', '20', '24', '30', '36'];

const allIconKeys = Object.keys(allIcons) as IconProps['icon'][];

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Looppit의 Icon 컴포넌트는 **svg 아이콘 파일의 이름**을 받아 컴포넌트로 출력합니다.<br/>' +
          '색상은 **className**을 통해 직접 스타일링할 수 있습니다.',
      },
    },
  },
  argTypes: {
    icon: {
      control: 'select',
      options: allIconKeys,
      description: '표시할 아이콘을 선택하세요',
    },
    size: {
      control: 'select',
      options: ICON_SIZES,
      description: '아이콘 크기 (기본값: 24)',
    },
    className: {
      control: 'text',
      description: '아이콘 스타일링을 위한 className',
    },
  },
  args: {
    icon: 'ic_home',
    size: '24',
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'ic_home',
    size: '24',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {ICON_SIZES.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon icon="ic_home" size={size} />
          <span className="text-xs">{size}px</span>
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <Icon icon="ic_home_fill" size="24" className="fill-primary" />
          <Icon icon="ic_home_fill" size="24" className="fill-secondary" />
          <Icon icon="ic_home_fill" size="24" className="fill-positive" />
          <Icon icon="ic_home_fill" size="24" className="fill-action" />
          <Icon icon="ic_home_fill" size="24" className="fill-destructive" />
        </div>
      </div>
    </div>
  ),
};

export const Gallery: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-6 gap-6 p-4">
        {allIconKeys.map((iconName) => (
          <div
            key={iconName}
            className="flex flex-col items-center gap-2 p-4 border border-slate-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Icon icon={iconName} size="24" />
            <span className="text-xs text-center text-gray-500 break-all">
              {iconName}
            </span>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};
