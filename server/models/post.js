const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    bloodGroup:{
        type: String,
        required:true,
    },
    bagOfBlood:{
        type:String,
        required:true,
    },
    location:
    {
        type: String,
        required:true,
    },
    contact:{
        type: String,
        required:true,
    },
  
});

const post = mongoose.model("posts",postSchema)
module.exports = post;