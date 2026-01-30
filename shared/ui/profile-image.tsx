import Image from 'next/image';

import { cn } from '../utils';

interface ProfileImageProps {
  imageUrl: string | null;
  size?: 'small' | 'medium' | 'large' | number;
  className?: string;
  onClick?: () => void;
}

const SIZE_MAP = {
  small: 80,
  medium: 108,
  large: 128,
};

export function ProfileImage({
  imageUrl,
  size = 'medium',
  className,
  onClick,
}: ProfileImageProps) {
  const sizeValue = typeof size === 'number' ? size : SIZE_MAP[size];

  return (
    <div
      style={{ width: sizeValue, height: sizeValue }}
      className={cn(
        'rounded-full overflow-hidden border-2 border-primary/20 shadow-xl flex items-center justify-center',
        className,
      )}
      onClick={onClick}
    >
      <Image
        width={sizeValue}
        height={sizeValue}
        className="w-full h-full object-cover"
        alt="Profile"
        src={imageUrl ?? '/default-image.png'}
      />
    </div>
  );
}
