import { CreatedLocation } from "@/views";
import { headers } from "next/headers";
import prisma from "@rescue/prisma";

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
  return <CreatedLocation link={link} trackingLink={trackingUrl} />;
}
