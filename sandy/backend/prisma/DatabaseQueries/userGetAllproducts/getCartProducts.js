const  {PrismaClient} = require("@prisma/client")
const getUserDetails = require("./getUserDetails");
const jwt = require("jsonwebtoken")
async function getCartProducts(req,res)
{
    try{
    const prisma = new PrismaClient()
        const token = req.headers['authorization']
        const finaltoken = token.split(' ')
        const username = jwt.verify(finaltoken[1],process.env.jwtSecretKey)
        const UserDetails =await prisma.User.findUnique({
            where:{
                username:username.username
            }
            })
        const CartProductDetails = await prisma.Cart.findMany({
            where:{
                UserId:UserDetails.id
            }
        })
        console.log(CartProductDetails)
        res.status(201).json(CartProductDetails)
    }catch(err)
    {
        res.status(401).json({"message":"Something went wrong"})
    }
}


module.exports = getCartProducts