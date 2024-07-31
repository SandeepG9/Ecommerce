const {PrismaClient} = require("@prisma/client")

async function createUser({username,password,firstname,lastname})
{
    const prisma = new PrismaClient()
    try{
    if(username!=null && password!=null  && username!="" && password!="")
    {
        const exist =await prisma.user.findUnique({
            where:{
                username:username,
            },
        })
        if(exist)
        {
            return {success:true,message:"Account exist with username"}
        }
        else
        {
            await prisma.user.create({
                data:{
                    username,
                    password,
                    firstname,
                    lastname
                }}
            )
            return {success:false,message:"Account does not exist with username"}
        }
    }
    else
    {
        return {success:false,message:"something went wrong"}
    }
    }
    catch(err)
    {
        return {success:false,message:"Error creating user"}
    }
    finally
    {
        prisma.$disconnect();
    }
}

module.exports = createUser