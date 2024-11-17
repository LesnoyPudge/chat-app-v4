/*
  Warnings:

  - You are about to drop the column `memberId` on the `Server` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Server" DROP CONSTRAINT "Server_memberId_fkey";

-- AlterTable
ALTER TABLE "Server" DROP COLUMN "memberId";

-- CreateTable
CREATE TABLE "_MembershipServers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MembershipServers_AB_unique" ON "_MembershipServers"("A", "B");

-- CreateIndex
CREATE INDEX "_MembershipServers_B_index" ON "_MembershipServers"("B");

-- AddForeignKey
ALTER TABLE "_MembershipServers" ADD CONSTRAINT "_MembershipServers_A_fkey" FOREIGN KEY ("A") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MembershipServers" ADD CONSTRAINT "_MembershipServers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
