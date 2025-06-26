/*
  Warnings:

  - You are about to drop the column `PaymentMethod` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `Total` on the `Sales` table. All the data in the column will be lost.
  - Added the required column `paymentMethod` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licensePlate` to the `Transporters` table without a default value. This is not possible if the table is not empty.

*/
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
    CONSTRAINT "Budget_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaigns" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Budget_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sales" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Budget" ("amount", "campaignId", "category", "createdAt", "departmentId", "id", "name", "period", "projectId", "remainingAmount", "saleId", "status", "subDepartmentId", "updatedAt", "usedAmount") SELECT "amount", "campaignId", "category", "createdAt", "departmentId", "id", "name", "period", "projectId", "remainingAmount", "saleId", "status", "subDepartmentId", "updatedAt", "usedAmount" FROM "Budget";
DROP TABLE "Budget";
ALTER TABLE "new_Budget" RENAME TO "Budget";
CREATE UNIQUE INDEX "Budget_departmentId_key" ON "Budget"("departmentId");
CREATE UNIQUE INDEX "Budget_subDepartmentId_key" ON "Budget"("subDepartmentId");
CREATE UNIQUE INDEX "Budget_projectId_key" ON "Budget"("projectId");
CREATE UNIQUE INDEX "Budget_campaignId_key" ON "Budget"("campaignId");
CREATE UNIQUE INDEX "Budget_saleId_key" ON "Budget"("saleId");
CREATE TABLE "new_Campaigns" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "status" TEXT,
    "leads" INTEGER,
    "conversions" INTEGER,
    "roi" REAL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Campaigns_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Campaigns" ("conversions", "enterpriseId", "id", "leads", "name", "roi", "status", "type") SELECT "conversions", "enterpriseId", "id", "leads", "name", "roi", "status", "type" FROM "Campaigns";
DROP TABLE "Campaigns";
ALTER TABLE "new_Campaigns" RENAME TO "Campaigns";
CREATE TABLE "new_Clients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "type" TEXT,
    "address" TEXT,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Clients_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Clients" ("address", "email", "enterpriseId", "id", "name", "phone", "type") SELECT "address", "email", "enterpriseId", "id", "name", "phone", "type" FROM "Clients";
DROP TABLE "Clients";
ALTER TABLE "new_Clients" RENAME TO "Clients";
CREATE TABLE "new_Delivery" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "expectedDate" DATETIME,
    "deliveryDate" DATETIME,
    "status" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    "transporterId" INTEGER NOT NULL,
    CONSTRAINT "Delivery_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Delivery_transporterId_fkey" FOREIGN KEY ("transporterId") REFERENCES "Transporters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Delivery" ("clientId", "deliveryDate", "expectedDate", "id", "status", "transporterId") SELECT "clientId", "deliveryDate", "expectedDate", "id", "status", "transporterId" FROM "Delivery";
DROP TABLE "Delivery";
ALTER TABLE "new_Delivery" RENAME TO "Delivery";
CREATE TABLE "new_Departments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "responsible" TEXT,
    "totalEmployees" INTEGER
);
INSERT INTO "new_Departments" ("description", "id", "name", "responsible", "totalEmployees") SELECT "description", "id", "name", "responsible", "totalEmployees" FROM "Departments";
DROP TABLE "Departments";
ALTER TABLE "new_Departments" RENAME TO "Departments";
CREATE TABLE "new_Documents" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT,
    "size" REAL,
    "path" TEXT NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Documents_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Documents" ("description", "enterpriseId", "id", "name", "path", "size", "type") SELECT "description", "enterpriseId", "id", "name", "path", "size", "type" FROM "Documents";
DROP TABLE "Documents";
ALTER TABLE "new_Documents" RENAME TO "Documents";
CREATE TABLE "new_Domains" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "registrator" TEXT,
    "expirationDate" DATETIME,
    "hosting" TEXT,
    "status" TEXT,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Domains_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Domains" ("enterpriseId", "expirationDate", "hosting", "id", "name", "registrator", "status", "type") SELECT "enterpriseId", "expirationDate", "hosting", "id", "name", "registrator", "status", "type" FROM "Domains";
