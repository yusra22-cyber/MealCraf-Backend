const mongoose = require("mongoose")

const systemSchema = new mongoose.Schema({
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
        default:"System",
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
      }]
},{timestamps:true})

const systemRecepie = mongoose.model("systemRecepie",systemSchema)

module.exports = systemRecepie