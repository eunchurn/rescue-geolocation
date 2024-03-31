import prisma, { Prisma } from "@rescue/prisma";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id)
    return Response.json({}, { status: 300, statusText: "Not found castaway" });
  const data = await prisma.geoLocation.findMany({
    where: { castaway: { uniqueId: { equals: id } } },
    orderBy: { createdAt: Prisma.SortOrder.desc },
  });
  return Response.json(data);
}

interface Data extends Omit<GeolocationPosition, "timestamp"> {
  id: string;
  timestamp: Date;
}

export async function POST(request: Request) {
  const data = (await request.json()) as Data;
  const { id, coords, timestamp } = data;
  await prisma.geoLocation.create({
    data: { ...coords, timestamp, castaway: { connect: { uniqueId: id } } },
  });
  return Response.json({ status: "success" });
}
