import { ImageResponse } from "next/og";

export const alt = "Rescue Castaway";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "edge";

interface RescueProps {
  params: {
    id: string;
  };
}

export default function Image(props: RescueProps) {
  const {
    params: { id },
  } = props;
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "#5ef791",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ color: "#eeeeee" }}>{id}</div>
        <div style={{ color: "#ffffff" }}>조난자 위치를 확인하세요.</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
