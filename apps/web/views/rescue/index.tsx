"use client";

import React from "react";
import { convertDDtoDM } from "@/shared";

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
    <div className="space-y-8 animate-fade-in">
      {/* Location Cards */}
      <div className="space-y-4">
        <div className="card p-6">
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">위도</div>
              <div className="w-3 h-3 bg-primary-500 rounded-full mx-auto"></div>
            </div>
            <div className="col-span-2">
            <LocationTypo dd={location.coords.latitude} />
          </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">경도</div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full mx-auto"></div>
            </div>
            <div className="col-span-2">
            <LocationTypo dd={location.coords.longitude} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Information */}
      <div className="glass rounded-2xl p-6 text-center space-y-3">
        <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full mx-auto flex items-center justify-center">
          <div className="w-6 h-6 text-white">✓</div>
        </div>
        <div className="space-y-2">
          <p className="font-semibold text-emerald-600 dark:text-emerald-400">
            구조대원에게 위치정보가 공유되었습니다.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {new Date(location.timestamp).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            위치정보는 24시간후에 자동 삭제됩니다.
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center space-y-4">
      <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto"></div>
      <p className="text-gray-600 dark:text-gray-300">좌표를 찾고 있습니다...</p>
    </div>
  );
}

interface LocationTypoProps {
  dd: number;
}

function LocationTypo(props: LocationTypoProps) {
  const { dd } = props;
  // const { degree, minute, second } = convertDDtoDMS(dd);
  const { degree, minute } = convertDDtoDM(dd);
  return (
    <div className="space-y-3">
      {/* Main Coordinates */}
      <div className="flex items-baseline justify-end space-x-1">
        <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">{degree}</span>
        <span className="text-xl text-red-500">°</span>
        <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">{minute}</span>
        <span className="text-xl text-red-500">'</span>
      </div>
      
      {/* Alternative Formats */}
      <div className="bg-gray-900 dark:bg-gray-100 rounded-lg p-3 space-y-1">
        <div className="text-right text-white dark:text-gray-900 text-lg">
          {degree}
          <span className="text-red-400 dark:text-red-600">도</span>
          {" "}
          {minute}
          <span className="text-red-400 dark:text-red-600">분</span>
        </div>
        <div className="text-right text-white dark:text-gray-900 text-sm opacity-75">
          {dd}
          <span className="text-red-400 dark:text-red-600">도</span>
        </div>
        </div>
      </div>
  );
}

// function convertDDtoDMS(D: number | undefined) {
//   if (D === undefined) return { degree: 0, minute: 0, second: 0 };
//   return {
//     degree: 0 | D,
//     minute: 0 | (((D = (D < 0 ? -D : D) + 1e-4) % 1) * 60),
//     second: 0 | 0 | (((D * 60) % 1) * 60),
//   };
// }

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
