/*
  Warnings:

  - You are about to drop the column `productId` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the `ProductDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Seller" DROP CONSTRAINT "Seller_productId_fkey";

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "productId";

-- DropTable
DROP TABLE "ProductDetails";

-- CreateTable
CREATE TABLE "ProductDetail" (
    "productId" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "gender" TEXT NOT NULL,
    "productDescription" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "sellerId" INTEGER NOT NULL,

    CONSTRAINT "ProductDetail_pkey" PRIMARY KEY ("productId")
);

-- AddForeignKey
ALTER TABLE "ProductDetail" ADD CONSTRAINT "ProductDetail_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
