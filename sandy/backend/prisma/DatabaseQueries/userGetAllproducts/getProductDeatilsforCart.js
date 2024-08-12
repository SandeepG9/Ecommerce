const  {PrismaClient} = require("@prisma/client")
const getUserDetails = require("./getUserDetails");
const jwt = require("jsonwebtoken")
async function getProductDetailsforCart(req,res)
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
                where: {
                    UserId: UserDetails.id
                }    
            });
            
            let eachproduct=[];  // Initialize an empty array
            
            // Use map to handle each product asynchronously
            const dataPromises = CartProductDetails.map(async (product) => {
                const productDetails = await prisma.productDetail.findMany({
                    where: {
                        productId: product.productId
                    }    
                });
                
                
                eachproduct.push(productDetails);  // Push the resolved product details into the array
            });
            
            // Wait for all promises to resolve
            await Promise.all(dataPromises);
            const flatArray = eachproduct.flat()
            const productsWithImageUrls = flatArray.map(product => ({
                ...product,
                imageUrl: `http://localhost:3000/uploads/${product.image_name}`
              }));
              console.log(productsWithImageUrls)
             res.status(201).json(productsWithImageUrls)
    }catch(err)
    {
        res.status(401).json({"message":"Something went wrong"})
    }
}


module.exports = getProductDetailsforCart