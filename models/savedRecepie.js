const mongoose = require("mongoose")

const savedSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    recipeId:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:"recipeType",
        required:true,
    },
    recipeType:{
        type:String,
        required:true,
        enum:["systemRecepie","userRecepie"]
    }

},{timestamps:true})

savedSchema.index({user:1,recipeId:1},{unique:true})
const savedRecepie = mongoose.model("savedRecepie",savedSchema)

module.exports = savedRecepie