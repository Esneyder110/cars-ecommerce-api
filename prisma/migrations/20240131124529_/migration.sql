/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_id_fkey";

-- AlterTable
CREATE SEQUENCE car_id_seq;
ALTER TABLE "Car" ADD COLUMN     "postId" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('car_id_seq');
ALTER SEQUENCE car_id_seq OWNED BY "Car"."id";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "carId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Car_postId_key" ON "Car"("postId");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
