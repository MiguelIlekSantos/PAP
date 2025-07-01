/*
  Warnings:

  - You are about to drop the `_DepartmentsToSubDepartments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `departmentId` to the `SubDepartments` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_DepartmentsToSubDepartments_B_index";

-- DropIndex
DROP INDEX "_DepartmentsToSubDepartments_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_DepartmentsToSubDepartments";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SubDepartments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "responsible" TEXT,
    "totalEmployees" INTEGER,
    "departmentId" INTEGER NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "SubDepartments_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SubDepartments_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SubDepartments" ("description", "enterpriseId", "id", "name", "responsible", "totalEmployees") SELECT "description", "enterpriseId", "id", "name", "responsible", "totalEmployees" FROM "SubDepartments";
DROP TABLE "SubDepartments";
ALTER TABLE "new_SubDepartments" RENAME TO "SubDepartments";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
