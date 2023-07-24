/*
  Warnings:

  - The values [BAD] on the enum `VoucherStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VoucherStatus_new" AS ENUM ('AVAILABLE', 'RESERVED', 'ALLOCATED', 'SUSPENDED');
ALTER TABLE "vouchers" ALTER COLUMN "status" TYPE "VoucherStatus_new" USING ("status"::text::"VoucherStatus_new");
ALTER TYPE "VoucherStatus" RENAME TO "VoucherStatus_old";
ALTER TYPE "VoucherStatus_new" RENAME TO "VoucherStatus";
DROP TYPE "VoucherStatus_old";
COMMIT;
