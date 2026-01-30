import { SETTING_GROUP_LIST } from './setting.constants';
import { useGetUser } from '../user/hooks';
import { SettingGroup } from './ui/setting-group';
import { SettingHeader } from './ui/setting-header';
import { SettingUserPreview } from './ui/setting-user-preview';

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
