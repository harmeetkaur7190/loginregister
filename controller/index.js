const assert = require('assert');
const student = require('../model').studentlogin;
const teacher = require('../model').teacherlogin;
const admin = require('../model').adminlogin;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const webtoken = process.env.JWT_KEY;


module.exports = {
    //student login
    register : (req,res) => {
        
       
            bcrypt.hash(req.body.password,10,(err,hash) => {
                if (err) {
                    return res.status(500).json({error:err
                    });
                }else{
                    let student1 = new student({
                    name:req.body.name,
                    email:req.body.email,
                    password: hash
                });
                student1.save().then((result) => {
                    res.status(200).json({code:201,message:"Successfully saved"});
                }).catch( (err) => {
                    let count=0;
                    switch(err.name){
                        case 'ValidationError':
                            for(field in err.errors){
                                //individual errors
                                if(count == 0){
                                    switch(err.errors[field].properties.type){
                                        case "invalid":
                                            count++;
                                            res.status(200).json({code:401,message:"Invalid format error"});
                                            break;
                                        case "unique":
                                            count++;
                                            res.status(200).json({code:402,message:"Alreday exists"});
                                            break;
                                        case "user defined":
                                            count++;
                                            res.status(200).json({code:401,message:"Invalid Format"});
                                            break;
                                        case "required":
                                            count++;
                                            res.status(200).json({code:201,message:"Fields required"});
                                            break;
                                        default:
                                            count++;
                                            res.status(200).json({code:201,message:"Fields required"});
        
                                        
                                    }
                                }
        
        
                            } 
                            break;
                        default:res.status(200).json({code:500,message:err});
                            break;
                        }
                });
            
            }
        });
        
        
},
login : (req,res) => {
    // let email = req.body.email;
    // console.log(email);
    student.findOne({
        email : req.body.email
    }).then( (student1) => {
       //console.log(student1);
        if(!student1){
            //console.log(student1.length);

            res.status(401).json({code:401,message: 'Auth failed'});
        }
        
        bcrypt.compare(req.body.password,student1.password,(err,response)=>{
            if (err){
                res.status(401).json({code:401,message: 'Auth failed'});
            }
            if (response) {
                const token = jwt.sign({
                    email:student1.email,
                    userId:student1.id
                },"Secret",
                {
                    expiresIn:"1h"
                }

                
                
                );
                res.status(200).json({
                    code:200,message:'Auth Successfull',
                    token : token
                });
            }
            // res.status(401).json({
            //     message:'Auth failed'
            // });
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(401).json({code:401,message:'Oops data is not present'});
    });
},
delete : (req,res) => {
    let id = req.params.id;
    student.findByIdAndDelete({_id : id}).then(result => {
        res.status(200).json({code:200,message:'Data deleted successfully'});

    }).catch(err => {
        
        res.status(400).json({code:400,message:'Oops data is not present'});
        


    });

},
update : (req,res) => {
    let id = req.params.id;
    let data = new student(req.body);
    student.findByIdAndUpdate({_id:id},{
        name:data.name,
        password:data.password
    },{upsert:true},(err,result) => {
        if(err){
            res.status(301).json({code:301,message:'Unable to update'});
        }else{
            res.status(200).json({code:200,message:'Updated'});
        }
    });
},
getUser : (req,res) => {
    let id = req.params.id;
    student.findById({_id:id},(err,result)=>{
        if(err){
           assert.deepStrictEqual(null,err);
        }
        res.json(result);
    });
},
getUsers : (req,res) => {
    student.find((err,result) => {
        if(err) assert.deepStrictEqual(null,err);
        res.json(result);
    });
},
//student logout


// teacher login

registerteacher : (req,res) => {
        
       
    bcrypt.hash(req.body.password,10,(err,hash) => {
        if (err) {
            return res.status(500).json({error:err
            });
        }else{
            let teacher1 = new teacher({
            name:req.body.name,
            email:req.body.email,
            password: hash
        });
        teacher1.save().then((result) => {
            res.status(200).json({code:201,message:"Successfully saved"});
        }).catch( (err) => {
            let count=0;
            switch(err.name){
                case 'ValidationError':
                    for(field in err.errors){
                        //individual errors
                        if(count == 0){
                            switch(err.errors[field].properties.type){
                                case "invalid":
                                    count++;
                                    res.status(200).json({code:401,message:"Invalid format error"});
                                    break;
                                case "unique":
                                    count++;
                                    res.status(200).json({code:402,message:"Alreday exists"});
                                    break;
                                case "user defined":
                                    count++;
                                    res.status(200).json({code:401,message:"Invalid Format"});
                                    break;
                                case "required":
                                    count++;
                                    res.status(200).json({code:201,message:"Fields required"});
                                    break;
                                default:
                                    count++;
                                    res.status(200).json({code:201,message:"Fields required"});

                                
                            }
                        }


                    } 
                    break;
                default:res.status(200).json({code:500,message:err});
                    break;
                }
        });
    
    }
});


},
loginteacher : (req,res) => {
// let email = req.body.email;
// console.log(email);
teacher.findOne({
email : req.body.email
}).then( (teacher1) => {
//console.log(student1);
if(!teacher1){
    //console.log(student1.length);

    res.status(401).json({code:401,message: 'Auth failed'});
}

bcrypt.compare(req.body.password,teacher1.password,(err,response)=>{
    if (err){
        res.status(401).json({code:401,message: 'Auth failed'});
    }
    if (response) {
        const token = jwt.sign({
            email:teacher1.email,
            userId:teacher1.id
        },"Secret",
        {
            expiresIn:"1h"
        }

        
        
        );
        res.status(200).json({
            code:200,message:'Auth Successfull',
            token : token
        });
    }
    // res.status(401).json({
    //     message:'Auth failed'
    // });
});
})
.catch((err) => {
console.log(err);
res.status(401).json({code:401,message:'Oops data is not present'});
});
},
deleteteacher : (req,res) => {
let id = req.params.id;
teacher.findByIdAndDelete({_id : id}).then(result => {
res.status(200).json({code:200,message:'Data deleted successfully'});

}).catch(err => {

res.status(400).json({code:400,message:'Oops data is not present'});



});

},
updateteacher : (req,res) => {
let id = req.params.id;
let data = new student(req.body);
teacher.findByIdAndUpdate({_id:id},{
name:data.name,
password:data.password
},{upsert:true},(err,result) => {
if(err){
    res.status(301).json({code:301,message:'Unable to update'});
}else{
    res.status(200).json({code:200,message:'Updated'});
}
});
},
getUserteacher : (req,res) => {
let id = req.params.id;
teacher.findById({_id:id},(err,result)=>{
if(err){
   assert.deepStrictEqual(null,err);
}
res.json(result);
});
},
getUsersteacher : (req,res) => {
teacher.find((err,result) => {
if(err) assert.deepStrictEqual(null,err);
res.json(result);
});
},


//out

//admin login

registeradmin : (req,res) => {
        
       
    bcrypt.hash(req.body.password,10,(err,hash) => {
        if (err) {
            return res.status(500).json({error:err
            });
        }else{
            let admin1 = new admin({
            name:req.body.name,
            email:req.body.email,
            password: hash
        });
        admin1.save().then((result) => {
            res.status(200).json({code:201,message:"Successfully saved"});
        }).catch( (err) => {
            let count=0;
            switch(err.name){
                case 'ValidationError':
                    for(field in err.errors){
                        //individual errors
                        if(count == 0){
                            switch(err.errors[field].properties.type){
                                case "invalid":
                                    count++;
                                    res.status(200).json({code:401,message:"Invalid format error"});
                                    break;
                                case "unique":
                                    count++;
                                    res.status(200).json({code:402,message:"Alreday exists"});
                                    break;
                                case "user defined":
                                    count++;
                                    res.status(200).json({code:401,message:"Invalid Format"});
                                    break;
                                case "required":
                                    count++;
                                    res.status(200).json({code:201,message:"Fields required"});
                                    break;
                                default:
                                    count++;
                                    res.status(200).json({code:201,message:"Fields required"});

                                
                            }
                        }


                    } 
                    break;
                default:res.status(200).json({code:500,message:err});
                    break;
                }
        });
    
    }
});


},
loginadmin : (req,res) => {
// let email = req.body.email;
// console.log(email);
admin.findOne({
email : req.body.email
}).then( (admin1) => {
//console.log(student1);
if(!admin1){
    //console.log(student1.length);

    res.status(401).json({code:401,message: 'Auth failed'});
}

bcrypt.compare(req.body.password,admin1.password,(err,response)=>{
    if (err){
        res.status(401).json({code:401,message: 'Auth failed'});
    }
    if (response) {
        const token = jwt.sign({
            email:admin1.email,
            userId:admin1.id
        },"Secret",
        {
            expiresIn:"1h"
        }

        
        
        );
        res.status(200).json({
            code:200,message:'Auth Successfull',
            token : token
        });
    }
    // res.status(401).json({
    //     message:'Auth failed'
    // });
});
})
.catch((err) => {
console.log(err);
res.status(401).json({code:401,message:'Oops data is not present'});
});
},
deleteadmin : (req,res) => {
let id = req.params.id;
amdin.findByIdAndDelete({_id : id}).then(result => {
res.status(200).json({code:200,message:'Data deleted successfully'});

}).catch(err => {

res.status(400).json({code:400,message:'Oops data is not present'});



});

},
updateadmin : (req,res) => {
let id = req.params.id;
let data = new admin(req.body);
admin.findByIdAndUpdate({_id:id},{
name:data.name,
password:data.password
},{upsert:true},(err,result) => {
if(err){
    res.status(301).json({code:301,message:'Unable to update'});
}else{
    res.status(200).json({code:200,message:'Updated'});
}
});
},
getUseradmin : (req,res) => {
let id = req.params.id;
admin.findById({_id:id},(err,result)=>{
if(err){
   assert.deepStrictEqual(null,err);
}
res.json(result);
});
},
getUsersadmin : (req,res) => {
admin.find((err,result) => {
if(err) assert.deepStrictEqual(null,err);
res.json(result);
});
},

//admin logout

// logout: (req,res) => {
//     res.status(200).send({student: false,token: null});
// }

// logout: (req,res) => {
//     req.student.deleteToken(req.token,(err,student) => {
//         if (err) {
//             res.status(400).send(err);
//         }
//         else{
//             res.status(200).json({code:200,message:'logout done'});
//         }
//     });
// }

};