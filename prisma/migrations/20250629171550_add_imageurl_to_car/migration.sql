/*
  Warnings:

  - Added the required column `imageUrl` to the `car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "car" ADD COLUMN     "imageUrl" TEXT NOT NULL;
