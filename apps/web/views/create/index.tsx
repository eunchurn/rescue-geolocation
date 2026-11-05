"use client";
import Link from "next/link";
import { Emergency, Icon, PageHeading, Steps } from "@/components/experience";
import { ShareLink } from "@/components/experience/share";
import { RememberCreatedLink } from "@/components/experience/link-history";
export function CreatedLocation({
  id,
  createdAt,
  link,
  trackingLink,
}: {
  id: string;
  createdAt: string;
  link: string;
  trackingLink: string;
}) {
  return (
    <>
      <Steps active={1} />
      <div className="narrow-flow">
        <div className="success-icon">
          <Icon name="check" size={30} />
        </div>
        <PageHeading
          eyebrow="READY TO CONNECT"
          title="이제, 링크를 보내주세요."
        >
          도움이 필요한 분이 링크를 열고 위치 공유를 허용하면
          <br />
          위치 확인 화면에 좌표가 나타나요.
        </PageHeading>
        <ShareLink link={link} />
        <RememberCreatedLink id={id} createdAt={createdAt} />
        <div className="next-action">
          <span>링크를 보내셨나요?</span>
          <Link className="secondary-button" href={trackingLink}>
            위치 확인 화면 열기 <Icon name="arrow" size={18} />
          </Link>
        </div>
        <aside className="note">
          <Icon name="shield" size={20} />
          <p>
            이 링크를 받은 사람은 위치를 공유할 수 있어요. 위치 확인 화면 주소는
            신뢰할 수 있는 사람에게만 알려주세요.
          </p>
        </aside>
      </div>
      <Emergency />
    </>
  );
}
