/*
  Warnings:

  - You are about to drop the column `nif` on the `Enterprise` table. All the data in the column will be lost.
  - You are about to drop the column `nipc` on the `Enterprise` table. All the data in the column will be lost.
  - You are about to drop the column `niss` on the `Enterprise` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[licensePlate]` on the table `Transporters` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "_EmployeesToTasks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_EmployeesToTasks_A_fkey" FOREIGN KEY ("A") REFERENCES "Employees" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EmployeesToTasks_B_fkey" FOREIGN KEY ("B") REFERENCES "Tasks" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
    CONSTRAINT "Budget_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Budget_subDepartmentId_fkey" FOREIGN KEY ("subDepartmentId") REFERENCES "SubDepartments" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
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
CREATE TABLE "new_Enterprise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "legalName" TEXT NOT NULL,
    "comercialName" TEXT,
    "registerNumber" TEXT,
    "registerCountry" TEXT,
    "registerType" TEXT,
    "type" TEXT,
    "foundationDate" DATETIME,
    "registeredCountry" TEXT,
    "mainLanguage" TEXT,
    "oficialCurrency" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "logo" TEXT
);
INSERT INTO "new_Enterprise" ("comercialName", "email", "foundationDate", "id", "legalName", "logo", "mainLanguage", "oficialCurrency", "phone", "registeredCountry", "type") SELECT "comercialName", "email", "foundationDate", "id", "legalName", "logo", "mainLanguage", "oficialCurrency", "phone", "registeredCountry", "type" FROM "Enterprise";
DROP TABLE "Enterprise";
ALTER TABLE "new_Enterprise" RENAME TO "Enterprise";
CREATE TABLE "new_Invoices" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "ClientId" INTEGER NOT NULL,
    "registerdate" DATETIME NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "paymentDate" DATETIME,
    "total" REAL NOT NULL,
    "status" TEXT,
    CONSTRAINT "Invoices_ClientId_fkey" FOREIGN KEY ("ClientId") REFERENCES "Clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invoices" ("ClientId", "dueDate", "id", "number", "paymentDate", "registerdate", "status", "total") SELECT "ClientId", "dueDate", "id", "number", "paymentDate", "registerdate", "status", "total" FROM "Invoices";
DROP TABLE "Invoices";
ALTER TABLE "new_Invoices" RENAME TO "Invoices";
CREATE TABLE "new_Tasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "assignedTo" TEXT,
    "dueDate" DATETIME,
    "completed" BOOLEAN,
    "completedAt" DATETIME,
    "status" TEXT,
    "priority" TEXT,
    "responsible" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "Tasks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tasks" ("assignedTo", "completed", "completedAt", "description", "dueDate", "id", "name", "priority", "projectId", "responsible", "status") SELECT "assignedTo", "completed", "completedAt", "description", "dueDate", "id", "name", "priority", "projectId", "responsible", "status" FROM "Tasks";
DROP TABLE "Tasks";
ALTER TABLE "new_Tasks" RENAME TO "Tasks";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeesToTasks_AB_unique" ON "_EmployeesToTasks"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeesToTasks_B_index" ON "_EmployeesToTasks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Transporters_licensePlate_key" ON "Transporters"("licensePlate");
