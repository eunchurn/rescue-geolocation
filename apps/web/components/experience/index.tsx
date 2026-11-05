import Link from "next/link";
import type { ReactNode } from "react";
export function Icon({
  name = "pin",
  size = 24,
}: {
  name?: string;
  size?: number;
}) {
  const paths: Record<string, ReactNode> = {
    pin: (
      <>
        <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    arrow: (
      <>
        <path d="M4 12h16m-6-6 6 6-6 6" />
      </>
    ),
    shield: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    link: (
      <>
        <path d="m10 13 4-4m-6 6-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2 2 1-1a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    phone: (
      <path d="m5 3 4 1 1 5-3 2a15 15 0 0 0 6 6l2-3 5 1 1 4c-1 5-9 1-13-3S0 4 5 3Z" />
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.pin}
    </svg>
  );
}
export function Steps({ active }: { active: number }) {
  return (
    <ol className="steps" aria-label="위치 확인 진행 단계">
      {["링크 만들기", "링크 보내기", "위치 확인"].map((s, i) => (
        <li
          key={s}
          className={i === active ? "current" : i < active ? "done" : ""}
          aria-current={i === active ? "step" : undefined}
        >
          <span>{i < active ? "✓" : `0${i + 1}`}</span>
          {s}
        </li>
      ))}
    </ol>
  );
}
export function PageHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{children}</p>
    </div>
  );
}
export function Emergency() {
  return (
    <div className="emergency">
      <span>
        <strong>긴급한 상황인가요?</strong> 이 서비스는 신고를 대신하지
        않습니다.
      </span>
      <a href="tel:119">
        <Icon name="phone" size={16} />
        119 전화
      </a>
    </div>
  );
}
export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="구조 위치공유 홈">
        <span className="brand-icon">
          <Icon size={23} />
        </span>
        <strong>
          구조<span>위치공유</span>
        </strong>
      </Link>
      <div className="header-note">
        <span className="status-dot" />
        안전으로 이어지는 연결
      </div>
      <Link className="header-help" href="/#how-it-works">
        이용 안내 <span>↗</span>
      </Link>
    </header>
  );
}
