const express = require('express');
const path = require('path');
const app=express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
// const path = require("path");

const dotenv = require("dotenv");

const errorMiddleware = require("./middleware/error");

// dotenv.config({path:"backend/config/config.env"});
if(process.env.NODE_ENV!=="PRODUCTION"){

    dotenv.config({path:"backend/config/config.env"});
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


//Importing routes

const product=require("./routes/productRoute");

const user = require("./routes/userRoute");
 
const order = require("./routes/orderRoute");

const payment = require("./routes/paymentRoute");

const exp = require('constants');



app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1", payment);
app.use(express.static(path.join(__dirname,"../frontend/build")));
// Middleware for error

app.get("*",(req,res)=>{
    res.sendFile(path.resolve("../frontend/build/index.html"));
});
app.use(errorMiddleware);


module.exports=app;