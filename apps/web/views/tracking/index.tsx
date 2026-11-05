"use client";
import type { GeoLocation } from "@rescue/prisma";
import { useEffect, useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { Emergency, Icon, PageHeading, Steps } from "@/components/experience";
import { ShareLink } from "@/components/experience/share";
import { LoadingState, Spinner } from "@/components/experience/loading";
function LocationMap({ point }: { point: GeoLocation }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "rescue-clev",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });
  if (loadError)
    return (
      <div className="map-empty">
        지도를 불러오지 못했어요. 아래 좌표와 지도 링크를 이용해주세요.
      </div>
    );
  if (!isLoaded)
    return (
      <div className="map-empty">
        <LoadingState label="지도를 불러오는 중…" />
      </div>
    );
  const center = { lat: point.latitude, lng: point.longitude };
  return (
    <GoogleMap
      mapContainerStyle={{ height: "340px", width: "100%" }}
      center={center}
      zoom={16}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      <MarkerF position={center} />
    </GoogleMap>
  );
}
export function Tracking({
  id,
  data,
  link,
}: {
  id: string;
  data: GeoLocation[];
  link: string;
}) {
  const [state, setState] = useState(data);
  const [error, setError] = useState("");
  const [tick, setTick] = useState(Date.now());
  useEffect(() => {
    let live = true;
    let timer: ReturnType<typeof setTimeout>;
    const controller = new AbortController();
    async function poll() {
      try {
        const res = await fetch(`/api?id=${encodeURIComponent(id)}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!res.ok) throw new Error();
        const next = await res.json();
        if (!Array.isArray(next)) throw new Error();
        if (live) {
          setState(next);
          setError("");
          setTick(Date.now());
        }
      } catch (e) {
        if (live && (e as Error).name !== "AbortError")
          setError(
            "연결이 원활하지 않아요. 마지막 수신 위치를 표시하며 자동으로 다시 연결하고 있어요.",
          );
      } finally {
        if (live) timer = setTimeout(poll, 3000);
      }
    }
    void poll();
    return () => {
      live = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [id]);
  const latest = state[0];
  const stale = latest && tick - new Date(latest.timestamp).getTime() > 60000;
  return (
    <>
      <Steps active={2} />
      <PageHeading
        eyebrow="LOCATION MONITOR"
        title="안전한 만남을 위한 위치 확인"
      >
        상대방이 위치 공유를 시작하면, 이 화면에서 확인할 수 있어요.
      </PageHeading>
      <div className="tracking-grid">
        <div>
          <section className="monitor panel">
            <div className="panel-header">
              <h2>최근 수신 위치</h2>
              <span
                className={`status-pill ${error || stale || !latest ? "waiting-pill" : ""}`}
              >
                <span className="status-dot" />
                {error
                  ? "재연결 중"
                  : !latest
                    ? "위치 수신 대기"
                    : stale
                      ? "갱신 확인 필요"
                      : "위치 수신됨"}
              </span>
            </div>
            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}
            {latest ? (
              <>
                {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
                  <LocationMap point={latest} />
                ) : (
                  <div className="map-empty">
                    <Icon size={36} />
                    <p>
                      좌표가 도착했어요.
                      <br />
                      아래 지도 링크로 위치를 확인해주세요.
                    </p>
                  </div>
                )}
                <div className="monitor-details">
                  <div className="coordinate-grid">
                    <div>
                      <span>위도 LATITUDE</span>
                      <strong>{latest.latitude.toFixed(6)}°</strong>
                    </div>
                    <div>
                      <span>경도 LONGITUDE</span>
                      <strong>{latest.longitude.toFixed(6)}°</strong>
                    </div>
                  </div>
                  <p className="meta">
                    추정 오차 ±{Math.round(latest.accuracy)}m ·{" "}
                    {new Date(latest.timestamp).toLocaleString("ko-KR")}
                  </p>
                  {stale && (
                    <p className="error-message">
                      1분 이상 갱신되지 않은 위치예요. 상대방의 연결 상태를
                      확인해주세요.
                    </p>
                  )}
                  <a
                    className="secondary-button"
                    href={`https://www.google.com/maps/search/?api=1&query=${latest.latitude},${latest.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    지도에서 위치 열기 ↗
                  </a>
                </div>
              </>
            ) : (
              <div className="waiting-state">
                <div className="waiting-spinner">
                  <Spinner />
                </div>
                <h3>첫 위치를 기다리고 있어요.</h3>
                <p>
                  상대방에게 링크를 보내셨나요?
                  <br />
                  링크를 열고 위치 공유를 허용하면 좌표가 도착해요.
                </p>
                <span>3초 간격으로 자동 확인합니다</span>
              </div>
            )}
          </section>
          <section className="history panel">
            <div className="panel-header">
              <h2>위치 기록</h2>
              <span className="meta">{state.length}건 수신</span>
            </div>
            {state.length ? (
              <ol>
                {state.slice(0, 50).map((item, i) => (
                  <li key={item.id}>
                    <span className="history-dot" />
                    <div>
                      <strong>
                        {new Date(item.timestamp).toLocaleTimeString("ko-KR")}
                        {i === 0 && <small>최근</small>}
                      </strong>
                      <span>
                        {item.latitude.toFixed(6)}°, {item.longitude.toFixed(6)}
                        °
                      </span>
                    </div>
                    <span className="meta">±{Math.round(item.accuracy)}m</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="empty-history">
                위치가 수신되면 최근 기록부터 표시됩니다.
              </p>
            )}
          </section>
        </div>
        <aside className="tracking-aside">
          <section className="panel">
            <h2>위치 공유 요청</h2>
            <p>
              아직 보내지 않았다면, 아래 링크를
              <br />
              도움이 필요한 분께 전달해주세요.
            </p>
            <ShareLink link={link} />
          </section>
          <div className="note">
            <Icon name="shield" />
            <p>
              이 화면의 주소를 보관해주세요. 위치 정보가 포함되므로 신뢰하는
              사람에게만 공유해주세요.
            </p>
          </div>
          <div className="note">
            <Icon name="clock" />
            <p>
              위치는 기기와 통신 상태에 따라 오차가 생길 수 있어요. 마지막 수신
              시각을 함께 확인해주세요.
            </p>
          </div>
        </aside>
      </div>
      <Emergency />
    </>
  );
}
