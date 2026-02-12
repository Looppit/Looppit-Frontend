export const FEEDBACK_FORM_ID = 'improvement_survey';

export const FEEDBACK_SUCCESS_MESSAGE = '피드백을 보내주셔서 감사합니다! 🫶🏻';

const FEEDBACK_STEPS_DATA = {
  reason: {
    step: 1,
    title: '루핏을 사용하시는 가장 큰 이유는 무엇인가요? (선택)',
    description: '예) 일정관리 / 업무정리 / 습관형성 등',
  },
  moment: {
    step: 2,
    title:
      '루핏을 사용하면서 "괜찮다" 또는 "별로다"라고 느낀 순간이 있었나요? (선택)',
    description:
      '예) 습관 형성을 위한 응원의 메세지가 좋았어요!, 반복 기능이 없어서 아쉬웠어요 🥹',
  },
  neededFeature: {
    step: 3,
    title: '루핏을 꾸준히 사용하기 위해 어떤 기능이 가장 필요할까요? (선택)',
  },
  message: {
    step: 4,
    title: '루핏에게 하고 싶은 말이 있으신가요? (선택)',
  },
} as const;

export type FeedbackStep = keyof typeof FEEDBACK_STEPS_DATA;

export const FEEDBACK_STEPS_INFO: Record<
  FeedbackStep,
  { step: number; title: string; description?: string }
> = FEEDBACK_STEPS_DATA;

export const FEEDBACK_STEPS = Object.keys(
  FEEDBACK_STEPS_INFO,
) as FeedbackStep[];
