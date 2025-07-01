/*
  Warnings:

  - Added the required column `enterpriseId` to the `Departments` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Departments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "responsible" TEXT,
    "totalEmployees" INTEGER,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Departments_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Departments" ("description", "id", "name", "responsible", "totalEmployees") SELECT "description", "id", "name", "responsible", "totalEmployees" FROM "Departments";
DROP TABLE "Departments";
ALTER TABLE "new_Departments" RENAME TO "Departments";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
