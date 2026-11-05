import React from "react";
import type { Metadata } from "next";
import { CreatedLocation } from "@/views";
import { headers } from "next/headers";
import prisma from "@rescue/prisma";
import { LoadingState } from "@/components/experience/loading";

export const metadata: Metadata = {
  title: "긴급구조 위치 공유",
  description: "조난자에게 링크를 보내주세요.",
  metadataBase: new URL("https://rescue.clev.app"),
};

export const fetchCache = "force-no-store";
interface CreateProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Create(props: CreateProps) {
  const { params } = props;
  const { id } = await params;
  const created = await prisma.castaway.upsert({
    where: { uniqueId: id },
    create: { uniqueId: id },
    update: { uniqueId: id },
  });

  const headersList = await headers();
  const headerUrl = headersList.get("x-url") || "http://localhost:3000";
  const { origin } = new URL(headerUrl);
  const link = new URL(`/rescue/${id}`, origin).href;
  const trackingUrl = new URL(`/tracking/${id}`, origin).href;
  return (
    <React.Suspense fallback={<LoadingState label="링크를 만드는 중…" />}>
      <CreatedLocation
        id={id}
        createdAt={created.createdAt.toISOString()}
        link={link}
        trackingLink={trackingUrl}
      />
    </React.Suspense>
  );
}
