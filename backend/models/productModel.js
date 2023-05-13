const mongoose = require('mongoose');

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter the product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter the product description"]
    },
    price:{
        type:Number,
        required:[true,"please enter the price of product"],
        maxLength:[8,"price cannot exceed more than 8 character"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
    ],
    category:{
    type:String,
    required:[true,"Please Enter the product category"],
    },
    Stock:{
        type:Number,
        required:[true,"Please enter the product Stock"],
        maxLength:[4,"Stock cannot exceed 4 character"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
              },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            }
            
        }
    ],

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model("Product",productSchema);