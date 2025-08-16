/*
  Warnings:

  - You are about to drop the column `mark` on the `car` table. All the data in the column will be lost.
  - Added the required column `brand` to the `car` table without a default value. This is not possible if the table is not empty.

*/

ALTER TABLE "car" RENAME COLUMN "mark" TO "brand";
