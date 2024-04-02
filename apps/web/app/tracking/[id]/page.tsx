import type { Metadata } from "next";
import prisma, { Prisma } from "@rescue/prisma";
import { Tracking } from "@/views";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "긴급구조 위치 공유",
  description: "조난자 위치를 확인하세요.",
  metadataBase: new URL("https://rescue.clev.app"),
};
interface TrackingProps {
  params: {
    id: string;
  };
}

export default async function TrackingRSC(props: TrackingProps) {
  const {
    params: { id },
  } = props;
  const headersList = headers();
  const headerUrl = headersList.get("x-url") || "http://localhost:3000";
  const { origin } = new URL(headerUrl);
  const link = new URL(`/rescue/${id}`, origin).href;
  const result = await prisma.geoLocation.findMany({
    where: { castaway: { uniqueId: { equals: id } } },
    orderBy: { createdAt: Prisma.SortOrder.desc },
  });
  return <Tracking id={id} data={result} link={link} />;
}
