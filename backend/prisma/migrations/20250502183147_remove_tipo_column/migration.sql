/*
  Warnings:

  - You are about to drop the column `tipo` on the `principal` table. All the data in the column will be lost.
  - Made the column `typeId` on table `principal` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "principal" DROP CONSTRAINT "principal_typeId_fkey";

-- AlterTable
ALTER TABLE "principal" DROP COLUMN "tipo",
ALTER COLUMN "typeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "principal" ADD CONSTRAINT "principal_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
