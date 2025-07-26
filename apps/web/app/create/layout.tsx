interface CreateLayoutProps {
  children: React.ReactNode;
}

export default function Create(props: CreateLayoutProps) {
  const { children } = props;
  return <div className="w-full max-w-md mx-auto">{children}</div>;
}