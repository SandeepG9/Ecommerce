const jwt = require('jsonwebtoken')
const {PrismaClient} = require("@prisma/client")
require('dotenv').config
async function checkValidUserJwtLogin(req,res,next)
{
    const prisma = new PrismaClient()
    try
    {
        const {username,password} = req.body
        if(req.body.username!=null && req.body.password!=null && req.body.username!="" && req.body.password!="")
        {
            const exist =await prisma.user.findUnique({
                where:{
                    username:username,
                    password:password
                },})
            if(exist)
            {
                const token = jwt.sign({username:req.body.username},process.env.jwtSecretKey)
                res.status(200).json({token:token})
            next()
            }
            else
            {
                return res.status(401).json({message:"Incorrect Credentials"})
            }
        }
        else
        {
            return res.json({message:"username password cannot be empty"})
        }
    }   
    catch(err)
    {
        return res.json({"error":err})
    }
}

module.exports = checkValidUserJwtLogin