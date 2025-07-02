/*
  Warnings:

  - You are about to drop the column `status` on the `car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "car" DROP COLUMN "status";

-- DropEnum
DROP TYPE "car_status";
