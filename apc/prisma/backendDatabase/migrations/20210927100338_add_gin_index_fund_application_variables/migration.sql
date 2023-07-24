-- CreateIndex
CREATE INDEX "ginidx_variables" ON "fund_applications" USING GIN ("variables" jsonb_path_ops);
