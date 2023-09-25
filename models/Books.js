const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    bookName:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["AVAILABLE","BORROWED"],
        required:true,
        default:"AVAILABLE"
    }
});

module.exports = mongoose.model("Books",bookSchema);