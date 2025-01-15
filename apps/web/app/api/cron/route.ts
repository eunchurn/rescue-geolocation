import prisma from "@rescue/prisma";
import dayjs from "dayjs";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET() {
  const data = await prisma.geoLocation.deleteMany({
    where: { createdAt: { lte: dayjs().subtract(1, "day").toDate() } },
  });
  const castaway = await prisma.castaway.deleteMany({
    where: { createdAt: { lte: dayjs().subtract(1, "day").toDate() } },
  });
  console.log(`== deleted location ${JSON.stringify(data)}`);
  console.log(`== deleted castaway ${JSON.stringify(castaway)}`);
  return Response.json(data);
}

export const fetchCache = "force-no-store";
