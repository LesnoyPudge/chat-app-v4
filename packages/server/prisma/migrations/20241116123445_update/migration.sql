/*
  Warnings:

  - You are about to drop the `_ServerMembers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Server` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ServerMembers" DROP CONSTRAINT "_ServerMembers_A_fkey";

-- DropForeignKey
ALTER TABLE "_ServerMembers" DROP CONSTRAINT "_ServerMembers_B_fkey";

-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ServerMembers";

-- CreateTable
CREATE TABLE "_ServerToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ServerToUser_AB_unique" ON "_ServerToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ServerToUser_B_index" ON "_ServerToUser"("B");

-- AddForeignKey
ALTER TABLE "_ServerToUser" ADD CONSTRAINT "_ServerToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServerToUser" ADD CONSTRAINT "_ServerToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
