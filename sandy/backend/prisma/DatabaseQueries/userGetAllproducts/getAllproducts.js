const { PrismaClient } = require("@prisma/client")


async function getAllProducts(req,res)
{
    const prisma = new PrismaClient()
    const allProductData =await prisma.productDetail.findMany()
    const productsWithImageUrls = allProductData.map(product => ({
        ...product,
        imageUrl: `http://localhost:3000/uploads/${product.image_name}`
      }));
    res.status(200).json(productsWithImageUrls)
}


module.exports = getAllProducts