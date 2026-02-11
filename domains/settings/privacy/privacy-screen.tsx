'use client';

import { useRouter } from 'next/navigation';

import { DetailHeader } from '@/shared/ui/detail-header';

import {
  PRIVACY_POLICY_LAST_UPDATED,
  PRIVACY_POLICY_SECTIONS,
  PRIVACY_POLICY_VERSION,
} from './constants/privacy.constants';

export function PrivacyScreen() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <DetailHeader
        title="개인정보처리방침"
        onLeftClick={() => router.back()}
      />
      <main className="px-6 py-6 pb-16 typography-body-semibold">
        <p className="text-grey500 mb-8">
          버전 {PRIVACY_POLICY_VERSION} · 시행일: {PRIVACY_POLICY_LAST_UPDATED}
        </p>
        <div className="flex flex-col gap-8">
          {PRIVACY_POLICY_SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-grey0 mb-3">{section.title}</h2>
              <p className="text-grey300 whitespace-pre-line leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
