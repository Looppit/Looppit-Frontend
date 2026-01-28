interface TodoCalendarCompletedDotsProps {
  colors: { color: string; id: string }[];
}

export function TodoCalendarCompletedDots({
  colors,
}: TodoCalendarCompletedDotsProps) {
  return (
    <div className="h-1 max-w-6 flex flex-wrap items-center justify-center gap-[2px]">
      {colors.map((color) => (
        <div
          key={color.id}
          className="w-[3px] h-[3px] rounded-full"
          style={{ backgroundColor: color.color }}
        ></div>
      ))}
    </div>
  );
}
