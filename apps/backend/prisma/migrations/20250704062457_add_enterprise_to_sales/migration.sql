/*
  Warnings:

  - Added the required column `enterpriseId` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sales" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total" REAL NOT NULL,
    "status" TEXT,
    "paymentMethod" TEXT NOT NULL,
    "lastPurchase" DATETIME,
    "ClientId" INTEGER NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Sales_ClientId_fkey" FOREIGN KEY ("ClientId") REFERENCES "Clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Sales_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sales" ("ClientId", "id", "lastPurchase", "paymentMethod", "status", "total") SELECT "ClientId", "id", "lastPurchase", "paymentMethod", "status", "total" FROM "Sales";
DROP TABLE "Sales";
ALTER TABLE "new_Sales" RENAME TO "Sales";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
