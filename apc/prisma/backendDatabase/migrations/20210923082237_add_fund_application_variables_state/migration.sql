-- AlterTable
ALTER TABLE "fund_applications" ADD COLUMN     "state" TEXT NOT NULL DEFAULT E'STARTED',
ADD COLUMN     "variables" JSONB NOT NULL DEFAULT E'{}';
