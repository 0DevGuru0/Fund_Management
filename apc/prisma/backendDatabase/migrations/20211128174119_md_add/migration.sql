-- CreateTable
CREATE TABLE "user_md" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "keyvalue_md" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("key")
);
