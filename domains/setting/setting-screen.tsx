import { SETTING_GROUP_LIST } from './constants';
import { SettingGroup, SettingHeader, SettingUserPreview } from './ui';
import { useGetUser } from '../user/hooks';

export function SettingScreen() {
  const { data: user } = useGetUser();

  return (
    <div>
      <SettingHeader title="마이페이지" hideBackButton href="/" />
      <SettingUserPreview
        nickname={user?.nickname ?? ''}
        imgPath={user?.imgPath ?? null}
      />
      <div className="flex flex-col px-6 pt-8 gap-4 flex-1">
        {Object.entries(SETTING_GROUP_LIST).map(([key, value]) => (
          <SettingGroup
            key={key}
            label={value.label}
            childrens={value.childrens}
          />
        ))}
      </div>
    </div>
  );
}
