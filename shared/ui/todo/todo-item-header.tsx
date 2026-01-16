import { Icon } from '@/shared/ui/icon';
import { IconButton } from '@/shared/ui/icon-button';
import { Progress } from '@/shared/ui/progress';
import { getGradient } from '@/shared/utils';

interface TodoItemHeaderProps {
  /** 투두 카테고리 제목 */
  title: string;
  /** 투두 카테고리 색상 */
  color: string;
  /** 카테고리 전체 갯수 */
  totalCount: number;
  /** 카테고리 투두 중 완료한 투두 갯수 */
  completedCount: number;
  /** 타이틀 클릭시 실행 될 함수 */
  onTitleClick?: () => void;
  /** 추가 버튼 클릭시 실행 될 함수 */
  onAddClick?: () => void;
}

const TodoItemHeader = ({
  title,
  color,
  completedCount,
  totalCount,
  onTitleClick,
  onAddClick,
}: TodoItemHeaderProps) => {
  return (
    <>
      <div className="flex items-center justify-between mb-2 w-full">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div
            className="size-[22px] rounded-lg flex items-center justify-center text-white"
            style={{
              background: getGradient(color),
            }}
          >
            <Icon icon="ic_delete" size="14" className="fill-current" />
          </div>
          <strong
            className="typography-title-medium tracking-tight flex-1 min-w-0"
            onClick={onTitleClick}
          >
            <span className="w-full truncate block">{title}</span>
          </strong>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="typography-caption-bold text-secondary/70">
            {completedCount} / {totalCount}
          </span>
          <IconButton
            size="28"
            icon="ic_add"
            iconClassName="fill-current"
            style={{
              borderColor: `${color}40`,
              color,
            }}
            onClick={onAddClick}
          />
        </div>
      </div>
      <Progress value={30} bgColor={getGradient(color)} />
    </>
  );
};

export { TodoItemHeader };
export type { TodoItemHeaderProps };
