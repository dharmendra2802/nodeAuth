const mongoose = require('mongoose');
// const env = require('./environment');

main().catch(err=>{console.log("Error in connecting to mongoDB - "+err)});

async function main()
{
    await mongoose.connect(`mongodb://localhost:27017/${process.env.db_name}`);
    const db = mongoose.connection;

    console.log("Connected to mongoDB");

    module.exports=db;
}
