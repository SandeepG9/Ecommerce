const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')

async function getUserDetails(req,res) {
    try
    {
        const prisma = new PrismaClient()
        const token = req.headers['authorization']
        const finaltoken = token.split(' ')
        const username = jwt.verify(finaltoken[1],process.env.jwtSecretKey)
        const response =await prisma.User.findUnique({
            where:{
                username:username.username
            }
            })
            res.status(201).json(response)
    }
    catch(err)
    {
        res.status(404).json("Data not found")
    }
}

module.exports = getUserDetails