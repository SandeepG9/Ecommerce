/*
  Warnings:

  - Added the required column `productId` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "productId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ProductDetails" (
    "product_id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "product_description" TEXT NOT NULL,
    "product_type" TEXT NOT NULL,

    CONSTRAINT "ProductDetails_pkey" PRIMARY KEY ("product_id")
);

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_productId_fkey" FOREIGN KEY ("productId") REFERENCES "ProductDetails"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
