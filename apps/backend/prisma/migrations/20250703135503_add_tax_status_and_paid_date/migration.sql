-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Taxes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "endDate" DATETIME NOT NULL,
    "period" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paidDate" DATETIME,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Taxes_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Taxes" ("amount", "description", "endDate", "enterpriseId", "id", "period", "type") SELECT "amount", "description", "endDate", "enterpriseId", "id", "period", "type" FROM "Taxes";
DROP TABLE "Taxes";
ALTER TABLE "new_Taxes" RENAME TO "Taxes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
