import styles from "./page.module.css";
import type { Metadata } from "next";
import { RescueContainer } from "@/views/rescue";

export const metadata: Metadata = {
  title: "긴급구조 위치 공유",
  description: "구조대원에게 위치를 공유하세요.",
  metadataBase: new URL("https://rescue.clev.app"),
};

export const fetchCache = "force-no-store";
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
