const mongoose = require("mongoose")
const User = require("../models/data")

const userRecepieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
     },
     category:{
        type:String,
        required:true,
        enum:["Nashta","Main Course","Rice & Biryani","Snacks","Dessert","Beverage"]
     },
     cuisineType:{
        type:String,
        default:"Pakistani"
     },
     cookingTime:{
        type:Number,
        required:true,
     },
     instructions:{
        type:[String],
        required:true,
     },
     source:{
        type:String,
        default:"user",
        immutable:true,
     },
     ingredients:[{
        ingredientName:{
            type:String,
            required:true,
        },
        quantity:{
             type:Number,
             required:true,
        },
        unit:{
            type:String,
            required:true
        },
        _id:false
      }],
     createdBY:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
     },
     isPublic:{
        type:Boolean,
        default:true,
     }

},{timestamps:true})

const userRecepie = mongoose.model("userRecepie",userRecepieSchema)

module.exports = userRecepie