const { json } = require('express')
const exp= require('express')
const userApp= exp()
const cors = require('cors')
  

let userCollection
userApp.use(async(req,res,next)=>{
    let userCollection =await req.app.get('userCollection')
    next();
})

userApp.get('/test-user',async(req,res)=>{
    userCollection= req.app.get('userCollection')
    let userList= await userCollection.find().toArray()
    res.send({message:"user displayed",payload:userList})
})


userApp.post('/login-user',cors(),async(req,res)=>{
    let newUser = req.body;
    // console.log(newUser)
    
    userCollection= await req.app.get('userCollection')
    let dbUser=await userCollection.findOne({name:newUser.name})
    console.log(dbUser)
    if(dbUser===null){
        res.send({message:" User doesn't exist",payload:dbUser})
    }
    else{ 
        let text = newUser.password;
        
        // let result=text.localeCompare(newUser.password)
        if(text!==dbUser.password){
            res.send({message:'User password wrong',payload:dbUser})
        }
        else{
            res.send({message:'User login successfull',payload:dbUser})
        }
    }
})
userApp.post('/register-user',cors(),async(req,res)=>{
    let newUser=req.body
    console.log(newUser)
    userCollection =await req.app.get('userCollection')
    let dbuser = await userCollection.findOne({name:newUser.name})
    if(dbuser!==null){
        
        res.send({message:'User aldready exists please try using another username ',payload:dbuser})
    }
    else{
        await userCollection.insertOne(newUser)
        res.send({message:'user created',payload:req.body})
    }
})

module.exports=userApp;