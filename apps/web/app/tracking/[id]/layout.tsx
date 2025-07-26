interface TrackingLayoutProps {
  children: React.ReactNode;
}

export default function Tracking(props: TrackingLayoutProps) {
  const { children } = props;
  return <div className="w-full max-w-4xl mx-auto p-4">{children}</div>;
}