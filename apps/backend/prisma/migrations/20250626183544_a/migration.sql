/*
  Warnings:

  - You are about to drop the column `registeredCountry` on the `Enterprise` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Enterprise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "legalName" TEXT NOT NULL,
    "comercialName" TEXT,
    "registerNumber" TEXT,
    "registerCountry" TEXT,
    "registerType" TEXT,
    "type" TEXT,
    "foundationDate" DATETIME,
    "mainLanguage" TEXT,
    "oficialCurrency" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "logo" TEXT
);
INSERT INTO "new_Enterprise" ("comercialName", "email", "foundationDate", "id", "legalName", "logo", "mainLanguage", "oficialCurrency", "phone", "registerCountry", "registerNumber", "registerType", "type") SELECT "comercialName", "email", "foundationDate", "id", "legalName", "logo", "mainLanguage", "oficialCurrency", "phone", "registerCountry", "registerNumber", "registerType", "type" FROM "Enterprise";
DROP TABLE "Enterprise";
ALTER TABLE "new_Enterprise" RENAME TO "Enterprise";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
