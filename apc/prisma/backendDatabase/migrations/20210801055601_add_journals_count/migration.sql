/*
  Warnings:

  - Added the required column `journalsCount` to the `journal_groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "journal_groups" ADD COLUMN     "journalsCount" INTEGER NOT NULL;
