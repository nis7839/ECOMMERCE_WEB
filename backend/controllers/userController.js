const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors=require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwttoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto');
const cloudinary = require("cloudinary");


//Function for registration by user

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }
    });
sendToken(user,201,res);
});

// LOGIn by user

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;

    //checking if user had provided both email and password

    if(!(email || password)){
        return next(new ErrorHandler("Please enter email and password"),400)
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }

   
    sendToken(user,200,res);

});


// logout by user

exports.logout =  catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });


    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    })
})


//Forgot password 

exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    

    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("user not found",404));
    }


    //Getting resetpassword token

    const resetToken = user.getResetPasswordToken();
    
    await user.save({validateBeforeSave:false});
    
    // req.protocol}://${req.get("host")
    // api/v1
    // process.env.FRONTEND_URL
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`    
    
  const message = `Your  password  reset token is : \n\n ${resetPasswordUrl} \n\n If you have not requested this email 
  then, please ignore it.`;

  try{
    
  await sendEmail({
  email:user.email,
  subject:`Ecommerce website Password Recovery`,
  message

  });
   res.status(200).json({
    success:true,
    message:`Email send to ${user.email} successfully`,
});
  }
  catch(error){
   user.resetPasswordToken=undefined;
   user.resetPasswordExpire = undefined;
    await user.save({validateBeforeSave:false});

    return next(new ErrorHandler(error.message,500));
  }
})

//Reset Password

exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{

    //creating token hash

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");


    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()},
    });

    if(!user){
        return next(new ErrorHandler("Reset Password token is invalid or has been expired",404));
    }

    if((req.body.password!==req.body.confirmPassword)){
        return next(new ErrorHandler("Password does not match",404));
    }

    user.password = req.body.password; 
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res);
});


// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
  
    res.status(200).json({
      success: true,
      user,
    });
  });


//Update User password


exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match", 400));
    }
  
    user.password = req.body.newPassword;
  
    await user.save();
  
    sendToken(user, 200, res);
  });


  // update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
  
    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
  
      const imageId = user.avatar.public_id;
  
      await cloudinary.v2.uploader.destroy(imageId);
  
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
  
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
  
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });
  

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      users,
    });
  });
  
  // Get single user (admin)
  exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
      );
    }
  
    res.status(200).json({
      success: true,
      user,
    });
  });


  
// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });
  
  // Delete User --Admin
  exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }
  
    // const imageId = user.avatar.public_id;
  
    // await cloudinary.v2.uploader.destroy(imageId);
  
    await user.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  });