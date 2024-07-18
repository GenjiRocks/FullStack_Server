const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    // User Details
    username:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true /* unique email ID */
        },
    password:{
        type: String,
        required: true,
    },
    github:{
        type: String,
        required: false,
    },
    linkedin:{
        type: String,
        required: false,
    },
    profile:{
        type: String
    }

})
const users = mongoose.model("users",userSchema)
module.exports = users