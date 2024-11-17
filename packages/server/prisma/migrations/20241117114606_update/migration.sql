/*
  Warnings:

  - You are about to drop the `_ServerToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ServerToUser" DROP CONSTRAINT "_ServerToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ServerToUser" DROP CONSTRAINT "_ServerToUser_B_fkey";

-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "memberId" TEXT;

-- DropTable
DROP TABLE "_ServerToUser";

-- AddForeignKey
ALTER TABLE "Server" ADD CONSTRAINT "Server_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
