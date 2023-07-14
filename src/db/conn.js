const mongoose=require('mongoose');
require("dotenv").config();

mongoose.connect(`mongodb+srv://AshutoshUkale:${process.env.Passw}@registration.hn46dxa.mongodb.net/Registration?retryWrites=true&w=majority`,{
}).then(()=>{
    console.log(`Connection Successful`)
}).catch((e)=>{
    console.log(e);
})
 

 
 