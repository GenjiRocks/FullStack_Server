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