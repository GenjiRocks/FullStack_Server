// multer
// import multer
const multer = require('multer')

// Store file
const storage = multer.diskStorage({
    // where the file is stored
    destination:(req,file,callback)=>{
        callback(null,'./uploads') /* path in which file is stored */
    },

    // by which name the file should be stored
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}` /* format of storing filename */
        callback(null,filename) /* Setting the file name */
    }
})

// File filtering
const fileFilter = (req,file,callback)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        callback(null,true)
    }else{
        return callback(new Error('only image file formats are accepted'))
    }
}

const multerConfig = multer ({
    storage,
    fileFilter,
})

module.exports = multerConfig