/*
  Warnings:

  - The `status` column on the `car` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `name` to the `car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `reservation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "car_status" AS ENUM ('AVAILABLE', 'RESERVED');

-- AlterTable
ALTER TABLE "car" ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "car_status" NOT NULL DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE "reservation" ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;

-- DropEnum
DROP TYPE "CarStatus";
