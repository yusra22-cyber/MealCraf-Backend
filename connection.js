const mongoose = require("mongoose")

const mongoDB = async(connection)=>{
      return mongoose.connect(connection,{dbName:"User"})
}

module.exports = {mongoDB}