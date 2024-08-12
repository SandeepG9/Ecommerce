const { PrismaClient } = require('@prisma/client');
const express = require('express');
const multer = require('multer');
const createUser = require('./prisma/DatabaseQueries/UserQueries');
const checkValidUserJwtLogin = require('./middlewares/checkLoginCred');
const checksellerlog = require('./middlewares/SellerMiddlewares/checkLoginCredentials');
const getUserDetails = require('./prisma/DatabaseQueries/userGetAllproducts/getUserDetails')
const cors = require('cors');
const path = require('path');

const checkjwttoken = require('./middlewares/SellerMiddlewares/checkjwttoken');
const addProductSeller = require('./prisma/DatabaseQueries/SellerQueries/AddProducts');
const getAllProducts = require('./prisma/DatabaseQueries/userGetAllproducts/getAllproducts');
const addtoCart = require('./prisma/DatabaseQueries/userGetAllproducts/addtoCart');
const getCartProducts = require('./prisma/DatabaseQueries/userGetAllproducts/getCartProducts');
const getProductDetailsforCart = require('./prisma/DatabaseQueries/userGetAllproducts/getProductDeatilsforCart');
const app = express();
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'D:/Ecommerce/sandy/backend/uploads'); // Directory to store uploaded images
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename the file to avoid conflicts
    }
  });
  const upload = multer({ storage: storage });  

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

app.post('/seller/addproduct', checkjwttoken, upload.single('image'), async (req, res) => {
    try {
        console.log(req.file)
        addProductSeller(req,req.file.filename);
        return res.status(200).json({ message: "Product added successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error adding product" });
    }
});

app.post('/seller/login',checksellerlog,(req,res)=>{
    return res.json({token:"fdbsjhk"})
})
app.post('/seller/signup',async(req,res)=>{
    const {username,password,firstname,lastname} = req.body
    try{
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
        
        return res.status(201).json({message:"Account created Successfully"})
    }
    catch(err)
    {
        return res.status(400).json({message:"unxpected error occured"})
    }

})

app.post('/addtoCart',(req,res)=>{
    addtoCart(req,res)
})

app.get('/getallproducts',(req,res)=>{
    getAllProducts(req,res)
})

app.get('/getCartProducts',(req,res)=>{
    getCartProducts(req,res)
})
app.get("/getUserDetails",(req,res)=>{
    getUserDetails(req,res)
})

app.get('/productDetailsforCart',(req,res)=>{
    getProductDetailsforCart(req,res)
})

app.listen(3000,()=>{
    console.log("app is listening at 3000 port")
})