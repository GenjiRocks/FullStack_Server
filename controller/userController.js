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

//controller for login
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

// controller for editing profile
exports.editProfileController = async (req,res)=>{
   const userID = req.payload
   const {username,email,password,github,linkedin, profile} = req.body

   const profileImage = req.file?req.file.filename:profile
   try{
      const userProfile = await users.findByIdAndUpdate({_id:userID},
         {username,email,password,github,linkedin, profile:profileImage}
      )
      await userProfile.save()
      res.status(200).json(userProfile)
}catch(err){
   res.status(401).json(err)
}
}
