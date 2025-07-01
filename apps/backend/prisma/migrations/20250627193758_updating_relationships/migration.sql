/*
  Warnings:

  - Added the required column `enterpriseId` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Projects" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "status" TEXT,
    "progress" REAL,
    "priority" TEXT,
    "manager" TEXT,
    "clientId" INTEGER NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Projects_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Projects_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Projects" ("clientId", "description", "endDate", "id", "manager", "name", "priority", "progress", "startDate", "status") SELECT "clientId", "description", "endDate", "id", "manager", "name", "priority", "progress", "startDate", "status" FROM "Projects";
DROP TABLE "Projects";
ALTER TABLE "new_Projects" RENAME TO "Projects";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
