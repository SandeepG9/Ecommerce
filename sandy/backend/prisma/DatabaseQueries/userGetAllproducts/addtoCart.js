const {PrismaClient} =  require('@prisma/client') 
const prisma = new PrismaClient()

async function addtoCart(req,res)
{
    const {productId,userId} = req.body
    try
    {
        const response = await prisma.cart.create({
            data:{
                productId:productId,
                UserId:userId
            }
        })
        console.log(response)
        res.status(201).json("Product Added to Cart")
    }
    catch(err)
    {
        res.status(401).json("someting went wrong")
    }
    finally
    {
        await prisma.$disconnect()
    }
}
module.exports = addtoCart