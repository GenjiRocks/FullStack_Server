

exports.addProjectController = async(req,res)=>{
    console.log('inside the addprojectcontroller');
    const userID = req.payload
    console.log(userID);
    res.status(200).json('req-received')
}