import styles from "./page.module.css";
import { RescueContainer } from "@/views/rescue";

interface RescueProps {
  params: {
    id: string;
  }
}

export default function Rescue(props: RescueProps) {
  const { params: { id }} = props;
  return (
    <div className={[styles.container, styles.cf].join(" ")}>
      <div className={styles.span}>
        <div className={styles.location_indicator}></div>
      </div>
      <RescueContainer id={id} />
    </div>
  );
}
