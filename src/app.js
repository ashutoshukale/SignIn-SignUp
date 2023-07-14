const express=require("express");
const ejs=require("ejs");
const bodyParser=require("body-parser");
const path=require("path");
const bcrypt=require("bcryptjs");
const date = require(__dirname+"/date.js");
require("./db/conn");
const port=process.env.PORT || 3000;

const User=require("./models/signup");

const app=express();

const static=path.join(__dirname,'../public');

app.set('view engine','ejs');

app.use(express.static(static));



app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render('index');
})

app.post("/", async(req,res)=>{
    try{
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;
        if(password===cpassword){
            const registerUser= new User({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                phonenumber:req.body.phonenumber,
                email:req.body.email,   
                password:password,
                confirmpassword:cpassword,
            });

            const registered=await registerUser.save();
            res.status(201).render('index');
        }
        else{
            res.send("Passwords are not matching..");
        }

    } catch(error){
        console.log(error);
        res.status(400).send(error);
    }
});



app.post("/list",async(req,res)=>{
    try{

        const email=req.body.email;
        const password=req.body.password;
        const useremail = await User.findOne({email:email});
        const day = date.getDate();

        const isMatch=bcrypt.compare(password,useremail.password);
            if(isMatch){
                res.status(201).render("list",{listTitle:day, newListItems:[]});
            }
            else{
                res.redirect("/");
            }
        


    } catch(error){
        res.status(400).redirect("/");
    }
})



app.listen(port,()=>{
    console.log(static);
    console.log(`Server is Running on ${port}.`);
})