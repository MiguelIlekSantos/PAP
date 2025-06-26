/*
  Warnings:

  - Added the required column `enterpriseId` to the `Campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterpriseId` to the `Clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterpriseId` to the `Documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterpriseId` to the `Domains` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterpriseId` to the `Equipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterpriseId` to the `InternSystems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branchId` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterpriseId` to the `Reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterpriseId` to the `SocialMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterpriseId` to the `Suppliers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterpriseId` to the `Taxes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterpriseId` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterpriseId` to the `Transporters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterpriseId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterpriseId` to the `WareHouses` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Campaigns" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "leads" INTEGER NOT NULL,
    "conversions" INTEGER NOT NULL,
    "roi" REAL NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Campaigns_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Campaigns" ("conversions", "id", "leads", "name", "roi", "status", "type") SELECT "conversions", "id", "leads", "name", "roi", "status", "type" FROM "Campaigns";
DROP TABLE "Campaigns";
ALTER TABLE "new_Campaigns" RENAME TO "Campaigns";
CREATE TABLE "new_Clients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Clients_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Clients" ("address", "email", "id", "name", "phone", "type") SELECT "address", "email", "id", "name", "phone", "type" FROM "Clients";
DROP TABLE "Clients";
ALTER TABLE "new_Clients" RENAME TO "Clients";
CREATE TABLE "new_Documents" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" REAL NOT NULL,
    "path" TEXT NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Documents_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Documents" ("description", "id", "name", "path", "size", "type") SELECT "description", "id", "name", "path", "size", "type" FROM "Documents";
DROP TABLE "Documents";
ALTER TABLE "new_Documents" RENAME TO "Documents";
CREATE TABLE "new_Domains" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "registrator" TEXT NOT NULL,
    "expirationDate" DATETIME NOT NULL,
    "hosting" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Domains_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Domains" ("expirationDate", "hosting", "id", "name", "registrator", "status", "type") SELECT "expirationDate", "hosting", "id", "name", "registrator", "status", "type" FROM "Domains";
DROP TABLE "Domains";
ALTER TABLE "new_Domains" RENAME TO "Domains";
CREATE TABLE "new_Equipments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "purchaseDate" DATETIME NOT NULL,
    "warrantyEndDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Equipments_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Equipments" ("brand", "description", "id", "location", "model", "name", "purchaseDate", "serialNumber", "status", "warrantyEndDate") SELECT "brand", "description", "id", "location", "model", "name", "purchaseDate", "serialNumber", "status", "warrantyEndDate" FROM "Equipments";
DROP TABLE "Equipments";
ALTER TABLE "new_Equipments" RENAME TO "Equipments";
CREATE TABLE "new_InternSystems" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "tecnology" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "InternSystems_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_InternSystems" ("environment", "id", "name", "status", "tecnology", "type", "version") SELECT "environment", "id", "name", "status", "tecnology", "type", "version" FROM "InternSystems";
DROP TABLE "InternSystems";
ALTER TABLE "new_InternSystems" RENAME TO "InternSystems";
CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "subCategory" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "dimensions" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "wareHouseId" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,
    CONSTRAINT "Products_wareHouseId_fkey" FOREIGN KEY ("wareHouseId") REFERENCES "WareHouses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Products_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branches" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Products" ("barcode", "brand", "category", "description", "dimensions", "id", "imageUrl", "model", "name", "price", "sku", "stock", "subCategory", "wareHouseId", "weight") SELECT "barcode", "brand", "category", "description", "dimensions", "id", "imageUrl", "model", "name", "price", "sku", "stock", "subCategory", "wareHouseId", "weight" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
CREATE TABLE "new_Reports" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "lastUpdate" DATETIME NOT NULL,
    "nextUpdate" DATETIME NOT NULL,
    "downloads" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Reports_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reports" ("downloads", "frequency", "id", "lastUpdate", "name", "nextUpdate", "path", "status", "type") SELECT "downloads", "frequency", "id", "lastUpdate", "name", "nextUpdate", "path", "status", "type" FROM "Reports";
DROP TABLE "Reports";
ALTER TABLE "new_Reports" RENAME TO "Reports";
CREATE TABLE "new_SocialMedia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "platform" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "followers" INTEGER NOT NULL,
    "engagementRate" REAL NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "SocialMedia_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SocialMedia" ("engagementRate", "followers", "id", "platform", "username") SELECT "engagementRate", "followers", "id", "platform", "username" FROM "SocialMedia";
DROP TABLE "SocialMedia";
ALTER TABLE "new_SocialMedia" RENAME TO "SocialMedia";
CREATE TABLE "new_Suppliers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Suppliers_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Suppliers" ("address", "email", "id", "name", "phone") SELECT "address", "email", "id", "name", "phone" FROM "Suppliers";
DROP TABLE "Suppliers";
ALTER TABLE "new_Suppliers" RENAME TO "Suppliers";
CREATE TABLE "new_Taxes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "endDate" DATETIME NOT NULL,
    "amount" REAL NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Taxes_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Taxes" ("amount", "description", "endDate", "id", "period", "type") SELECT "amount", "description", "endDate", "id", "period", "type" FROM "Taxes";
DROP TABLE "Taxes";
ALTER TABLE "new_Taxes" RENAME TO "Taxes";
CREATE TABLE "new_Transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bankAccount" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Transactions_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transactions" ("amount", "bankAccount", "category", "date", "description", "id", "status") SELECT "amount", "bankAccount", "category", "date", "description", "id", "status" FROM "Transactions";
DROP TABLE "Transactions";
ALTER TABLE "new_Transactions" RENAME TO "Transactions";
CREATE TABLE "new_Transporters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vehicleType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "extEnterprise" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "representative" TEXT NOT NULL,
    "operationArea" TEXT NOT NULL,
    "pricePerKm" REAL NOT NULL,
    "rating" REAL NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Transporters_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transporters" ("extEnterprise", "id", "operationArea", "phone", "pricePerKm", "rating", "representative", "status", "vehicleType") SELECT "extEnterprise", "id", "operationArea", "phone", "pricePerKm", "rating", "representative", "status", "vehicleType" FROM "Transporters";
DROP TABLE "Transporters";
ALTER TABLE "new_Transporters" RENAME TO "Transporters";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "permissions" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "User_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("active", "created_at", "email", "id", "name", "password", "permissions", "role") SELECT "active", "created_at", "email", "id", "name", "password", "permissions", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE TABLE "new_WareHouses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "currentStock" INTEGER NOT NULL,
    "section" INTEGER NOT NULL,
    "responsible" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "WareHouses_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WareHouses" ("capacity", "currentStock", "id", "location", "name", "responsible", "section", "status") SELECT "capacity", "currentStock", "id", "location", "name", "responsible", "section", "status" FROM "WareHouses";
DROP TABLE "WareHouses";
ALTER TABLE "new_WareHouses" RENAME TO "WareHouses";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
