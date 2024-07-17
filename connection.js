// import mangoose
const mongoose = require('mongoose')

const connectionString =  process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log('Database connected')
    // console.log(process.env);
}).catch((err)=>{
    console.log(`Error occured due to ${err}`)
})