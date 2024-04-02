"use client";

import React from "react";
import styles from "./rescue.module.css";

interface RescueContainerProps {
  id: string;
}

export function RescueContainer(props: RescueContainerProps) {
  const { id } = props;
  const [location, setLocation] = React.useState<GeolocationPosition>();
  React.useEffect(() => {
    if (!navigator.geolocation) return;

    const navId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation(position);
        fetch("/api", {
          method: "POST",
          body: JSON.stringify({ id, ...geopositionToObject(position) }),
        });
      },
      console.error,
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );
    return () => {
      navigator.geolocation.clearWatch(navId);
    };
  }, [navigator]);

  return location ? (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.cistern}>
          <div className={styles.info}>위도</div>
          <div className={styles.infoData}>
            <LocationTypo dd={location.coords.latitude} />
          </div>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.cistern}>
          <div className={styles.info}>경도</div>
          <div className={styles.infoData}>
            <LocationTypo dd={location.coords.longitude} />
          </div>
        </div>
      </div>
      {location ? (
        <>
          <div className={styles.report}>
            구조대원에게 위치정보가 공유되었습니다.
          </div>
          <div className={styles.report}>
            {new Date(location.timestamp).toLocaleString()}
          </div>
          <div className={styles.report}>
            위치정보는 24시간후에 자동 삭제됩니다.
          </div>
        </>
      ) : null}
    </div>
  ) : (
    <div className={styles.report}>
      <div>좌표를 찾고있습니다.</div>
    </div>
  );
}

interface LocationTypoProps {
  dd: number;
}

function LocationTypo(props: LocationTypoProps) {
  const { dd } = props;
  const { degree, minute, second } = convertDDtoDMS(dd);
  return (
    <div className={styles.typoContainer}>
      <div className={styles.degree}>{degree}</div>
      <div className={styles.minute}>{minute}</div>
      <div className={styles.second}>{second}</div>
      <div className={styles.readerContainer}>
        <div className={styles.korean}>
          {degree}
          <span className={styles.koreanAfter}>도</span>
          {minute}
          <span className={styles.koreanAfter}>분</span>
          {second}
          <span className={styles.koreanAfter}>초</span>
        </div>
        <div className={styles.allDegree}>
          {dd}
          <span className={styles.koreanAfter}>도</span>
        </div>
      </div>
    </div>
  );
}

function convertDDtoDMS(D: number | undefined) {
  if (D === undefined) return { degree: 0, minute: 0, second: 0 };
  return {
    degree: 0 | D,
    minute: 0 | (((D = (D < 0 ? -D : D) + 1e-4) % 1) * 60),
    second: 0 | 0 | (((D * 60) % 1) * 60),
  };
}

function geopositionToObject(geoposition: GeolocationPosition) {
  return {
    timestamp: new Date(geoposition.timestamp),
    coords: {
      accuracy: geoposition.coords.accuracy,
      altitude: geoposition.coords.altitude,
      altitudeAccuracy: geoposition.coords.altitudeAccuracy,
      heading: geoposition.coords.heading,
      latitude: geoposition.coords.latitude,
      longitude: geoposition.coords.longitude,
      speed: geoposition.coords.speed,
    },
  };
}
