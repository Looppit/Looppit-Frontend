'use client';

import { useEffect, useMemo, useRef } from 'react';

import Image from 'next/image';

import { toast } from 'sonner';

import { ASSET_URL } from '@/shared/constants';
import { cn, getImageFileValidatorError } from '@/shared/utils';

import { IconButton } from '../icon-button';

type InputProfileImageProps = {
  imageFile: string | null | File;
  onFileChange: (file?: File) => void;
  className?: string;
};

export function InputProfileImage({
  imageFile,
  onFileChange,
  className,
}: InputProfileImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageUrl = useMemo(() => {
    if (!imageFile) return null;
    if (imageFile instanceof File) {
      return URL.createObjectURL(imageFile);
    }
    return imageFile;
  }, [imageFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const error = getImageFileValidatorError(file);
    if (error) {
      toast.error(error);
      return;
    }

    onFileChange(file);
  };

  /**
   * 이미지 URL이 blob URL인 경우 메모리 누수 방지용 코드
   * 이전 이미지 URL을 참조하는 객체가 없어지면 메모리 누수가 발생할 수 있음
   */
  useEffect(() => {
    const url = imageUrl;
    return () => {
      if (url && url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    };
  }, [imageUrl]);

  return (
    <div
      className={cn(
        'flex-1 flex flex-col items-center justify-center',
        className,
      )}
    >
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
            src={imageUrl ?? ASSET_URL.DEFAULT_IMAGE}
          />
        </div>
        <IconButton
          icon="ic_edit"
          size="28"
          iconClassName="fill-white w-4 h-4"
          className="absolute bottom-1 right-1 bg-[#1E182A]"
        />
      </div>
    </div>
  );
}
