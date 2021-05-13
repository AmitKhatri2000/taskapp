const mongoose = require('mongoose');

const tasks = mongoose.model('tasks' , {
     discription : {
    type : String,
    required : true ,
    trim : true
    },
    completed : {
    type : Boolean ,
    default : false
    },
    owner:{
     type : mongoose.Schema.Types.ObjectId,
     required : true
    }
     })
    
    module.exports = tasks;