DROP TABLE "Domains";
ALTER TABLE "new_Domains" RENAME TO "Domains";
CREATE TABLE "new_Employees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "position" TEXT,
    "salary" REAL,
    "dateOfHire" DATETIME,
    "shiftType" TEXT,
    "workingHours" INTEGER,
    "workingDays" INTEGER,
    "status" TEXT,
    "departmentId" INTEGER NOT NULL,
    CONSTRAINT "Employees_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employees" ("dateOfHire", "departmentId", "email", "id", "name", "phone", "position", "salary", "shiftType", "status", "workingDays", "workingHours") SELECT "dateOfHire", "departmentId", "email", "id", "name", "phone", "position", "salary", "shiftType", "status", "workingDays", "workingHours" FROM "Employees";
DROP TABLE "Employees";
ALTER TABLE "new_Employees" RENAME TO "Employees";
CREATE TABLE "new_Equipments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "description" TEXT,
    "model" TEXT,
    "brand" TEXT,
    "purchaseDate" DATETIME,
    "warrantyEndDate" DATETIME,
    "status" TEXT,
    "location" TEXT,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Equipments_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Equipments" ("brand", "description", "enterpriseId", "id", "location", "model", "name", "purchaseDate", "serialNumber", "status", "warrantyEndDate") SELECT "brand", "description", "enterpriseId", "id", "location", "model", "name", "purchaseDate", "serialNumber", "status", "warrantyEndDate" FROM "Equipments";
DROP TABLE "Equipments";
ALTER TABLE "new_Equipments" RENAME TO "Equipments";
CREATE TABLE "new_InternSystems" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "version" TEXT,
    "environment" TEXT,
    "tecnology" TEXT,
    "status" TEXT,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "InternSystems_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_InternSystems" ("enterpriseId", "environment", "id", "name", "status", "tecnology", "type", "version") SELECT "enterpriseId", "environment", "id", "name", "status", "tecnology", "type", "version" FROM "InternSystems";
DROP TABLE "InternSystems";
ALTER TABLE "new_InternSystems" RENAME TO "InternSystems";
CREATE TABLE "new_Invoices" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "ClientId" INTEGER NOT NULL,
    "registerdate" DATETIME NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "paymentDate" DATETIME NOT NULL,
    "total" REAL NOT NULL,
    "status" TEXT,
    CONSTRAINT "Invoices_ClientId_fkey" FOREIGN KEY ("ClientId") REFERENCES "Clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invoices" ("ClientId", "dueDate", "id", "number", "paymentDate", "registerdate", "status", "total") SELECT "ClientId", "dueDate", "id", "number", "paymentDate", "registerdate", "status", "total" FROM "Invoices";
DROP TABLE "Invoices";
ALTER TABLE "new_Invoices" RENAME TO "Invoices";
CREATE TABLE "new_Logs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "action" TEXT NOT NULL,
    "level" TEXT,
    "timestamp" DATETIME,
    "category" TEXT,
    "InternSystemId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Logs_InternSystemId_fkey" FOREIGN KEY ("InternSystemId") REFERENCES "InternSystems" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Logs" ("InternSystemId", "action", "category", "id", "level", "timestamp", "userId") SELECT "InternSystemId", "action", "category", "id", "level", "timestamp", "userId" FROM "Logs";
