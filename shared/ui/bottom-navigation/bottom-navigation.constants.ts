import { NavItem } from './bottom-navigation.types';

export const NAV_ITEMS: NavItem[] = [
  {
    label: '홈',
    href: '/',
    iconName: 'ic_home',
    activeIconName: 'ic_home_fill',
    strategy: 'exact',
  },
  {
    label: '카테고리',
    href: '/category',
    iconName: 'ic_category',
    activeIconName: 'ic_category_fill',
    strategy: 'prefix',
  },
  {
    label: '더보기',
    href: '/settings',
    iconName: 'ic_more_horiz',
    activeIconName: 'ic_more_horiz',
    strategy: 'prefix',
  },
];
