import React from "react";
import type { Metadata } from "next";
import { CreatedLocation } from "@/views";
import { headers } from "next/headers";
import prisma from "@rescue/prisma";
import styles from "./created.module.css";

export const metadata: Metadata = {
  title: "긴급구조 위치 공유",
  description: "조난자에게 링크를 보내주세요.",
  metadataBase: new URL("https://rescue.clev.app"),
};

export const fetchCache = "force-no-store";
interface CreateProps {
  params: {
    id: string;
  };
}

export default async function Create(props: CreateProps) {
  const {
    params: { id },
  } = props;
  await prisma.castaway.upsert({
    where: { uniqueId: id },
    create: { uniqueId: id },
    update: { uniqueId: id },
  });

  const headersList = headers();
  const headerUrl = headersList.get("x-url") || "http://localhost:3000";
  const { origin } = new URL(headerUrl);
  const link = new URL(`/rescue/${id}`, origin).href;
  const trackingUrl = new URL(`/tracking/${id}`, origin).href;
  return (
    <React.Suspense
      fallback={
        <div className={styles.container}>
          <div className={styles.eyeContainer}>
            <div className={styles.eye}></div>
          </div>
        </div>
      }
    >
      <CreatedLocation link={link} trackingLink={trackingUrl} />
    </React.Suspense>
  );
}
