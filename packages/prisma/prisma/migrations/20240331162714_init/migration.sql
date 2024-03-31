-- CreateTable
CREATE TABLE "GeoLocation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "altitude" DOUBLE PRECISION,
    "altitudeAccuracy" DOUBLE PRECISION,
    "heading" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "speed" DOUBLE PRECISION,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "castawayId" INTEGER,

    CONSTRAINT "GeoLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Castaway" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,

    CONSTRAINT "Castaway_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Castaway_uniqueId_key" ON "Castaway"("uniqueId");

-- AddForeignKey
ALTER TABLE "GeoLocation" ADD CONSTRAINT "GeoLocation_castawayId_fkey" FOREIGN KEY ("castawayId") REFERENCES "Castaway"("id") ON DELETE SET NULL ON UPDATE CASCADE;
