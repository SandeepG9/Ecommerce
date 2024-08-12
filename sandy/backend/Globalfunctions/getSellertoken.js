const jwt = require('jsonwebtoken')


function getsellerDetail(req)
{
    const token = req.headers['authorization']
    const splittedtoken = token.split(' ')
    const finaltoken = splittedtoken[1]
    const username = jwt.verify(finaltoken,process.env.jwtSecretKey)
    return username.username
}

module.exports = getsellerDetail