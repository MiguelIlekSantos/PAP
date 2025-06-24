/*
  Warnings:

  - You are about to drop the column `ComercialName` on the `Enterprise` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Enterprise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "legalName" TEXT NOT NULL,
    "comercialName" TEXT,
    "nif" TEXT,
    "niss" TEXT,
    "nipc" TEXT,
    "type" TEXT,
    "foundationDate" DATETIME,
    "registeredCountry" TEXT,
    "mainLanguage" TEXT,
    "oficialCurrency" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "logo" TEXT
);
INSERT INTO "new_Enterprise" ("email", "foundationDate", "id", "legalName", "logo", "mainLanguage", "nif", "nipc", "niss", "oficialCurrency", "phone", "registeredCountry", "type") SELECT "email", "foundationDate", "id", "legalName", "logo", "mainLanguage", "nif", "nipc", "niss", "oficialCurrency", "phone", "registeredCountry", "type" FROM "Enterprise";
DROP TABLE "Enterprise";
ALTER TABLE "new_Enterprise" RENAME TO "Enterprise";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
