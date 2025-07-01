/*
  Warnings:

  - You are about to drop the column `departmentId` on the `SubDepartments` table. All the data in the column will be lost.
  - Added the required column `enterpriseId` to the `SubDepartments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "_DepartmentsToSubDepartments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DepartmentsToSubDepartments_A_fkey" FOREIGN KEY ("A") REFERENCES "Departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DepartmentsToSubDepartments_B_fkey" FOREIGN KEY ("B") REFERENCES "SubDepartments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Budget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "usedAmount" REAL,
    "remainingAmount" REAL,
    "status" TEXT,
    "period" TEXT,
    "category" TEXT,
    "departmentId" INTEGER,
    "subDepartmentId" INTEGER,
    "projectId" INTEGER,
    "campaignId" INTEGER,
    "saleId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Budget_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Budget_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaigns" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Budget" ("amount", "campaignId", "category", "createdAt", "departmentId", "id", "name", "period", "projectId", "remainingAmount", "saleId", "status", "subDepartmentId", "updatedAt", "usedAmount") SELECT "amount", "campaignId", "category", "createdAt", "departmentId", "id", "name", "period", "projectId", "remainingAmount", "saleId", "status", "subDepartmentId", "updatedAt", "usedAmount" FROM "Budget";
DROP TABLE "Budget";
ALTER TABLE "new_Budget" RENAME TO "Budget";
CREATE UNIQUE INDEX "Budget_departmentId_key" ON "Budget"("departmentId");
CREATE UNIQUE INDEX "Budget_subDepartmentId_key" ON "Budget"("subDepartmentId");
CREATE UNIQUE INDEX "Budget_projectId_key" ON "Budget"("projectId");
CREATE UNIQUE INDEX "Budget_campaignId_key" ON "Budget"("campaignId");
CREATE UNIQUE INDEX "Budget_saleId_key" ON "Budget"("saleId");
CREATE TABLE "new_SubDepartments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "responsible" TEXT,
    "totalEmployees" INTEGER,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "SubDepartments_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SubDepartments" ("description", "id", "name", "responsible", "totalEmployees") SELECT "description", "id", "name", "responsible", "totalEmployees" FROM "SubDepartments";
DROP TABLE "SubDepartments";
ALTER TABLE "new_SubDepartments" RENAME TO "SubDepartments";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentsToSubDepartments_AB_unique" ON "_DepartmentsToSubDepartments"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentsToSubDepartments_B_index" ON "_DepartmentsToSubDepartments"("B");
