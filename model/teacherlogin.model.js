const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let teacher = new Schema({
    
       name :{type:String,required:true},
       email:{type:String,
        required:true,
        unique:true,
        match:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
       password:{type:String,required:true}
    },{
        "collection" : "teacherlogin"
    
});

teacher.plugin(uniqueValidator,{message: "Email already exists"
});

module.exports = mongoose.model("teacher",teacher);