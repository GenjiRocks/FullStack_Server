// import dotenv
require('dotenv').config() /* config method will load environment variables
from a .env file into process.env */

// import express
const express = require('express')

// import cors
const cors = require('cors')

// import the routes - after creating routes (1)
const router = require('./routes')

// Import connection.js After mongoose setup
require('./connection')

const pfserver = express()

// use of cors - communicate between and view and server
pfserver.use(cors())

// use of express.json - to parse json data
pfserver.use(express.json()) /* returns a middleware which can parse JSON format */

// use router - after creating routes (2) - after parsing bcuz data needs to be in readable form and not JSON format
pfserver.use(router)

// Export images from the uploads folder into /upload path
pfserver.use('/uploads', express.static('./uploads'))/* first arg = folder name we using in the client side || second arg - static method to export the folder */
// static method should have the path of export folder
/* upload folder from server side to client side */

// set port for the server
port = 4000 || process.env.PORT

// listen to tge port - to resolve the request 
pfserver.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})



























// this is just for testing

/* // get request
pfserver.get('/',(req,res)=>{
    // Do the logic here send the resonpse
    res.send('get request received')
})

// put request
pfserver.put('/',(req,res)=>{
    // Do the logic here send the resonpse
    res.send('put request received')
    })

// post request
pfserver.post('/',(req,res)=>{
    // Do the logic here send the resonpse
    res.send('post request received')
    }) */