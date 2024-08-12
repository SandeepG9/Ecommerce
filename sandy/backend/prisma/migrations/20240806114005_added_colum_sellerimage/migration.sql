/*
  Warnings:

  - Made the column `image_name` on table `ProductDetail` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProductDetail" ALTER COLUMN "image_name" SET NOT NULL;
