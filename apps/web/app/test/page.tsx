import styles from "./page.module.css";

export default function Test() {
  return (
    <div className={[styles.container, styles.cf].join(" ")}>
      <div className={styles.span}>
        <div className={styles.location_indicator}></div>
      </div>
    </div>
  );
}
