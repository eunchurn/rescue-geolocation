"use client";

import styles from "./card.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updatedLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/ko";
import { convertDDtoDMS } from "@/shared";
import React from "react";

dayjs.extend(relativeTime);
dayjs.extend(updatedLocale);
dayjs.locale("ko");

interface TooltipProps extends React.HTMLProps<HTMLDivElement> {
  datatooltip?: string;
}

function Tooltip(props: TooltipProps) {
  return <div {...props} />;
}

type PresentationType = "dms" | "dm";

interface CardProps {
  createdAt: Date;
  presentationType: PresentationType;
  data: {
    latDeg: number;
    latMin: number;
    latSec?: number;
    lonDeg: number;
    lonMin: number;
    lonSec?: number;
  };
  isLatest: boolean;
}

export function TrackingCard(props: CardProps) {
  const {
    createdAt,
    data: { latDeg, latMin, latSec, lonDeg, lonMin, lonSec },
    isLatest,
  } = props;
  return (
    <React.Fragment>
      <li className={styles.item}>
        <div className={styles.task}>
          <div className={styles.icon}></div>
          <Tooltip
            className={styles.name}
            datatooltip={dayjs(createdAt).toString()}
          >
            {dayjs(createdAt).fromNow()}
          </Tooltip>
        </div>

        <div className={styles.geolocation}>
          <div className={styles.bar}>
            <div className={styles.chip}>위도</div>
            <div>
              <span className={styles.degree}>{latDeg}</span>
              <span className={styles.minute}>{latMin}</span>
              {latSec ? <span className={styles.second}>{latSec}</span> : null}
            </div>
          </div>
          <div className={styles.bar}>
            <div className={styles.chip}>경도</div>
            <div>
              <span className={styles.degree}>{lonDeg}</span>
              <span className={styles.minute}>{lonMin}</span>
              {lonSec ? <span className={styles.second}>{lonSec}</span> : null}
            </div>
          </div>
        </div>
      </li>
      {isLatest ? (
        <div className={styles.helpContainer}>
          <div className={styles.help}></div>
        </div>
      ) : null}
    </React.Fragment>
  );
}
