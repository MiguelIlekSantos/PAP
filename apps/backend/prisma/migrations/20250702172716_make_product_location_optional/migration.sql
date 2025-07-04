-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "wareHouseId" INTEGER,
    "branchId" INTEGER,
    CONSTRAINT "Products_wareHouseId_fkey" FOREIGN KEY ("wareHouseId") REFERENCES "WareHouses" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Products_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branches" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Products" ("barcode", "branchId", "brand", "category", "description", "dimensions", "id", "imageUrl", "model", "name", "price", "sku", "stock", "subCategory", "wareHouseId", "weight") SELECT "barcode", "branchId", "brand", "category", "description", "dimensions", "id", "imageUrl", "model", "name", "price", "sku", "stock", "subCategory", "wareHouseId", "weight" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
