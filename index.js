const express=require("express")
const connectDB=require("./config/db")
require("dotenv").config()
const app=express();

connectDB()


app.use(express.json())
const authRoutes= require("./routes/auth")
const blogsRoutes=require("./routes/blogs")


app.use("/api",authRoutes)
app.use("/api",blogsRoutes)
const PORT=process.env.port||4051;

//all api here

app.listen(PORT,()=>{
    console.log(`server is running on port  ${PORT}`)
})