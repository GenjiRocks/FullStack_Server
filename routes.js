// 1, import express
const express = require('express');
// 4, import userController File
const userController = require('./controller/userController')

// 2, create an object for router class
const router = new express.Router();

// 3, set up path for each request from view
//post register request
router.post('/register', userController.registerController)



// 4, Export the router
module.exports = router;

