/*
  Warnings:

  - You are about to drop the `email_templates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "email_templates";

-- CreateTable
CREATE TABLE "message_templates" (
    "id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "channels" JSONB NOT NULL,

    PRIMARY KEY ("id")
);
