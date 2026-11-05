import { RescueButton } from "@/components";
import { Emergency, Icon, Steps } from "@/components/experience";
import { LinkHistory } from "@/components/experience/link-history";
export default function Page() {
  return (
    <div className="home page-width">
      <Steps active={0} />
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="tiny-cross">＋</span> EVERY CONNECTION MATTERS
          </span>
          <h1>
            어디에 있든,
            <br />
            안전으로 <span>연결되도록.</span>
          </h1>
          <p className="hero-description">
            설명하기 어려운 위치도, 링크 하나면 충분합니다.
            <br />
            도움이 필요한 사람에게 링크를 보내고
            <br className="desktop-break" /> 정확한 위치를 확인하세요.
          </p>
          <div className="hero-action">
            <RescueButton />
            <p>
              <Icon name="shield" size={15} /> 앱 설치 없이 · 회원가입 없이
            </p>
          </div>
        </div>
        <div className="terrain" aria-label="위치 연결을 표현한 일러스트">
          <svg
            className="contours"
            viewBox="0 0 600 540"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="grid"
                width="36"
                height="36"
                patternUnits="userSpaceOnUse"
              >
                <path d="M36 0H0V36" stroke="#d6dfd2" strokeWidth=".6" />
              </pattern>
            </defs>
            <path fill="url(#grid)" d="M0 0h600v540H0z" />
            {Array.from({ length: 13 }, (_, i) => (
              <ellipse
                key={i}
                cx="385"
                cy="270"
                rx={65 + i * 23}
                ry={42 + i * 22}
                transform="rotate(-32 385 270)"
                stroke="#bacbb8"
                strokeWidth="1"
              />
            ))}
            <path
              d="M130 410C115 310 280 390 263 274S390 180 427 115"
              stroke="#738e78"
              strokeWidth="2"
              strokeDasharray="5 7"
            />
            <circle cx="130" cy="410" r="7" fill="#2d5747" />
            <circle cx="427" cy="115" r="5" fill="#2d5747" />
          </svg>
          <span className="map-label">CONNECTED, NOT LOST.</span>
          <div className="map-north">
            N<span>↑</span>
          </div>
          <div className="signal-rings">
            <div className="map-pin">
              <Icon size={35} />
            </div>
          </div>
          <div className="map-callout">
            <span className="callout-check">
              <Icon name="check" size={18} />
            </span>
            <div>
              <strong>위치로 이어지는 안심</strong>
              <span>당신의 연결이 도움이 됩니다</span>
            </div>
          </div>
          <div className="map-bottom">
            <span>위치 연결 안내 이미지</span>
            <span>＋ ㅡㅡㅡ ＋</span>
          </div>
        </div>
      </section>
      <div className="trust-strip">
        <span>
          <Icon name="link" size={19} />
          링크 하나로 간편하게
        </span>
        <span>
          <Icon name="pin" size={19} />
          기기 GPS로 위치 확인
        </span>
        <span>
          <Icon name="shield" size={19} />
          동의 후 위치 공유
        </span>
      </div>
      <LinkHistory />
      <section id="how-it-works" className="how-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">HOW IT WORKS</span>
            <h2>세 번의 연결, 한 걸음 더 가까이.</h2>
          </div>
          <p>위치를 확인하는 분이 시작해주세요.</p>
        </div>
        <div className="how-grid">
          {[
            {
              icon: "link",
              title: "링크를 만들어요",
              text: "아래 버튼으로 위치 공유 링크를 만드세요. 개인정보 입력은 필요 없어요.",
            },
            {
              icon: "arrow",
              title: "도움이 필요한 분께 보내요",
              text: "문자나 메신저로 전달해주세요. 받은 분이 링크를 열고 위치 공유를 허용해요.",
            },
            {
              icon: "pin",
              title: "전달된 위치를 확인해요",
              text: "위치 확인 화면에서 최근 좌표와 이동 기록을 확인할 수 있어요.",
            },
          ].map((x, i) => (
            <article key={x.title}>
              <div className="how-top">
                <Icon name={x.icon} />
                <span>0{i + 1}</span>
              </div>
              <h3>{x.title}</h3>
              <p>{x.text}</p>
            </article>
          ))}
        </div>
      </section>
      <Emergency />
    </div>
  );
}
