// jwt tokens
const jwt = require('jsonwebtoken');

const users = require('../Model/userModel')

// controller for Resgister
 exports.registerController = async (req,res)=>{
    const{username, email, password} = req.body
   //  console.log(username,email,password);
   //  res.status(200).json('register req received')
   try{
      const exsistingUser = await users.findOne({email})
      if(exsistingUser){
         res.status(406).json({message:'user already exist with this email'}) /* 406 - unprocessable entity */
   }
   else{
      const newUser = new users({
         username,
         email,
         password,
         github:"",
         linkedin:"",
         profile:""
      })
      // save() - to store data in mongoDB
      await newUser.save()
      res.status(200).json(newUser)

   } 
 } catch(error){
   req.status(401).json(`registration failed due to ${error}`)
 }

}

// login
exports.loginController = async (req,res)=>{
   const{email,password} = req.body
   try{
      const exsistingUser = await users.findOne({email,password})
      if(exsistingUser){
         const token = jwt.sign({userID:exsistingUser._id},'supersecretKey')
         res.status(200).json({exsistingUser,token})
         }
      else{
         res.status(406).json('invalid email or password')
      }
      } catch(error){
         res.status(401).json(error)
         }
      }