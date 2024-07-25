const jwt = require('jsonwebtoken') /* for working of verify */
// middleware is used to verify jsonwebtoken 
const jwtmiddleware = (req,res,next)=>{
    // logic
    console.log("Inside the middle");
    // access token from frontend reqheaders
    const token = req.headers.authorization.split(' ')[1]; /* since small letter authorization is shown on console || now split it into two array || and select the ID only */

    console.log(token);
    // verify the token in try catch
    try{
        const jwtresponse = jwt.verify(token,'supersecretKey');
        console.log(jwtresponse);
        req.payload = jwtresponse.userID
        next()
    }catch(err){
        res.status(401).json('Authorization failed - Please Login',err)
    }
    

}

module.exports = jwtmiddleware