require("dotenv").config()
const express = require("express")
const {mongoDB} = require("./connection")
const cookieParser = require("cookie-parser")
const UserRouter = require("./routes/userLoginRegister")
const systemRouter = require("./routes/systemRecepie")
const userRouter = require("./routes/userRecepie")
const pantryRouter = require("./routes/pantryItem")
const suggestionRouter = require("./routes/pantrySuggestion")
const savedRouter = require("./routes/savedRecepie")
const cors = require("cors")


mongoDB(process.env.MONGODB_URI)
.then(()=>{
    console.log("Mongodb connected successfully")
})
.catch((err)=>{
    console.log("error connecting db",err)
    process.exit(1)
})

const app = express()
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use(cors({
    origin:["http://localhost:5173", "https://meal-craft-frontend.vercel.app"],
    credentials: true
}))

app.use("/api/auth",UserRouter)
app.use("/api/system-recepie",systemRouter)
app.use("/api/user-recepie", userRouter)
app.use("/api/pantry-item", pantryRouter)
app.use("/api/suggestion",suggestionRouter)
app.use("/api/saved-item", savedRouter)

app.listen(PORT,()=>{console.log(`Server started at PORT:${PORT}`)})