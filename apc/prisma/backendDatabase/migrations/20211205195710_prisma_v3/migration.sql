-- RenameIndex
ALTER INDEX "budget_allocations.fundApplicationId_unique" RENAME TO "budget_allocations_fundApplicationId_key";

-- RenameIndex
ALTER INDEX "budget_allocations.paymentRecordId_unique" RENAME TO "budget_allocations_paymentRecordId_key";

-- RenameIndex
ALTER INDEX "fund_applications.processInstanceId_unique" RENAME TO "fund_applications_processInstanceId_key";

-- RenameIndex
ALTER INDEX "vouchers.code_publisherId_unique" RENAME TO "vouchers_code_publisherId_key";

-- RenameIndex
ALTER INDEX "vouchers.fundApplicationId_unique" RENAME TO "vouchers_fundApplicationId_key";
