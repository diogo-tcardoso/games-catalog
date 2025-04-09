/*
  Warnings:

  - You are about to drop the column `gênero` on the `principal` table. All the data in the column will be lost.
  - Added the required column `genero` to the `principal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "principal" DROP COLUMN "gênero",
ADD COLUMN     "genero" TEXT NOT NULL;
