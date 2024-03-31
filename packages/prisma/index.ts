export * from "@prisma/client";
export * from "./client";
import { prisma } from "./client";

// Named export for enums to avoid vite barrel export bug (https://github.com/nrwl/nx/issues/13704)
// export {
//   UserRole,
//   UserPermission,
//   InvitationStatus,
//   CompanyStatus,
//   AccessType,
//   LicenseStatus,
//   // ActivityType,
//   ApprovalStatus,
// } from "@prisma/client";

// const prisma = getPrisma();

export default prisma;
