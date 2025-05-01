/*
  Warnings:

  - Added the required column `tipo` to the `principal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "principal" ADD COLUMN     "tipo" TEXT NOT NULL;
