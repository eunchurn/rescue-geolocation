"use client";

import { GeoLocation } from "@rescue/prisma";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updatedLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/ko";
import { convertDDtoDM } from "@/shared";
import React from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/hooks";
import { Snackbar } from "@/components";
import { useJsApiLoader, MarkerF, GoogleMap } from "@react-google-maps/api";

dayjs.extend(relativeTime);
dayjs.extend(updatedLocale);
dayjs.locale("ko");

function Waiting() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mb-6">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-gray-600 dark:text-gray-300">위치정보를 기다리는 중입니다.</p>
    </div>
  );
}

interface TrackingCardProps {
  createdAt: Date;
  data: {
    latDeg: number;
    latMin: number;
    lonDeg: number;
    lonMin: number;
  };
  isLatest: boolean;
}

function TrackingCard(props: TrackingCardProps) {
  const {
    createdAt,
    data: { latDeg, latMin, lonDeg, lonMin },
    isLatest,
  } = props;

  return (
    <div className={`card p-6 ${isLatest ? 'ring-2 ring-primary-500' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-4 h-4 rounded-full ${isLatest ? 'bg-primary-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {dayjs(createdAt).fromNow()}
          </span>
          {isLatest && (
            <span className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full">
              최신
            </span>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">위도</div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{latDeg}</span>
            <span className="text-sm text-red-500">°</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{latMin.toFixed(6)}</span>
            <span className="text-sm text-red-500">'</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">경도</div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{lonDeg}</span>
            <span className="text-sm text-red-500">°</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{lonMin.toFixed(6)}</span>
            <span className="text-sm text-red-500">'</span>
          </div>
        </div>
      </div>
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
  const { isLoaded } = useJsApiLoader({
    id: "rescue-clev",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const handleCopy = async () => {
    if (inputRef.current) {
      try {
        // 최신 브라우저에서 Clipboard API 사용
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(link);
        } else {
          // Fallback: 기존 방식 사용
          inputRef.current.select();
          inputRef.current.setSelectionRange(0, 99999); // 모바일 브라우저 지원
          document.execCommand('copy');
        }
        openSnackBar("주소를 클립보드로 복사했습니다.");
      } catch (err) {
        console.error('클립보드 복사 실패:', err);
        openSnackBar("클립보드 복사에 실패했습니다. 직접 복사해주세요.");
      }
    }
  };

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const center = {
    lat: state[0]?.latitude || 37.5072397,
    lng: state[0]?.longitude || 126.884165,
  };

  const onLoad = React.useCallback(
    function callback(map: google.maps.Map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map);
    },
    [center]
  );

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

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
    <div className="space-y-6">
      {/* Link sharing section */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4">구조링크 공유</h2>
        <div className="flex rounded-xl overflow-hidden shadow-lg">
          <input
            ref={inputRef}
            type="text"
            value={link}
            className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border-0 focus:ring-0 text-sm font-mono"
            onChange={() => void 0}
            readOnly
          />
          <button 
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors duration-200"
            onClick={handleCopy}
          >
            복사
          </button>
        </div>
      </div>

      {/* Map section */}
      {state.length > 0 && isLoaded && (
        <div className="card overflow-hidden">
          <GoogleMap
            mapContainerStyle={{ height: "400px", width: "100%" }}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {state.map((location, index) => {
              const { id, latitude, longitude } = location;
              if (index === 0) {
                return (
                  <MarkerF
                    key={id}
                    position={{ lat: latitude, lng: longitude }}
                    icon={{
                      url: "/geolocation.svg",
                      scaledSize: new google.maps.Size(50, 50),
                    }}
                  />
                );
              }
              return (
                <MarkerF
                  key={id}
                  position={{ lat: latitude, lng: longitude }}
                  icon={{
                    url: "/gray.svg",
                    scaledSize: new google.maps.Size(20, 20),
                  }}
                />
              );
            })}
          </GoogleMap>
        </div>
      )}

      <Snackbar isActive={isActive} message={message} />

      {/* Location history */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">위치 기록</h2>
        {state.length === 0 ? (
          <Waiting />
        ) : (
          <div className="space-y-4">
            {state.map((item, index) => {
              if (!item) return <Waiting key={index} />;

              const { id, createdAt, latitude, longitude } = item;
              const { degree: latDeg, minute: latMin } = convertDDtoDM(latitude);
              const { degree: lonDeg, minute: lonMin } = convertDDtoDM(longitude);

              return (
                <TrackingCard
                  key={id}
                  createdAt={createdAt}
                  data={{
                    latDeg,
                    latMin,
                    lonDeg,
                    lonMin,
                  }}
                  isLatest={index === 0}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}