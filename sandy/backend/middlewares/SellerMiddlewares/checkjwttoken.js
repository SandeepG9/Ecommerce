const PrismaClient = require("@prisma/client")
const jwt = require('jsonwebtoken')
function checkjwttoken(req,res,next)
{
    try
    {
        const token = req.headers['authorization']; // Use 'authorization' in lowercase
        console.log(token);

        const jsonwebtoken = token.split(' ')
        console.log(jsonwebtoken[1])
        const decode = jwt.verify(jsonwebtoken[1],process.env.jwtSecretKey)
        next()
    }
    catch(err)
    {
        res.status(401).json("Invalid Token")
    }
}


module.exports = checkjwttoken