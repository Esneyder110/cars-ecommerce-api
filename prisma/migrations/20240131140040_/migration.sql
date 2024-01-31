/*
  Warnings:

  - You are about to drop the column `image` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Car` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_postId_fkey";

-- DropIndex
DROP INDEX "Car_postId_key";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "image",
DROP COLUMN "postId",
ADD COLUMN     "images" TEXT[],
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "car_id_seq";

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_id_fkey" FOREIGN KEY ("id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
