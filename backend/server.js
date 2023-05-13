const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase= require('./config/database');
const cloudinary = require("cloudinary");
// Handling uncaught exception

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down server due to uncaught exception");
    process.exit(1);
});

// configuration
// if(process.env.NODE_ENV!=="PRODUCTION"){

    // dotenv.config({path:"backend/config/config.env"});
// }
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }
  

//connecting to the database

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


const server=app.listen(process.env.PORT,()=>{
    console.log(`server is working on https://localhost:${process.env.PORT}`)
})


// Unhandled Promise Rejection

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`),
    console.log("Shutting down the server due to unhandled Promise Rejection");
    
    server.close(()=>{
        process.exit(1);
    });

});