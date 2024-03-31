import styles from "./layout.module.css";

interface CreateLayoutProps {
  children: React.ReactNode;
}

export default function Tracking(props: CreateLayoutProps) {
  const { children } = props;
  return <div className={styles.container}>{children}</div>;
}
