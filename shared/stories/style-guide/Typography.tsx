interface TypographyTesterProps {
  children: string;
  className?: string;
}

export function Typography({
  children,
  className = '',
}: TypographyTesterProps) {
  return <div className={className}>{children}</div>;
}