DROP TABLE "Logs";
ALTER TABLE "new_Logs" RENAME TO "Logs";
CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL,
    "stock" INTEGER,
    "category" TEXT,
    "subCategory" TEXT,
    "brand" TEXT,
    "model" TEXT,
    "sku" TEXT,
    "barcode" TEXT,
    "weight" REAL,
    "dimensions" TEXT,
    "imageUrl" TEXT,
    "wareHouseId" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,
    CONSTRAINT "Products_wareHouseId_fkey" FOREIGN KEY ("wareHouseId") REFERENCES "WareHouses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Products_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branches" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Products" ("barcode", "branchId", "brand", "category", "description", "dimensions", "id", "imageUrl", "model", "name", "price", "sku", "stock", "subCategory", "wareHouseId", "weight") SELECT "barcode", "branchId", "brand", "category", "description", "dimensions", "id", "imageUrl", "model", "name", "price", "sku", "stock", "subCategory", "wareHouseId", "weight" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
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
    CONSTRAINT "Projects_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Projects" ("clientId", "description", "endDate", "id", "manager", "name", "priority", "progress", "startDate", "status") SELECT "clientId", "description", "endDate", "id", "manager", "name", "priority", "progress", "startDate", "status" FROM "Projects";
DROP TABLE "Projects";
ALTER TABLE "new_Projects" RENAME TO "Projects";
CREATE TABLE "new_Purchases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "price" REAL,
    "category" TEXT,
    "subCategory" TEXT,
    "brand" TEXT,
    "model" TEXT,
    "sku" TEXT,
    "weight" REAL,
    "dimensions" TEXT,
    "imageUrl" TEXT,
    "supplierId" INTEGER NOT NULL,
    CONSTRAINT "Purchases_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Suppliers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Purchases" ("brand", "category", "description", "dimensions", "id", "imageUrl", "model", "name", "number", "price", "sku", "subCategory", "supplierId", "weight") SELECT "brand", "category", "description", "dimensions", "id", "imageUrl", "model", "name", "number", "price", "sku", "subCategory", "supplierId", "weight" FROM "Purchases";
DROP TABLE "Purchases";
ALTER TABLE "new_Purchases" RENAME TO "Purchases";
CREATE TABLE "new_Reports" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" TEXT,
    "frequency" TEXT,
    "status" TEXT,
    "lastUpdate" DATETIME,
    "nextUpdate" DATETIME,
    "downloads" INTEGER,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Reports_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reports" ("downloads", "enterpriseId", "frequency", "id", "lastUpdate", "name", "nextUpdate", "path", "status", "type") SELECT "downloads", "enterpriseId", "frequency", "id", "lastUpdate", "name", "nextUpdate", "path", "status", "type" FROM "Reports";
DROP TABLE "Reports";
ALTER TABLE "new_Reports" RENAME TO "Reports";
CREATE TABLE "new_Requests" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    "deliveryDate" DATETIME,
    "status" TEXT,
    CONSTRAINT "Requests_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Requests" ("clientId", "deliveryDate", "id", "number", "status") SELECT "clientId", "deliveryDate", "id", "number", "status" FROM "Requests";
DROP TABLE "Requests";
ALTER TABLE "new_Requests" RENAME TO "Requests";
CREATE TABLE "new_Sales" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total" REAL NOT NULL,
    "status" TEXT,
    "paymentMethod" TEXT NOT NULL,
    "lastPurchase" DATETIME,
    "ClientId" INTEGER NOT NULL,
    CONSTRAINT "Sales_ClientId_fkey" FOREIGN KEY ("ClientId") REFERENCES "Clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sales" ("ClientId", "id", "lastPurchase") SELECT "ClientId", "id", "lastPurchase" FROM "Sales";
DROP TABLE "Sales";
ALTER TABLE "new_Sales" RENAME TO "Sales";
CREATE TABLE "new_SocialMedia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "platform" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "followers" INTEGER,
    "engagementRate" REAL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "SocialMedia_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SocialMedia" ("engagementRate", "enterpriseId", "followers", "id", "platform", "username") SELECT "engagementRate", "enterpriseId", "followers", "id", "platform", "username" FROM "SocialMedia";
DROP TABLE "SocialMedia";
ALTER TABLE "new_SocialMedia" RENAME TO "SocialMedia";
CREATE TABLE "new_SubDepartments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "responsible" TEXT,
    "totalEmployees" INTEGER,
    "departmentId" INTEGER NOT NULL,
    CONSTRAINT "SubDepartments_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SubDepartments" ("departmentId", "description", "id", "name", "responsible", "totalEmployees") SELECT "departmentId", "description", "id", "name", "responsible", "totalEmployees" FROM "SubDepartments";
