-- DropForeignKey
ALTER TABLE "Server" DROP CONSTRAINT "Server_imageId_fkey";

-- AlterTable
ALTER TABLE "Server" ALTER COLUMN "imageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Server" ADD CONSTRAINT "Server_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
