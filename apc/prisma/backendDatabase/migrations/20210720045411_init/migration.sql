-- Add Extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- CreateEnum
CREATE TYPE "VoucherStatus" AS ENUM ('AVAILABLE', 'RESERVED', 'ALLOCATED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "BudgetAllocationStatus" AS ENUM ('RESERVED', 'ALLOCATED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PolicyType" AS ENUM ('VOUCHER', 'INVOICE', 'MANUAL');

-- CreateTable
CREATE TABLE "_Migration" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "run_on" TIMESTAMP(6) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fund_applications" (
    "id" SERIAL NOT NULL,
    "articleTitle" TEXT NOT NULL,
    "articleFile" JSONB NOT NULL,
    "userId" TEXT NOT NULL,
    "policyId" UUID NOT NULL,
    "processInstanceId" UUID NOT NULL,
    "fundId" TEXT NOT NULL,
    "publisherId" TEXT NOT NULL,
    "journalId" TEXT NOT NULL,
    "affiliationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "policies" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" "PolicyType" NOT NULL,
    "title" TEXT NOT NULL,
    "publisherId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "note" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journal_groups" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "fundId" TEXT NOT NULL,
    "publisherId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journals_of_journal_groups" (
    "journalGroupId" UUID NOT NULL,
    "journalId" TEXT NOT NULL,
    "batchId" UUID NOT NULL,
    "assignedBy" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("journalGroupId","journalId")
);

-- CreateTable
CREATE TABLE "journal_groups_of_policies" (
    "policyId" UUID NOT NULL,
    "journalGroupId" UUID NOT NULL,
    "assignedBy" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("policyId","journalGroupId")
);

-- CreateTable
CREATE TABLE "vouchers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "status" "VoucherStatus" NOT NULL,
    "code" TEXT NOT NULL,
    "policyId" UUID NOT NULL,
    "publisherId" TEXT NOT NULL,
    "usableAfter" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "allocatedAt" TIMESTAMP(3),
    "lastReservedAt" TIMESTAMP(3),
    "batchId" UUID NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fundApplicationId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_allocations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "status" "BudgetAllocationStatus" NOT NULL,
    "policyId" UUID NOT NULL,
    "originalAmount" BIGINT NOT NULL,
    "acceptedAmount" BIGINT NOT NULL,
    "currency" TEXT NOT NULL,
    "paymentRecordId" UUID,
    "fundApplicationId" INTEGER NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_records" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "amount" BIGINT NOT NULL,
    "currency" TEXT NOT NULL,
    "receipt" JSONB NOT NULL,
    "accountDetails" JSONB NOT NULL,
    "trackingCode" TEXT NOT NULL,
    "note" TEXT,
    "paidBy" TEXT NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_templates" (
    "id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "cc" TEXT,
    "bcc" TEXT,
    "subject" TEXT NOT NULL,
    "title" TEXT,
    "body" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fund_applications.processInstanceId_unique" ON "fund_applications"("processInstanceId");

-- CreateIndex
CREATE UNIQUE INDEX "vouchers.fundApplicationId_unique" ON "vouchers"("fundApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "vouchers.code_publisherId_unique" ON "vouchers"("code", "publisherId");

-- CreateIndex
CREATE UNIQUE INDEX "budget_allocations.paymentRecordId_unique" ON "budget_allocations"("paymentRecordId");

-- CreateIndex
CREATE UNIQUE INDEX "budget_allocations.fundApplicationId_unique" ON "budget_allocations"("fundApplicationId");

-- AddForeignKey
ALTER TABLE "fund_applications" ADD FOREIGN KEY ("policyId") REFERENCES "policies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journals_of_journal_groups" ADD FOREIGN KEY ("journalGroupId") REFERENCES "journal_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_groups_of_policies" ADD FOREIGN KEY ("policyId") REFERENCES "policies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_groups_of_policies" ADD FOREIGN KEY ("journalGroupId") REFERENCES "journal_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vouchers" ADD FOREIGN KEY ("policyId") REFERENCES "policies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vouchers" ADD FOREIGN KEY ("fundApplicationId") REFERENCES "fund_applications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_allocations" ADD FOREIGN KEY ("policyId") REFERENCES "policies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_allocations" ADD FOREIGN KEY ("paymentRecordId") REFERENCES "payment_records"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_allocations" ADD FOREIGN KEY ("fundApplicationId") REFERENCES "fund_applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
