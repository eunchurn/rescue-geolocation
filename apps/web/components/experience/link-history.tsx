"use client";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Icon } from ".";
import { ShareLink } from "./share";
import { LoadingState } from "./loading";
import {
  clearSavedLinks,
  LINK_HISTORY_EVENT,
  LINK_HISTORY_KEY,
  parseLinkHistory,
  removeSavedLink,
  saveCreatedLink,
  type SavedLink,
} from "@/lib/link-history";

const UNAVAILABLE = "storage-unavailable";
function snapshot() {
  try {
    return window.localStorage.getItem(LINK_HISTORY_KEY) ?? "";
  } catch {
    return UNAVAILABLE;
  }
}
function subscribe(onChange: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === LINK_HISTORY_KEY || event.key === null) onChange();
  }
  window.addEventListener("storage", onStorage);
  window.addEventListener(LINK_HISTORY_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(LINK_HISTORY_EVENT, onChange);
  };
}
function notify() {
  window.dispatchEvent(new Event(LINK_HISTORY_EVENT));
}
const serverSnapshot = () => null;

export function RememberCreatedLink({ id, createdAt }: SavedLink) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    try {
      saveCreatedLink(window.localStorage, { id, createdAt });
      notify();
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }, [id, createdAt]);
  return (
    <p className="saved-link-notice" role="status">
      {failed ? (
        "브라우저에 기록을 저장하지 못했어요. 위치 확인 화면 주소를 따로 보관해주세요."
      ) : (
        <>
          이 브라우저의 <Link href="/#my-links">내 링크</Link>에 자동으로
          저장돼요.
        </>
      )}
    </p>
  );
}

export function LinkHistory() {
  const raw = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const links = useMemo(() => parseLinkHistory(raw), [raw]);
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState("");
  const [now, setNow] = useState<number | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);
  function remove(id: string) {
    try {
      removeSavedLink(window.localStorage, id);
      notify();
      setMessage(
        "이 브라우저의 목록에서 삭제했어요. 서버의 위치 기록은 삭제되지 않아요.",
      );
      heading.current?.focus();
    } catch {
      setMessage(
        "기록을 삭제하지 못했어요. 브라우저의 저장소 설정을 확인해주세요.",
      );
    }
  }
  function clear() {
    try {
      clearSavedLinks(window.localStorage);
      notify();
      setConfirmClear(false);
      setSelected(null);
      setMessage(
        "이 브라우저의 링크 목록을 비웠어요. 서버의 위치 기록은 삭제되지 않아요.",
      );
      heading.current?.focus();
    } catch {
      setMessage(
        "기록을 삭제하지 못했어요. 브라우저의 저장소 설정을 확인해주세요.",
      );
    }
  }
  return (
    <section
      className="link-history"
      id="my-links"
      aria-labelledby="my-links-title"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">SAVED ON THIS BROWSER</span>
          <h2 id="my-links-title" ref={heading} tabIndex={-1}>
            내 링크{" "}
            {links.length > 0 && (
              <span className="link-count">{links.length}</span>
            )}
          </h2>
        </div>
        {links.length > 0 && (
          <button
            className="history-clear"
            onClick={() => setConfirmClear(true)}
          >
            목록 비우기
          </button>
        )}
      </div>
      <p className="link-history-description">
        이 브라우저에서 만든 링크를 다시 공유하거나 위치를 확인하세요.
      </p>
      {confirmClear && links.length > 0 && (
        <div
          className="history-confirm"
          role="group"
          aria-label="링크 목록 비우기 확인"
        >
          <p>
            저장된 링크 {links.length}개를 목록에서 지울까요? 서버에 저장된 위치
            기록은 삭제되지 않습니다.
          </p>
          <div>
            <button
              className="secondary-button"
              onClick={() => setConfirmClear(false)}
            >
              취소
            </button>
            <button className="secondary-button" onClick={clear}>
              목록 비우기
            </button>
          </div>
        </div>
      )}
      {raw === null ? (
        <LoadingState label="저장한 링크를 불러오는 중…" />
      ) : raw === UNAVAILABLE ? (
        <div className="history-empty">
          <Icon name="shield" />
          <p>
            이 브라우저에서 저장소에 접근할 수 없어요.
            <br />
            링크는 만들 수 있지만, 위치 확인 주소를 따로 보관해주세요.
          </p>
        </div>
      ) : links.length === 0 ? (
        <div className="history-empty">
          <Icon name="link" />
          <div>
            <h3>아직 저장한 링크가 없어요.</h3>
            <p>
              위의 ‘위치 공유 링크 만들기’를 누르면 여기에 자동으로 저장돼요.
            </p>
          </div>
        </div>
      ) : (
        <ul className="saved-links">
          {links.map((item) => {
            const old =
              now !== null &&
              now - Date.parse(item.createdAt) >= 24 * 60 * 60 * 1000;
            return (
              <li key={item.id}>
                <div className="saved-link-row">
                  <div className="saved-link-details">
                    <div>
                      <strong>공유 링크</strong>
                      <code>{item.id}</code>
                      {old && <span className="history-age">24시간 경과</span>}
                    </div>
                    <time dateTime={item.createdAt}>
                      {new Date(item.createdAt).toLocaleString("ko-KR", {
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      생성
                    </time>
                    {old && (
                      <p>
                        서버 정리로 위치 기록이 없거나 공유가 종료됐을 수
                        있어요.
                      </p>
                    )}
                  </div>
                  <div className="saved-link-actions">
                    <Link
                      className="primary-button"
                      href={`/tracking/${item.id}`}
                      prefetch={false}
                      aria-label={`${item.id} 위치 확인`}
                    >
                      위치 확인 <Icon name="arrow" size={15} />
                    </Link>
                    <button
                      className="secondary-button"
                      aria-expanded={selected === item.id}
                      aria-controls={`share-${item.id}`}
                      onClick={() => {
                        setSelected(selected === item.id ? null : item.id);
                        setShareUrl(
                          new URL(`/rescue/${item.id}`, window.location.origin)
                            .href,
                        );
                      }}
                    >
                      다시 공유
                    </button>
                    <button
                      className="history-delete"
                      onClick={() => remove(item.id)}
                      aria-label={`${item.id} 목록에서 삭제`}
                    >
                      삭제
                    </button>
                  </div>
                </div>
                {selected === item.id && (
                  <div className="saved-link-share" id={`share-${item.id}`}>
                    <ShareLink link={shareUrl} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
      <p className="history-feedback" role="status">
        {message}
      </p>
      <p className="history-local-note">
        <Icon name="shield" size={15} />
        <span>
          최근 50개를 이 브라우저에만 보관해요. 다른 기기·브라우저·도메인에는
          동기화되지 않으며, 공용 기기에서는 이용 후 목록을 비워주세요.{" "}
          <Link href="/privacy#local-history">저장 안내</Link>
        </span>
      </p>
    </section>
  );
}
