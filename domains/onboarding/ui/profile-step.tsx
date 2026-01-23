import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import Image from 'next/image';

import { toast } from 'sonner';

import { Icon } from '@/shared/ui/icon';
import { isImageFile } from '@/shared/utils';

import { OnboardingFormValues } from '../onboarding.types';

function ProfileStep() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { setValue, watch } = useFormContext<OnboardingFormValues>();
  const profileImage = watch('profileImage');

  const imageUrl = (() => {
    if (!profileImage) return '/login-logo.png';
    if (profileImage instanceof File) {
      return URL.createObjectURL(profileImage);
    }
    return profileImage;
  })();

  /**
   * 이미지 URL이 blob URL인 경우 메모리 누수 방지용 코드
   * 이전 이미지 URL을 참조하는 객체가 없어지면 메모리 누수가 발생할 수 있음
   */
  useEffect(() => {
    const url = imageUrl;
    return () => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    };
  }, [imageUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isImageFile(file)) {
      setValue('profileImage', file);
    } else {
      toast.error('이미지 파일만 업로드할 수 있습니다.');
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-6">
      <div className="relative mb-10 group cursor-pointer">
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <div
          onClick={() => inputRef.current?.click()}
          className="w-[108px] h-[108px] rounded-full overflow-hidden border-2 border-primary/20 shadow-xl flex items-center justify-center"
        >
          <Image
            width={128}
            height={128}
            className="w-full h-full object-cover"
            alt="Profile"
            src={imageUrl}
          />
        </div>
        <button className="absolute bottom-1 right-1 w-8 h-8 bg-[#1E182A] border border-white/10 rounded-full flex items-center justify-center text-white shadow-lg active:scale-90 transition-all">
          <Icon icon="ic_edit" className="w-4 h-4 fill-white" />
        </button>
      </div>
    </div>
  );
}

export { ProfileStep };
