const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tasks = require('./tasks');
const userschema = new mongoose.Schema( {
    username : {
    type : String ,
    unique : true , 
    required : true ,
    trim : true ,
    validate(value){
    if(value.length < 4){
    throw new Error('username should be atleast four character long')
    }}},
    email:{
    type : String,
    required : true ,
    trim : true ,
    lowercase: true,
    validate(value){
    var regx = /^[^ ]+@[a-z]+\.[a-z]{2,3}$/;
    if (!value.match(regx)) {
    throw new Error('Please Enter an valid Email')
    }
    }},
    password : {
    type : String ,
    required : true ,
    trim : true ,
    validate(value){
    if (value.length < 7){
    throw new Error('password should be atleast seven character long')
    }
    
    else  {
    if(value.includes('password')){
    throw new Error('password should not contain "password"')
    }}}}
    })

    userschema.methods.getauthtoken = async function () {
    return  jwt.sign({id : this.id} , process.env.SECRETCODE)  ;
        
    }  
    
    userschema.statics.signupcheck = async (username , password)=>{
    const user = await users.findOne({username});
    if (!user) {
        throw new Error('username or password is invalid')
    }
   
     const ismatch = await bcrypt.compare(password , user.password);
   if (!ismatch) {
    throw new Error('username or password is invalid')
   }
   return user;

    }

    userschema.statics.errorcheck = async (error)=>{
      if (error.code === 11000) {
        var errors = {};
        errors.username = "this username has already been registered";
        return errors
        
      }
      const es = Object.keys(error.errors);
      var errors = {}
      es.forEach(e =>{
      errors[e] = error.errors[e].message;  
      });
      return errors
      }

    userschema.pre('save' , async function (next) {
      const user = this
      if (user.isModified('password')) {
          user.password = await bcrypt.hash(user.password, 8)
      
      }
      next()
    })

    userschema.pre('remove' , async function (next) {
      await tasks.deleteMany({owner : this._id})
      next();
    })

    const users = mongoose.model('users', userschema)
    
    module.exports = users;