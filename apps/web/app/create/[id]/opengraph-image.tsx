import { ImageResponse } from "next/og";

export const alt = "Rescue Clev";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "edge";

interface RescueProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Image({ params }: RescueProps) {
  const { id } = await params;
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
        <div style={{ color: "#ffffff" }}>조난자에게 링크를 보내주세요.</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
