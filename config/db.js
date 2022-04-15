//mongoose
const mongoose=require('mongoose');
const config=require('config');
const connectedDB=async()=>{
    try{
await mongoose.connect(config.get('mongoURI'));
console.log("your database is being connected");
    }
    catch(e){
console.log("error");
    }
}

module.exports=connectedDB;