const mongoose = require("mongoose")

const pantrySchema = new mongoose.Schema({
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
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        
},{timestamps:true})

pantrySchema.index({user:1, ingredientName:1},{unique:true})

const pantryItem = mongoose.model("pantryItem", pantrySchema)

module.exports = pantryItem