//getting express
const express=require('express');
const app=express();


//testing
app.get("/",(req,res)=>{
    res.status(200).json({msg:"API is running"})
})
const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`server is listening at ${PORT}`)
})