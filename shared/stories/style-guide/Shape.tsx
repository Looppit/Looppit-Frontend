interface ShapeTesterProps {
  className?: string;
  children?: React.ReactNode;
}

export function Shape({ className = '', children }: ShapeTesterProps) {
  return (
    <div
      className={`border border-slate-200 p-6 text-caption-bold ${className}`}
    >
      {children || <div>Shape Preview</div>}
    </div>
  );
}
