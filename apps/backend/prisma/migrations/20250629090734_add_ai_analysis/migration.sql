-- CreateTable
CREATE TABLE "AiAnalysis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "enterpriseId" INTEGER NOT NULL,
    "analysisDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "overallScore" INTEGER NOT NULL,
    "hrInsights" TEXT NOT NULL,
    "financialInsights" TEXT NOT NULL,
    "operationalInsights" TEXT NOT NULL,
    "strategicInsights" TEXT NOT NULL,
    "recommendations" TEXT NOT NULL,
    "trends" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AiAnalysis_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
