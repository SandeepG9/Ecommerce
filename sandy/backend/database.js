const {Client} = require('pg')

async function connecttoDatabase()
{
    try
    {
    const client = new Client(
        {
            connectionString:'postgresql://neondb_owner:gSQoGf2IU1Nc@ep-still-brook-a5m3o81v.us-east-2.aws.neon.tech/neondb?sslmode=require'
        }
    )

    await client.connect()
    console.log("connected")
    }
    catch(err)
    {
        console.log(err)
    }
}

module.exports = connecttoDatabase