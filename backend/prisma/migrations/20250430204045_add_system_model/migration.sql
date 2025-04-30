/*
  Warnings:

  - You are about to drop the column `console` on the `principal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "principal" DROP COLUMN "console",
ADD COLUMN     "systemId" INTEGER;

-- CreateTable
CREATE TABLE "systems" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "systems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "principal" ADD CONSTRAINT "principal_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "systems"("id") ON DELETE SET NULL ON UPDATE CASCADE;
