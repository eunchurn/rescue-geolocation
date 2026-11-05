"use client";
import Link from "next/link";
import { Emergency, Icon, PageHeading } from "@/components/experience";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="page-width">
      <div className="narrow-flow">
        <div className="success-icon">
          <Icon name="link" />
        </div>
        <PageHeading eyebrow="PLEASE TRY AGAIN" title="잠시 연결하지 못했어요.">
          인터넷 연결을 확인하고 다시 시도해주세요. 계속 문제가 생기면 링크를
          보낸 분에게 알려주세요.
        </PageHeading>
        <button className="primary-button full" onClick={reset}>
          다시 시도하기
        </button>
        <Link className="secondary-button full" href="/">
          처음으로
        </Link>
        <div style={{ marginTop: 24 }}>
          <Emergency />
        </div>
      </div>
    </div>
  );
}
