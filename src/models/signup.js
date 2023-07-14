const mongoose=require("mongoose");
const  bcrypt=require("bcryptjs");

const userSchema= new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    phonenumber:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true,
    },
   
});

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10);
    }
    if(this.isModified("confirmpassword")){
        this.confirmpassword= await bcrypt.hash(this.confirmpassword,10);
    }
    next();
})

const User= new mongoose.model("USER",userSchema);

module.exports = User;