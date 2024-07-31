const projects = require('../Model/projectModel')

exports.addProjectController = async(req,res)=>{
    console.log('inside the addprojectcontroller');
    const userID = req.payload
    console.log(userID);
    const{title,language,github,website,overview} = req.body
    const projImage = req.file.filename /* filename is used because we need filename saved in the server not the original name */
    try {
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json('Project already exists')
        }else{
            const newProject = new projects({
                title,
                language,
                github,
                website,
                overview,
                projImage,
                userID
            })
            await newProject.save()
            res.status(200).json('Project added successfully')
            
        }
            
    } catch (error) {
            res.status(401).json(error)
        
    }

  
}
exports.getAllProjectsController = async(req,res)=>{
    const searchKey = req.query.search
    console.log(searchKey)
    try {
        const query = {
            language: {$regex:searchKey,$options : 'i'}
        }
        const allprojects = await projects.find(query)
        if(allprojects){
            res.status(200).json(allprojects)
            
        }else{
            res.status(404).json('No projects found')
        }
    }catch(err){
        res.status(401).json(err)
    }
}

exports.homeProjectController = async(req,res)=>{
    try {
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.userProjectController = async(req,res)=>{
    const userID = req.payload
    try {
        const userProject = await projects.find({userID})
        if(userProject){
            res.status(200).json(userProject)
        }else{
            res.status(404).json('No projects found')
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// User controller for deleting project using deleteone
exports.deleteProjectController = async(req,res)=>{

    const {id} = req.params
    console.log(id);
    // console.log(req.params);
    try{
        const deleteProject = await projects.findByIdAndDelete({_id:id}) /* deleteone returns boolean values */
                                                            /* findByIdAndDelete - document */
            res.status(200).json(deleteProject)
        
    }catch(err){
        res.status(401).json(err)
    }
        
}

exports.editProjectController = async (req,res)=>{
    const {id} = req.params
    const {userID} = req.payload
    const {title,language,github,website,overview,projImage} = req.body
    const uploadedImage = req.file?req.file.filename:projImage
    try{
        const existingProject = await projects.findByIdAndUpdate({_id:id},{
            title,language,github,website,overview,projImage:uploadedImage,userID
        })
        await existingProject.save()
        res.status(200).json(existingProject)
    }
    catch(err){
        res.status(401).json(err)
    }

}