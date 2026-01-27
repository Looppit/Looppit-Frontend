type ConditionalRenderProps = {
  when: boolean;
  fallback: React.ReactNode;
  children: React.ReactNode;
};

export const ConditionalRender = ({
  when,
  fallback,
  children,
}: ConditionalRenderProps) => {
  if (!when) return <>{fallback}</>;
  return children;
};
