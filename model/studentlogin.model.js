const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let student = new Schema({
    
       name :{type:String,required:true},
       email:{type:String,
        required:true,
        unique:true,
        match:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
       password:{type:String,required:true}
    },{
        "collection" : "studentlogin"
    
});

student.plugin(uniqueValidator,{message: "Email already exists"
});

module.exports = mongoose.model("student",student);