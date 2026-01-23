import Image from 'next/image';

import { Icon } from '@/shared/ui/icon';

function ProfileStep() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-6">
      <div className="relative mb-10 group cursor-pointer">
        <div className="w-[108px] h-[108px] rounded-full overflow-hidden border-2 border-primary/20 shadow-xl flex items-center justify-center">
          <Image
            width={128}
            height={128}
            className="w-full h-full object-cover"
            alt="Profile"
            src="/login-logo.png"
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
