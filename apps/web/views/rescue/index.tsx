"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Emergency, Icon, PageHeading } from "@/components/experience";
import { Spinner } from "@/components/experience/loading";
export function RescueContainer({ id }: { id: string }) {
  const [active, setActive] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [position, setPosition] = useState<GeolocationPosition>();
  const [sent, setSent] = useState<number>();
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  useEffect(() => {
    if (!active) return;
    let live = true;
    const controller = new AbortController();
    let inFlight = false;
    if (!navigator.geolocation) {
      setError(
        "이 브라우저에서는 위치를 확인할 수 없어요. 다른 브라우저에서 링크를 열어주세요.",
      );
      setActive(false);
      return;
    }
    const watch = navigator.geolocation.watchPosition(
      async (p) => {
        if (inFlight) return;
        inFlight = true;
        setPosition(p);
        setSending(true);
        setError("");
        try {
          const c = p.coords;
          const response = await fetch("/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
            body: JSON.stringify({
              id,
              timestamp: new Date(p.timestamp),
              coords: {
                latitude: c.latitude,
                longitude: c.longitude,
                accuracy: c.accuracy,
                altitude: c.altitude,
                altitudeAccuracy: c.altitudeAccuracy,
                heading: c.heading,
                speed: c.speed,
              },
            }),
          });
          if (!response.ok) throw new Error();
          if (live) setSent(p.timestamp);
        } catch (e) {
          if (live && (e as Error).name !== "AbortError")
            setError(
              "위치를 전송하지 못했어요. 인터넷 연결을 확인하고 다시 시도해주세요.",
            );
        } finally {
          inFlight = false;
          if (live) setSending(false);
        }
      },
      (e) => {
        setError(
          e.code === 1
            ? "위치 권한이 꺼져 있어요. 브라우저 설정에서 위치 접근을 허용한 뒤 다시 시도해주세요."
            : e.code === 2
              ? "현재 위치를 찾을 수 없어요. 기기의 위치 서비스를 확인하고 다시 시도해주세요."
              : "위치 확인이 지연되고 있어요. 잠시 기다리거나 다시 시도해주세요.",
        );
        setSending(false);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 },
    );
    return () => {
      live = false;
      navigator.geolocation.clearWatch(watch);
      controller.abort();
    };
  }, [active, attempt, id]);
  return (
    <div className="narrow-flow rescue-flow">
      <div className="success-icon">
        <Icon size={30} />
      </div>
      <PageHeading
        eyebrow="SHARE YOUR LOCATION"
        title={
          active ? "당신의 위치를 연결하고 있어요." : "현재 위치를 알려주세요."
        }
      >
        {active
          ? "이 화면을 열어두면 위치가 갱신될 때 다시 전송해요."
          : "위치 공유를 요청한 사람에게 현재 좌표를 전송해요. 아래 버튼을 누른 뒤 위치 접근을 허용해주세요."}
      </PageHeading>
      {!active && (
        <div className="consent-note">
          <p>
            공유를 시작하면 좌표·정확도·측정 시각과 기기가 제공하는 부가
            위치정보가 서버에 저장되며, 해당 링크를 아는 사람이 조회할 수
            있어요. 24시간이 지난 기록은 하루 한 번 정리합니다.
          </p>
          <Link href="/privacy" target="_blank" rel="noopener noreferrer">
            개인정보 수집·공유 안내 보기 ↗
          </Link>
        </div>
      )}
      <section className="status-card">
        <div className="status-line">
          {active && !error && (sending || !sent) ? (
            <Spinner small />
          ) : (
            <span
              className={`status-dot ${!active || error ? "muted-dot" : ""}`}
            />
          )}
          <strong>
            {error
              ? "확인이 필요해요"
              : !active
                ? "위치 공유 대기"
                : sending
                  ? "위치 전송 중"
                  : sent
                    ? "위치 전송 완료"
                    : "현재 위치 확인 중"}
          </strong>
        </div>
        {error ? (
          <p role="alert" className="error-message">
            {error}
          </p>
        ) : (
          <p>
            {!active
              ? "동의하기 전에는 위치를 전송하지 않아요."
              : sent
                ? "위치 확인 화면에서 전달된 좌표를 볼 수 있어요."
                : "기기에서 GPS 좌표를 찾고 있어요."}
          </p>
        )}
        {position && (
          <>
            <div className="coordinate-grid">
              <div>
                <span>위도 LATITUDE</span>
                <strong>{position.coords.latitude.toFixed(6)}°</strong>
              </div>
              <div>
                <span>경도 LONGITUDE</span>
                <strong>{position.coords.longitude.toFixed(6)}°</strong>
              </div>
            </div>
            <p className="meta">
              기기 추정 오차 ±{Math.round(position.coords.accuracy)}m
              {sent &&
                ` · 마지막 전송 ${new Date(sent).toLocaleTimeString("ko-KR")}`}
            </p>
          </>
        )}
      </section>
      {(!active || error) && (
        <button
          className="primary-button full"
          onClick={() => {
            setError("");
            setActive(true);
            setAttempt((x) => x + 1);
          }}
        >
          {active ? "다시 시도하기" : "동의하고 위치 공유 시작"}
          <Icon name="arrow" size={20} />
        </button>
      )}
      {active && (
        <button
          className="secondary-button full"
          onClick={() => {
            setActive(false);
            setSending(false);
            setError("");
          }}
        >
          위치 공유 중지
        </button>
      )}
      <aside className="note">
        <Icon name="shield" />
        <p>
          공유를 중지하면 새 위치를 보내지 않아요. 화면을 닫거나 휴대폰이 잠기면
          위치 갱신이 멈출 수 있어요.
        </p>
      </aside>
      <Emergency />
    </div>
  );
}
