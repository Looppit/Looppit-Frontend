import { ProfileImage } from '@/shared/ui/profile-image';

interface SettingUserPreviewProps {
  nickname: string;
  imgPath: string | null;
}

export function SettingUserPreview({
  nickname,
  imgPath,
}: SettingUserPreviewProps) {
  return (
    <div className="flex flex-col items-center mt-8 px-6">
      <ProfileImage imageUrl={imgPath} size="small" className="relative mb-4" />
      <div className="flex flex-col gap-1">
        <h3 className="typography-body-bold">{nickname}</h3>
      </div>
    </div>
  );
}