DROP TABLE "SubDepartments";
ALTER TABLE "new_SubDepartments" RENAME TO "SubDepartments";
CREATE UNIQUE INDEX "SubDepartments_departmentId_key" ON "SubDepartments"("departmentId");
CREATE TABLE "new_Suppliers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Suppliers_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Suppliers" ("address", "email", "enterpriseId", "id", "name", "phone") SELECT "address", "email", "enterpriseId", "id", "name", "phone" FROM "Suppliers";
DROP TABLE "Suppliers";
ALTER TABLE "new_Suppliers" RENAME TO "Suppliers";
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
    CONSTRAINT "Tasks_responsible_fkey" FOREIGN KEY ("responsible") REFERENCES "Employees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tasks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tasks" ("assignedTo", "completed", "completedAt", "description", "dueDate", "id", "name", "priority", "projectId", "responsible", "status") SELECT "assignedTo", "completed", "completedAt", "description", "dueDate", "id", "name", "priority", "projectId", "responsible", "status" FROM "Tasks";
DROP TABLE "Tasks";
ALTER TABLE "new_Tasks" RENAME TO "Tasks";
CREATE TABLE "new_Taxes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "endDate" DATETIME NOT NULL,
    "period" TEXT,
    "description" TEXT,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Taxes_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Taxes" ("amount", "description", "endDate", "enterpriseId", "id", "period", "type") SELECT "amount", "description", "endDate", "enterpriseId", "id", "period", "type" FROM "Taxes";
DROP TABLE "Taxes";
ALTER TABLE "new_Taxes" RENAME TO "Taxes";
CREATE TABLE "new_Transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "bankAccount" TEXT NOT NULL,
    "category" TEXT,
    "description" TEXT,
    "status" TEXT,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Transactions_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transactions" ("amount", "bankAccount", "category", "date", "description", "enterpriseId", "id", "status") SELECT "amount", "bankAccount", "category", "date", "description", "enterpriseId", "id", "status" FROM "Transactions";
DROP TABLE "Transactions";
ALTER TABLE "new_Transactions" RENAME TO "Transactions";
CREATE TABLE "new_Transporters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "licensePlate" TEXT NOT NULL,
    "vehicleType" TEXT,
    "status" TEXT,
    "extEnterprise" TEXT,
    "phone" TEXT,
    "representative" TEXT,
    "operationArea" TEXT,
    "pricePerKm" REAL,
    "rating" REAL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Transporters_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transporters" ("enterpriseId", "extEnterprise", "id", "operationArea", "phone", "pricePerKm", "rating", "representative", "status", "vehicleType") SELECT "enterpriseId", "extEnterprise", "id", "operationArea", "phone", "pricePerKm", "rating", "representative", "status", "vehicleType" FROM "Transporters";
DROP TABLE "Transporters";
ALTER TABLE "new_Transporters" RENAME TO "Transporters";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT,
    "permissions" TEXT,
    "role" TEXT,
    "active" BOOLEAN,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "User_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("active", "created_at", "email", "enterpriseId", "id", "name", "password", "permissions", "role") SELECT "active", "created_at", "email", "enterpriseId", "id", "name", "password", "permissions", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE TABLE "new_WareHouses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "capacity" INTEGER,
    "currentStock" INTEGER,
    "section" INTEGER,
    "responsible" TEXT,
    "status" TEXT,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "WareHouses_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WareHouses" ("capacity", "currentStock", "enterpriseId", "id", "location", "name", "responsible", "section", "status") SELECT "capacity", "currentStock", "enterpriseId", "id", "location", "name", "responsible", "section", "status" FROM "WareHouses";
DROP TABLE "WareHouses";
ALTER TABLE "new_WareHouses" RENAME TO "WareHouses";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
