const getsellerDetail = require("../../../Globalfunctions/getSellertoken")
const {PrismaClient} = require("@prisma/client")

async function addProductSeller(req,image)
{
    try
    {
      console.log(req.body)
    const prisma = new PrismaClient()
    const username = getsellerDetail(req)
        const response_data = await prisma.Seller.findUnique({
            where:{
                username:username
            },
            select:{
                id:true
            },
        })
       
        const {productName,price,gender,productDescription,
            productType} = req.body
            const floatprice = parseFloat(price)
            const selleruserids = response_data.id
            const response = await prisma.ProductDetail.create({
            data: {
                productName: productName,
                price: floatprice, // Example float price
                gender: gender,
                productDescription: productDescription,
                productType: productType,
                sellerId: selleruserids, 
                image_name:image
              },})
            }
              catch(err)
              {
                console.log(err)
              }
}

module.exports = addProductSeller