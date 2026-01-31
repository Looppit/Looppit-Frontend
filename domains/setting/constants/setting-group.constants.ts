import { IconName } from '@/shared/ui/icon';

export type SettingGroup = {
  label: string;
  childrens: {
    label: string;
    href: string;
    icon: {
      name: IconName;
      noneFill?: boolean;
    };
  }[];
};

export const SETTING_GROUP_LIST: Record<string, SettingGroup> = {
  account: {
    label: '계정',
    childrens: [
      {
        label: '계정 관리',
        href: '/setting/account',
        icon: {
          name: 'ic_user_cog',
          noneFill: true,
        },
      },
    ],
  },
  information: {
    label: '정보',
    childrens: [
      {
        label: '앱 정보',
        href: '/setting/information',
        icon: {
          name: 'ic_info',
        },
      },
      {
        label: '도움말 및 지원',
        href: '/setting/help',
        icon: {
          name: 'ic_help',
        },
      },
    ],
  },
};
