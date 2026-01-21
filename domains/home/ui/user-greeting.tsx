import Image from 'next/image';

type UserGreetingProps = {
  name: string;
  profileImage: string;
};

export const UserGreeting = ({ name, profileImage }: UserGreetingProps) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3.5">
        <button className="size-9 rounded-full overflow-hidden border border-white/10 active:scale-95 transition-transform">
          <Image
            className="w-full h-full object-cover"
            alt="Avatar"
            src={profileImage}
            unoptimized
            width={36}
            height={36}
          />
        </button>
        <div>
          <h1 className="typography-title-medium">{name}님, 오늘도 반가워요</h1>
          <p className="text-secondary/80 typography-caption-medium">
            작은 성취가 모여 큰 변화를 만들어요
          </p>
        </div>
      </div>
    </div>
  );
};
