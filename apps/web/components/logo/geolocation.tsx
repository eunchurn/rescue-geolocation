import * as React from "react";
import { SVGProps } from "react";

export const Geolocation = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={256}
    height={256}
    viewBox="0 0 256 256"
    {...props}
  >
    <g
      style={{
        stroke: "none",
        strokeWidth: 0,
        strokeDasharray: "none",
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        strokeMiterlimit: 10,
        fill: "none",
        fillRule: "nonzero",
        opacity: 1,
      }}
    >
      <path
        d="M45 0C27.868 0 13.93 13.938 13.93 31.07c0 4.766 1.054 9.343 3.136 13.613 2.96 5.943 12.077 21.355 20.894 36.26l4.495 7.604A2.967 2.967 0 0 0 45 90c1.04 0 2.016-.557 2.545-1.453l4.57-7.729C60.859 66.033 69.9 50.745 72.889 44.775l.06-.116A30.779 30.779 0 0 0 76.07 31.07C76.069 13.938 62.132 0 45 0z"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: "#d12424",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
      />
      <path
        d="M45 52.821c-11.836 0-21.465-9.629-21.465-21.465S33.164 9.892 45 9.892s21.465 9.629 21.465 21.465S56.836 52.821 45 52.821z"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: "#fff",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
      />
      <path
        d="M49.69 43.726h-9.381a1 1 0 0 1-1-1v-5.679H33.63a1 1 0 0 1-1-1v-9.382a1 1 0 0 1 1-1h5.679v-5.678a1 1 0 0 1 1-1h9.381a1 1 0 0 1 1 1v5.678h5.679a1 1 0 0 1 1 1v9.382a1 1 0 0 1-1 1H50.69v5.679a1 1 0 0 1-1 1z"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: "#d12424",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
      />
    </g>
  </svg>
);
