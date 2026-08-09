require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") })
const mongoose = require("mongoose")
const systemRecepie = require("../models/systemRecepie")
const recepieData = require("../seed/recepieData.json")
const {mongoDB} = require("../connection")
const axios = require("axios")

mongoDB(process.env.MONGODB_URI)
.then(async ()=>{
   console.log("Mongodb connected successfully")


   const count = await systemRecepie.countDocuments()
   if(count>0){
    console.log("data laready added")
   }
   else{
     await systemRecepie.insertMany(recepieData)
     console.log("Data inserted sucessfuly")
   }

   mongoose.connection.close()
   process.exit()
})
.catch((err)=>{
    console.log("error connecting db",err)
    process.exit(1)
})


