const  { PrismaClient } = require("@prisma/client")
const jwt = require('jsonwebtoken')
async function checkLoginCred(req,res,next)
{
    const prisma = new PrismaClient()

    const {username,password} = req.body
    const response  = await prisma.Seller.findUnique({
        where:{
            username:username,
            password:password
        }
    })
    if(response)
    {
        const token= await jwt.sign({username:username},process.env.jwtSecretKey)
        return res.status(201).json({"sellertoken":token})        
    }
    else
    {
        return res.status(404).json({message:"Incorrect Credentials"})
    }
    
}

module.exports = checkLoginCred