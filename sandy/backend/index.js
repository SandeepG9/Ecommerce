const { PrismaClient } = require('@prisma/client')
const express = require('express')
const createUser = require('./prisma/DatabaseQueries/UserQueries')
const checkValidUserJwtLogin = require('./middlewares/checkLoginCred')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())


const prisma = new PrismaClient()
app.post('/createUser',async(req,res)=>{
    if(req.body.username===""||req.body.password==="")
    {
        return res.status(400).json({message:"Please fill all required fields."})
    }
    const {username,password,firstname,lastname}  = req.body
    const userCreationStatus = await createUser({username,password,firstname,lastname})
    if(userCreationStatus.message==="Account exist with username")
    {
        return res.status(404).json({message:"Account exist with username"})
    }
    else if(userCreationStatus.message==="Account does not exist with username")
    {
        const message= `Hi ${firstname} ${lastname} your account is created sucessfully`
        return res.status(201).json({message:message})
    }
    else
    {
        const message= `Hi ${firstname} ${lastname} your account is cannot create`
        return res.status(404).json({"message":message})
    }
})

app.post('/login',checkValidUserJwtLogin,(req,res)=>{
    
    return res.json({"message":token})
})

app.post('/seller',async(req,res)=>{
    const {username,password,firstname,lastname} = req.body
    const response = await prisma.Seller.findUnique({
        where:{
            username
        }
    })
    if(response!=null)
    {
        return res.status(401).json({"message":"Username already exist"})
    }
    else
    {
         await prisma.Seller.create({
            data: {
              username,
              password,
              firstname,
              lastname,
            },
          });
    }
    

    return res.json({"message":"fkjhsfjksh"})
})



app.listen(3000,()=>{
    console.log("app is listening at 3000 port")
})