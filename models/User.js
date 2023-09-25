const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        enum:['Librarian','Member'],
        required:true
    },
    books:[{
        type:mongoose.Types.ObjectId,
        ref:"Books",
    }]
})

module.exports = mongoose.model("User",userSchema);