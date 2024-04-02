import Image from "next/image";
import styles from "./page.module.css";
import { Logo, RescueButton } from "@/components";

function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}): JSX.Element {
  return (
    <span
      className={[
        styles.gradient,
        conic ? styles.glowConic : undefined,
        small ? styles.gradientSmall : styles.gradientLarge,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export default function Page(): JSX.Element {
  return (
    <div className={styles.main}>
      <div className={styles.description}></div>

      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.logos}>
            <div className={styles.circles}>
              <svg
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width="614"
                height="614"
              >
                <defs xmlns="http://www.w3.org/2000/svg">
                  <radialGradient id="radial" gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--gradient-radial)" offset="0"></stop>
                    <stop
                      offset="60%"
                      stopColor="var(--gradient-radial)"
                      stopOpacity="0"
                    ></stop>
                  </radialGradient>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="25"
                  strokeWidth=".2"
                  style={{ fill: "none", stroke: "var(--circle-stroke)" }}
                >
                  <animate
                    attributeName="opacity"
                    values="1;0.1;0.1;1"
                    dur="3s"
                    begin="0.2s"
                    repeatCount="indefinite"
                  ></animate>
                </circle>
                <circle
                  cx="50"
                  cy="50"
                  r="25"
                  strokeWidth=".2"
                  style={{ fill: "url(#radial)", fillOpacity: 0.1 }}
                >
                  <animate
                    attributeName="opacity"
                    values="1;0.5;0.5;1"
                    dur="3s"
                    repeatCount="indefinite"
                  ></animate>
                </circle>
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  strokeWidth=".2"
                  style={{ fill: "none", stroke: "var(--circle-stroke)" }}
                >
                  <animate
                    attributeName="opacity"
                    values="1;0.1;0.1;1"
                    dur="3s"
                    begin="0.4s"
                    repeatCount="indefinite"
                  ></animate>
                </circle>
              </svg>
            </div>
            <div className={styles.logoGradientContainer}>
              <Gradient className={styles.logoGradient} conic small />
            </div>

            <div className={styles.logo}>
              <Image
                alt="Geolocation"
                height={120}
                priority
                src="geolocation.svg"
                width={120}
                style={{ pointerEvents: "none" }}
              />
            </div>
          </div>
          <Gradient className={styles.backgroundGradient} conic />
        </div>
      </div>
      <RescueButton />
      <div style={{ height: "21px", width: "150px" }}>
        <Logo />
      </div>
    </div>
  );
}
