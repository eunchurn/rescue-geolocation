"use client";

import { GeoLocation } from "@rescue/prisma";
import styles from "./tracking.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updatedLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/ko";
import { convertDDtoDMS } from "@/shared";
import React from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/hooks";
import { Button, Snackbar } from "@/components";

dayjs.extend(relativeTime);
dayjs.extend(updatedLocale);
dayjs.locale("ko");

interface TooltipProps extends React.HTMLProps<HTMLDivElement> {
  datatooltip?: string;
}

function Tooltip(props: TooltipProps) {
  return <div {...props} />;
}

function Waiting() {
  return (
    <div className={styles.waiting}>
      <div className={styles.helpContainer}>
        <div className={styles.timer}></div>
      </div>
      <div className={styles.waitingText}>위치정보를 기다리는 중입니다.</div>
    </div>
  );
}

interface TrackingProps {
  id: string;
  data: GeoLocation[];
  link: string;
}

export function Tracking(props: TrackingProps) {
  const { id, data, link } = props;
  const param = new URLSearchParams({ id });
  const [state, setState] = React.useState(data);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { isActive, message, openSnackBar } = useSnackbar();
  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(link);
      openSnackBar("주소를 클립보드로 복사했습니다.");
    }
  };
  React.useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/api?${param}`, { method: "GET" })
        .then((res) => res.json())
        .then((data: GeoLocation[]) => {
          setState(data);
        });
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          ref={inputRef}
          type="text"
          value={link}
          onChange={() => void 0}
        />
        <button className={styles.copyButton} onClick={handleCopy}>
          복사
        </button>
      </div>
      <Snackbar isActive={isActive} message={message} />
      <ul className={styles.itemsList}>
        {state.length === 0 ? <Waiting /> : null}
        {state.map((item, index) => {
          if (!item) return <Waiting />;

          const { id, createdAt, latitude, longitude } = item;
          const {
            degree: latDeg,
            minute: latMin,
            second: latSec,
          } = convertDDtoDMS(latitude);
          const {
            degree: lonDeg,
            minute: lonMin,
            second: lonSec,
          } = convertDDtoDMS(longitude);
          const cardProps = {
            createdAt,
            latDeg,
            latMin,
            latSec,
            lonDeg,
            lonMin,
            lonSec,
            isLatest: index === 0,
          };
          return <Card key={id} {...cardProps} />;
        })}
      </ul>
    </div>
  );
}

interface CardProps {
  createdAt: Date;
  latDeg: number;
  latMin: number;
  latSec: number;
  lonDeg: number;
  lonMin: number;
  lonSec: number;
  isLatest: boolean;
}

function Card(props: CardProps) {
  const {
    createdAt,
    latDeg,
    latMin,
    latSec,
    lonDeg,
    lonMin,
    lonSec,
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
              <span className={styles.degree}>{latMin}</span>
              <span className={styles.degree}>{latSec}</span>
            </div>
          </div>
          <div className={styles.bar}>
            <div className={styles.chip}>경도</div>
            <div>
              <span className={styles.degree}>{lonDeg}</span>
              <span className={styles.degree}>{lonMin}</span>
              <span className={styles.degree}>{lonSec}</span>
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
