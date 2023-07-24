/*
  Warnings:

  - Added the required column `fundId` to the `policies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "policies" ADD COLUMN     "fundId" TEXT NOT NULL;
