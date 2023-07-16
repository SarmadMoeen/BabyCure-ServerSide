const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/BabyCure" 
    
    
).then(()=>{
    console.log("connection successful")
}).catch(()=>{
    console.log("Not connection successful")
})