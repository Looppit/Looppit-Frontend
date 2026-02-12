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
        href: '/settings/account',
        icon: {
          name: 'ic_user_cog',
          noneFill: true,
        },
      },
    ],
  },
  feedback: {
    label: '고객 지원',
    childrens: [
      {
        label: '앱 개선 제안',
        href: '/settings/feedback',
        icon: {
          name: 'ic_info',
        },
      },
      {
        label: '1:1 문의하기',
        href: '/settings/help',
        icon: {
          name: 'ic_help',
        },
      },
      {
        label: '개인정보처리방침',
        href: '/privacy',
        icon: {
          name: 'ic_info',
        },
      },
    ],
  },
};
