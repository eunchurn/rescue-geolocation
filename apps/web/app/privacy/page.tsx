import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/experience";

export const metadata: Metadata = {
  title: "개인정보 처리방침 · 구조",
  description:
    "구조 위치공유 서비스의 개인정보 수집, 공유, 보관과 삭제 안내입니다.",
  robots: { index: false, follow: false },
};

const sections = [
  ["collection", "수집하는 정보"],
  ["sharing", "위치를 확인할 수 있는 사람"],
  ["retention", "보관과 삭제"],
  ["providers", "서비스 제공업체와 국외 처리"],
  ["controls", "동의와 이용자의 권리"],
  ["security", "안전하게 이용하는 방법"],
  ["contact", "운영사와 문의"],
  ["changes", "처리방침 변경"],
];

export default function PrivacyPage() {
  return (
    <div className="privacy-page page-width">
      <Link className="privacy-back" href="/">
        ← 구조 홈으로
      </Link>
      <header className="privacy-heading">
        <span className="eyebrow">YOUR LOCATION, YOUR CHOICE</span>
        <h1>개인정보 처리방침</h1>
        <p>
          어떤 위치정보를 보내고, 누가 확인하며,
          <br />
          언제 삭제되는지 안내합니다.
        </p>
        <span className="privacy-date">
          작성일 2026년 11월 6일 · 구조 위치공유 서비스
        </span>
      </header>
      <aside className="privacy-draft" role="note">
        <strong>검토용 초안</strong>
        <p>
          위치 저장소의 리전·백업 보관 기간과 서비스 제공업체의 로그 보관 설정을
          확인한 후 확정됩니다. 아래에서 확인되지 않은 항목은 별도로
          표시했습니다.
        </p>
      </aside>
      <div className="privacy-summary">
        <Icon name="shield" size={26} />
        <div>
          <h2>위치 공유는 직접 시작하고, 언제든 중지할 수 있어요.</h2>
          <p>
            회원가입 없이 이용합니다. 이름·전화번호를 입력받지 않으며, 위치
            접근을 허용하고 공유를 시작해야 좌표가 전송됩니다.
          </p>
        </div>
      </div>
      <div className="privacy-layout">
        <nav className="privacy-nav" aria-label="개인정보 처리방침 목차">
          <span>이 페이지에서</span>
          {sections.map(([id, title], index) => (
            <a key={id} href={`#${id}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {title}
            </a>
          ))}
        </nav>
        <article className="privacy-content">
          <p className="privacy-intro">
            주식회사 아이놉스(INOBS Inc.)의 sophonz labs 팀은 ‘구조’ 웹
            서비스에서 링크를 통한 위치 공유와 확인 기능을 제공합니다. 이 방침은
            구조 서비스에 적용되며, sophonz 터미널 앱의 계정·음성·카메라·알림
            기능은 이 서비스에 포함되지 않습니다.
          </p>
          <section id="collection">
            <span className="privacy-number">01</span>
            <h2>수집하는 정보와 이용 목적</h2>
            <div className="privacy-table-wrap">
              <table>
                <caption className="sr-only">
                  수집 시점별 개인정보 항목과 목적
                </caption>
                <thead>
                  <tr>
                    <th scope="col">수집 시점</th>
                    <th scope="col">정보와 목적</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">링크 생성</th>
                    <td>
                      무작위 링크 식별자, 생성·갱신 시각. 공유 요청과 위치
                      기록을 연결하기 위해 저장합니다.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">위치 공유</th>
                    <td>
                      위도·경도, 기기가 추정한 위치 정확도, 위치 측정 시각과
                      서버 저장·갱신 시각. 기기가 제공하는 경우 고도·고도
                      정확도·이동 방향·속도도 함께 저장합니다. 현재 위치와 이동
                      기록을 확인하는 데 사용합니다.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">웹사이트 접속</th>
                    <td>
                      호스팅 사업자가 요청을 처리하는 과정에서 IP 주소, 요청
                      주소·시각, 브라우저 정보 등의 접속 정보를 처리할 수
                      있습니다. 서비스 제공과 장애 대응에 사용합니다.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">성능 측정</th>
                    <td>
                      Vercel Speed Insights를 통해 페이지 경로·URL,
                      브라우저·기기·운영체제·네트워크 유형, 국가 수준 정보와
                      로딩·응답 속도 지표를 처리합니다. 서비스 성능 개선에
                      사용합니다.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">이메일 문의</th>
                    <td>
                      문의자가 보낸 이메일 주소, 문의 내용과 확인에 필요한
                      링크·이용 시각을 처리합니다. 요청에 답하고 해당 기록을
                      찾는 데 사용합니다.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              위치는 기기의 위치 서비스에서 가져옵니다. 좌표를 보내기 위한
              별도의 이름·전화번호·주민등록번호 입력이나 회원가입은 요구하지
              않습니다.
            </p>
          </section>
          <section id="local-history">
            <h2>이 브라우저에 저장되는 내 링크</h2>
            <p>
              링크 생성에 성공하면 무작위 링크 식별자와 생성 시각을 브라우저의
              로컬스토리지(gujo:created-links:v1)에 저장합니다. 홈의 ‘내
              링크’에서 다시 공유하고 위치 확인 화면을 여는 데 사용하며,
              좌표·이동 기록·이름·연락처는 이 목록에 저장하지 않습니다. 링크를
              만들었다는 기록이며, 상대방에게 실제로 전달되었거나 상대방이
              열었다는 뜻은 아닙니다.
            </p>
            <p>
              최근 50개를 저장하며, 50개를 넘으면 가장 오래된 항목부터 목록에서
              제거합니다. 별도의 자동 만료 기간은 없고, ‘삭제’·‘목록 비우기’
              또는 브라우저의 사이트 데이터 삭제 기능으로 지울 수 있습니다.
              서버의 위치 기록 보관 기간과는 별개입니다.
            </p>
            <p>
              목록 자체는 서버에 동기화하지 않습니다. 위치 확인을 누르면 해당
              식별자로 서버에 조회하고, 다시 공유를 누르면 이용자가 선택한 공유
              방법으로 링크를 전달합니다. 다른 기기·브라우저·도메인에서는 목록이
              보이지 않습니다. 저장소 접근이 차단되거나 시크릿 모드를 종료하면
              기록이 저장되지 않거나 사라질 수 있습니다.
            </p>
            <p>
              같은 브라우저를 사용하는 사람은 저장된 링크를 통해 위치를 조회할
              수 있으므로 공용 기기에서는 목록을 비워주세요. 로컬 목록을
              삭제해도 서버의 위치 기록이나 다른 사람에게 전달한 링크는 삭제되지
              않습니다.
            </p>
          </section>
          <section id="sharing">
            <span className="privacy-number">02</span>
            <h2>위치를 확인할 수 있는 사람</h2>
            <p>
              수집한 위치 기록은 해당 링크의 식별자를 이용하는 위치 확인 화면에
              표시됩니다. 별도의 로그인이나 구조대원 자격 확인 절차가 없으므로,{" "}
              <strong>
                구조 링크 또는 위치 확인 링크를 아는 사람은 위치 기록을 조회할
                수 있습니다.
              </strong>{" "}
              공유 대상은 링크를 전달하고 보관하는 이용자가 선택합니다.
            </p>
            <p>
              조회 가능한 항목에는 좌표, 정확도, 측정·저장 시각과 기기가 제공한
              부가 위치정보가 포함됩니다. 위치 확인과 도움 제공을 목적으로
              신뢰하는 사람에게만 링크를 전달해주세요. 링크를 게시판이나 공개
              채팅방에 게시하지 마세요.
            </p>
            <p>
              공유를 중지하더라도 이미 저장된 기록은 삭제되기 전까지 조회될 수
              있습니다. 상대방이 복사하거나 캡처한 정보는 이 서비스에서 회수할
              수 없습니다.
            </p>
          </section>
          <section id="retention">
            <span className="privacy-number">03</span>
            <h2>보관 기간과 삭제 방식</h2>
            <p>
              운영 서비스에는{" "}
              <strong>
                생성 후 24시간이 지난 위치 기록과 공유 요청을 하루 한 번
                정리하는 예약 작업
              </strong>
              이 설정되어 있습니다. 정상 실행 시 다음 정리 시점에 삭제되므로,
              생성한 지 정확히 24시간이 되는 순간에 삭제되는 방식은 아닙니다.
            </p>
            <p>
              예약 작업은 매일 05:00 UTC(한국 시간 14:00)에 실행하도록 설정되어
              있습니다. 실행 주기에 따라 일반적으로 생성 후 24~48시간 사이에
              정리되며, 작업 실패나 장애가 있으면 삭제가 지연될 수 있습니다.
              Preview 환경에서는 예약 작업이 실행되지 않을 수 있습니다.
            </p>
            <p>
              삭제 작업은 서비스 데이터베이스에서 해당 기록을 제거합니다.{" "}
              <strong>
                Atlas 백업의 사용 여부·보관 기간, 호스팅 접속 로그·성능 지표의
                보관 기간은 운영 설정 확인 후 이 초안에 추가합니다.
              </strong>{" "}
              이들 기록이 서비스 데이터와 동시에 삭제된다고 보장하지 않습니다.
            </p>
            <p>
              더 이른 삭제가 필요하면{" "}
              <a href="mailto:ceo@inobs.io">ceo@inobs.io</a>로 요청해주세요.
              문의 메일의 보관 기간도 운영 절차 확인 후 확정합니다.
            </p>
          </section>
          <section id="providers">
            <span className="privacy-number">04</span>
            <h2>서비스 제공업체와 국외 처리</h2>
            <p>
              다음 외부 서비스를 사용합니다. 구조앱의 위치정보 처리와 각 업체가
              자체적으로 처리하는 접속·운영 정보를 구분해 안내합니다.
            </p>
            <ul className="provider-list">
              <li>
                <h3>Vercel Inc.</h3>
                <p>
                  웹사이트·API 호스팅과 성능 측정을 제공합니다. 위치 전송 요청은
                  Vercel의 서버를 거쳐 데이터베이스에 저장됩니다. 접속 정보와
                  성능 데이터도 처리합니다.{" "}
                  <a
                    href="https://vercel.com/legal/privacy-notice"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    개인정보 안내 ↗
                  </a>{" "}
                  ·{" "}
                  <a
                    href="https://vercel.com/docs/speed-insights/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    성능 측정 안내 ↗
                  </a>
                </p>
              </li>
              <li>
                <h3>MongoDB, Inc. · Atlas</h3>
                <p>
                  공유 요청의 식별자, 위치 좌표·부가 위치정보와 관련 시각을
                  저장하는 데이터베이스를 제공합니다.{" "}
                  <a
                    href="https://www.mongodb.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    개인정보 안내 ↗
                  </a>
                </p>
              </li>
              <li>
                <h3>Google · Maps</h3>
                <p>
                  위치 확인 화면의 지도 기능에 사용합니다. 지도가 로드되거나
                  ‘지도에서 위치 열기’를 선택하면 표시할 좌표와 지도 요청에 따른
                  IP 주소·브라우저 정보 등이 Google에 전달될 수 있습니다.{" "}
                  <a
                    href="https://policies.google.com/privacy?hl=ko"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    개인정보 안내 ↗
                  </a>
                </p>
              </li>
            </ul>
            <p>
              위치 전송·조회와 지도 이용 시 네트워크를 통해 정보가 처리되며,
              해외 인프라에서 처리될 수 있습니다.{" "}
              <strong>
                구체적인 이전 국가, 수탁 범위, 이전받는 자의 보관 기간 및 적용
                근거는 Vercel·Atlas의 실제 운영 설정과 계약을 확인한 뒤
                확정합니다.
              </strong>{" "}
              업체의 안내 링크만으로 구조 서비스의 설정이 확정되는 것은
              아닙니다.
            </p>
            <p>
              위치 공유를 시작하지 않거나 중지하여 이후 위치 전송을 거부할 수
              있습니다. 이 경우 새 위치를 전달하는 기능을 사용할 수 없습니다.
              이미 저장된 데이터의 삭제는 아래 연락처로 요청할 수 있습니다.
            </p>
          </section>
          <section id="controls">
            <span className="privacy-number">05</span>
            <h2>동의, 중지와 이용자의 권리</h2>
            <p>
              ‘동의하고 위치 공유 시작’을 누르고 브라우저의 위치 접근을 허용하면
              공유가 시작됩니다. 거부하더라도 안내 페이지는 볼 수 있지만 위치
              전송은 할 수 없습니다. 앱의 ‘위치 공유 중지’를 누르거나 브라우저
              설정에서 위치 권한을 해제하면 새 위치의 수집·전송을 중지할 수
              있습니다.
            </p>
            <p>
              화면을 닫거나 기기가 잠기면 위치 갱신이 멈출 수 있습니다.{" "}
              <strong>공유 중지는 기존 기록의 삭제와 다릅니다.</strong> 이미
              저장된 기록의 열람·정정·삭제·처리정지를 요청하려면{" "}
              <a href="mailto:ceo@inobs.io">ceo@inobs.io</a>로 연락해주세요.
            </p>
            <p>
              이 서비스는 별도의 계정이 없으므로 요청한 기록과 권한을 확인하기
              위해 관련 링크 및 이용 시각 등을 확인할 수 있습니다. 필요한 최소
              정보만 요청하며, 주민등록번호 등 불필요한 신분 정보를 먼저 보내지
              마세요.
            </p>
          </section>
          <section id="security">
            <span className="privacy-number">06</span>
            <h2>안전하게 이용하는 방법</h2>
            <p>
              서비스의 위치 전송과 조회는 HTTPS 연결을 사용합니다. 위치는 링크
              식별자로 연결되며, 이름을 입력하지 않더라도 개인의 동선과 연결될
              수 있으므로 민감하게 다뤄야 합니다.
            </p>
            <p>
              링크를 신뢰하는 사람에게만 전달하고, 이용을 마치면 공유를
              중지해주세요. 구조앱은 긴급 신고 접수나 구조 출동을 보장하는
              서비스가 아닙니다. 긴급 신고가 필요하면 <a href="tel:119">119</a>
              에 연락해주세요.
            </p>
          </section>
          <section id="contact">
            <span className="privacy-number">07</span>
            <h2>운영사와 개인정보 문의</h2>
            <dl className="privacy-contact">
              <div>
                <dt>운영사</dt>
                <dd>
                  주식회사 아이놉스 · <a href="https://inobs.io">INOBS Inc.</a>{" "}
                  (대한민국)
                </dd>
              </div>
              <div>
                <dt>사업자등록번호</dt>
                <dd>314-88-03883</dd>
              </div>
              <div>
                <dt>담당 팀</dt>
                <dd>
                  <a href="https://inobs.io/labs/">sophonz labs</a>
                </dd>
              </div>
              <div>
                <dt>개인정보 문의</dt>
                <dd>
                  <a href="mailto:ceo@inobs.io">ceo@inobs.io</a>
                </dd>
              </div>
              <div>
                <dt>서비스 문의</dt>
                <dd>
                  <a href="mailto:support@sophonz.io">support@sophonz.io</a>
                </dd>
              </div>
            </dl>
            <p>
              개인정보 침해에 관한 상담은{" "}
              <a
                href="https://privacy.kisa.or.kr"
                target="_blank"
                rel="noopener noreferrer"
              >
                개인정보침해 신고센터(118)
              </a>{" "}
              또는{" "}
              <a
                href="https://www.kopico.go.kr"
                target="_blank"
                rel="noopener noreferrer"
              >
                개인정보 분쟁조정위원회(1833-6972)
              </a>
              를 통해서도 받을 수 있습니다.
            </p>
          </section>
          <section id="changes">
            <span className="privacy-number">08</span>
            <h2>처리방침 변경</h2>
            <p>
              수집 항목, 이용 목적, 제공업체나 보관 방식이 바뀌면 이 페이지에
              변경 내용과 적용일을 안내합니다. 이 문서는 2026년 11월 6일 작성한
              Preview 검토용 초안이며, 확인 중인 운영 정보와 적용일이 확정되면
              갱신합니다.
            </p>
            <p className="privacy-source">
              운영사 정보는{" "}
              <a
                href="https://www.sophonz.io/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                sophonz 개인정보 처리방침
              </a>
              을 바탕으로 하며, 구조앱의 실제 기능에 맞춰 별도로 작성했습니다.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
