import { PrismaClient } from "@prisma/client";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

// export const getPrisma = () => {
//   console.log("== generating prisma instance ==");
//   if (process.env.NODE_ENV === "production") {
//     neonConfig.webSocketConstructor = ws;
//     const connectionString = `${process.env.DATABASE_URL}`;

//     const pool = new Pool({ connectionString });
//     const adapter = new PrismaNeon(pool);
//     const prisma = new PrismaClient({ adapter });
//     return prisma;
//   } else {
//     const prisma = new PrismaClient();
//     return prisma;
//   }
// };

neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
export const prisma =
  process.env.NODE_ENV === "production"
    ? new PrismaClient({ adapter })
    : new PrismaClient();