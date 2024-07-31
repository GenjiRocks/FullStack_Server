// 1, import express
const express = require('express');
// 4, import userController File
const userController = require('./controller/userController')
// import projectController File
const projectController = require('./controller/projectController') /* for the adding project details */

// import jwtmiddleware
const jwt = require('./middleware/jwtMiddleware');
const multerConfig = require('./middleware/multerMiddleware');

// 2, create an object for router class
const router = new express.Router();

// 3, set up path for each request from view
//post register request
router.post('/register', userController.registerController)

// post login request 
router.post('/login', userController.loginController)

// post Add project details request
router.post('/addproject',jwt, multerConfig.single('projectImage'), projectController.addProjectController)
             /* after passing through multer, addprojectcontroller req will have body & file object */

// all project
router.get('/allprojects', jwt, projectController.getAllProjectsController)

// home project
router.get('/homeproject',projectController.homeProjectController)

// User projects
router.get('/userproject', jwt, projectController.userProjectController)

// Delete projects
router.delete('/delete/:id', projectController.deleteProjectController)

// Editing the project
router.put('/edit-project/:id', jwt,multerConfig.single('projImage'), projectController.editProjectController)

// Editing the profile
router.put('/edit-profile', jwt, multerConfig.single('profile'), userController.editProfileController)

// 4, Export the router
module.exports = router;

