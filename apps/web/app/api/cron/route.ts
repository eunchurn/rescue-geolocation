import prisma from "@rescue/prisma";
import dayjs from "dayjs";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET() {
  try {
    const now = dayjs();
    const cutoffDate = now.subtract(24, "hours").toDate(); // 24시간 이전
    
    console.log(`== Current time: ${now.format()}`);
    console.log(`== Cutoff date (24 hours ago): ${dayjs(cutoffDate).format()}`);
    console.log(`== Will delete data created before: ${dayjs(cutoffDate).format()}`);
    
    // Check existing data before deletion
    const totalGeoLocations = await prisma.geoLocation.count();
    const totalCastaways = await prisma.castaway.count();
    const oldGeoLocations = await prisma.geoLocation.count({
      where: { createdAt: { lte: cutoffDate } },
    });
    const oldCastaways = await prisma.castaway.count({
      where: { createdAt: { lte: cutoffDate } },
    });
    
    console.log(`== Total geoLocations: ${totalGeoLocations}, older than 24h (to delete): ${oldGeoLocations}`);
    console.log(`== Total castaways: ${totalCastaways}, older than 24h (to delete): ${oldCastaways}`);
    
    // Delete old data
    const deletedGeoLocations = await prisma.geoLocation.deleteMany({
      where: { createdAt: { lte: cutoffDate } },
    });
    const deletedCastaways = await prisma.castaway.deleteMany({
      where: { createdAt: { lte: cutoffDate } },
    });
    
    console.log(`== deleted location ${JSON.stringify(deletedGeoLocations)}`);
    console.log(`== deleted castaway ${JSON.stringify(deletedCastaways)}`);
    
    return Response.json({
      success: true,
      deletedGeoLocations: deletedGeoLocations.count,
      deletedCastaways: deletedCastaways.count,
      cutoffDate: cutoffDate.toISOString(),
      currentTime: now.toISOString(),
    });
  } catch (error) {
    console.error("== Cron job error:", error);
    return Response.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}

export const fetchCache = "force-no-store";
