/*
  Warnings:

  - Added the required column `console` to the `principal` table without a default value. This is not possible if the table is not empty.
  - Made the column `systemId` on table `principal` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "principal" DROP CONSTRAINT "principal_systemId_fkey";

-- AlterTable
ALTER TABLE "principal" ADD COLUMN     "console" TEXT NOT NULL,
ALTER COLUMN "systemId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "principal" ADD CONSTRAINT "principal_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "systems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
