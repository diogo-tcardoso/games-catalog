/*
  Warnings:

  - Added the required column `userId` to the `genre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `principal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `systems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "genre" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "principal" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "systems" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "type" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "principal" ADD CONSTRAINT "principal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "systems" ADD CONSTRAINT "systems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genre" ADD CONSTRAINT "genre_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "type" ADD CONSTRAINT "type_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
