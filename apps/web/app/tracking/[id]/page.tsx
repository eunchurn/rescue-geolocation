import prisma, { Prisma } from "@rescue/prisma";
import { Tracking } from "@/views";

interface TrackingProps {
  params: {
    id: string;
  };
}

export default async function TrackingRSC(props: TrackingProps) {
  const {
    params: { id },
  } = props;
  const result = await prisma.geoLocation.findMany({
    where: { castaway: { uniqueId: { equals: id } } },
    orderBy: { createdAt: Prisma.SortOrder.desc },
  });
  return <Tracking id={id} data={result} />
}
