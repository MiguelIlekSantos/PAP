-- CreateTable
CREATE TABLE "Enterprise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "legalName" TEXT NOT NULL,
    "ComercialName" TEXT NOT NULL,
    "nif" TEXT NOT NULL,
    "niss" TEXT NOT NULL,
    "nipc" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "foundationDate" DATETIME NOT NULL,
    "registeredCountry" TEXT NOT NULL,
    "mainLanguage" TEXT NOT NULL,
    "oficialCurrency" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "logo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Branches" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "Branches_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Departments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "totalEmployees" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "SubDepartments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "totalEmployees" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,
    CONSTRAINT "SubDepartments_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Employees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "salary" REAL NOT NULL,
    "dateOfHire" DATETIME NOT NULL,
    "shiftType" TEXT NOT NULL,
    "workingHours" INTEGER NOT NULL,
    "workingDays" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,
    CONSTRAINT "Employees_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Products" (
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
    CONSTRAINT "Products_wareHouseId_fkey" FOREIGN KEY ("wareHouseId") REFERENCES "WareHouses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WareHouses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "currentStock" INTEGER NOT NULL,
    "section" INTEGER NOT NULL,
    "responsible" TEXT NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Equipments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "purchaseDate" DATETIME NOT NULL,
    "warrantyEndDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "location" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bankAccount" TEXT NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Taxes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "endDate" DATETIME NOT NULL,
    "amount" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "usedAmount" REAL NOT NULL,
    "remainingAmount" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "category" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "Sales" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Status" TEXT NOT NULL,
    "Total" REAL NOT NULL,
    "PaymentMethod" TEXT NOT NULL,
    "lastPurchase" DATETIME NOT NULL,
    "ClientId" INTEGER NOT NULL,
    CONSTRAINT "Sales_ClientId_fkey" FOREIGN KEY ("ClientId") REFERENCES "Clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Clients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "address" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Requests" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    "deliveryDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Requests_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Invoices" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "ClientId" INTEGER NOT NULL,
    "registerdate" DATETIME NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "paymentDate" DATETIME NOT NULL,
    "total" REAL NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Invoices_ClientId_fkey" FOREIGN KEY ("ClientId") REFERENCES "Clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Suppliers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Purchases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "category" TEXT NOT NULL,
    "subCategory" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "dimensions" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "supplierId" INTEGER NOT NULL,
    CONSTRAINT "Purchases_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Suppliers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transporters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vehicleType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "extEnterprise" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "representative" TEXT NOT NULL,
    "operationArea" TEXT NOT NULL,
    "pricePerKm" REAL NOT NULL,
    "rating" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Delivery" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "expectedDate" DATETIME NOT NULL,
    "deliveryDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    "transporterId" INTEGER NOT NULL,
    CONSTRAINT "Delivery_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Delivery_transporterId_fkey" FOREIGN KEY ("transporterId") REFERENCES "Transporters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "assignedTo" TEXT NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "completedAt" DATETIME NOT NULL,
    "projectId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "responsible" INTEGER NOT NULL,
    CONSTRAINT "Tasks_responsible_fkey" FOREIGN KEY ("responsible") REFERENCES "Employees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tasks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "progress" REAL NOT NULL,
    "priority" TEXT NOT NULL,
    "manager" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    CONSTRAINT "Projects_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "chatId" INTEGER NOT NULL,
    CONSTRAINT "Messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Chats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "Chats_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Documents" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" REAL NOT NULL,
    "path" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Domains" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "registrator" TEXT NOT NULL,
    "expirationDate" DATETIME NOT NULL,
    "hosting" TEXT NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "InternSystems" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "tecnology" TEXT NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "permissions" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Logs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "action" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "category" TEXT NOT NULL,
    "InternSystemId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Logs_InternSystemId_fkey" FOREIGN KEY ("InternSystemId") REFERENCES "InternSystems" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Campaigns" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "leads" INTEGER NOT NULL,
    "conversions" INTEGER NOT NULL,
    "roi" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "SocialMedia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "platform" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "followers" INTEGER NOT NULL,
    "engagementRate" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Reports" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "lastUpdate" DATETIME NOT NULL,
    "nextUpdate" DATETIME NOT NULL,
    "downloads" INTEGER NOT NULL,
    "path" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BranchesToDepartments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_BranchesToDepartments_A_fkey" FOREIGN KEY ("A") REFERENCES "Branches" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BranchesToDepartments_B_fkey" FOREIGN KEY ("B") REFERENCES "Departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_EmployeesToProjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_EmployeesToProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Employees" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EmployeesToProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProductsToSales" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProductsToSales_A_fkey" FOREIGN KEY ("A") REFERENCES "Products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductsToSales_B_fkey" FOREIGN KEY ("B") REFERENCES "Sales" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProductsToRequests" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProductsToRequests_A_fkey" FOREIGN KEY ("A") REFERENCES "Products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductsToRequests_B_fkey" FOREIGN KEY ("B") REFERENCES "Requests" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_DeliveryToProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DeliveryToProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Delivery" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DeliveryToProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SubDepartments_departmentId_key" ON "SubDepartments"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Budget_departmentId_key" ON "Budget"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Budget_subDepartmentId_key" ON "Budget"("subDepartmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Budget_projectId_key" ON "Budget"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Budget_campaignId_key" ON "Budget"("campaignId");

-- CreateIndex
CREATE UNIQUE INDEX "Budget_saleId_key" ON "Budget"("saleId");

-- CreateIndex
CREATE UNIQUE INDEX "Chats_projectId_key" ON "Chats"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "_BranchesToDepartments_AB_unique" ON "_BranchesToDepartments"("A", "B");

-- CreateIndex
CREATE INDEX "_BranchesToDepartments_B_index" ON "_BranchesToDepartments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeesToProjects_AB_unique" ON "_EmployeesToProjects"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeesToProjects_B_index" ON "_EmployeesToProjects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductsToSales_AB_unique" ON "_ProductsToSales"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductsToSales_B_index" ON "_ProductsToSales"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductsToRequests_AB_unique" ON "_ProductsToRequests"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductsToRequests_B_index" ON "_ProductsToRequests"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DeliveryToProducts_AB_unique" ON "_DeliveryToProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_DeliveryToProducts_B_index" ON "_DeliveryToProducts"("B");
