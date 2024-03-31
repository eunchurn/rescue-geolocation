import styles from "./layout.module.css";

interface CreateLayoutProps {
  children: React.ReactNode;
}

export default function Create(props: CreateLayoutProps) {
  const { children } = props;
  // console.log(nanoid(6));
  return <div className={styles.container}>{children}</div>;
}
