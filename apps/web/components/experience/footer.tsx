import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a href="https://inobs.io/labs/" aria-label="sophonz labs 홈페이지">
          <Image
            src="/sophonz-wordmark.svg"
            alt="sophonz"
            width={101}
            height={25}
          />
          <span className="footer-labs">labs</span>
        </a>
        <p>작은 연결이, 안전한 만남으로.</p>
      </div>
      <div className="footer-info">
        <nav aria-label="서비스 정보">
          <Link href="/privacy">개인정보 처리방침</Link>
          <a href="mailto:support@sophonz.io">문의하기</a>
        </nav>
        <p>
          © {new Date().getFullYear()} <a href="https://inobs.io">INOBS Inc.</a>
          {" · "}
          <a href="https://inobs.io/labs/">sophonz labs</a>
        </p>
      </div>
    </footer>
  );
}
