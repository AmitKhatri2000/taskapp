const express = require('express');
const bcrypt = require('bcrypt');
const users = require('../models/users');
const auth = require('../middleware/auth');
const router = new express.Router();



router.get('/profile' , auth , async(req ,res)=>{
  try {
    const user = req.user;
    const password = req.query.password;
    if (password || password === "") {
      const ismatch = await bcrypt.compare(password , user.password);
      if (!ismatch) {
       throw new Error('password not matched')
      }
     }
      res.send(user);
  } catch (e) {
    res.status(400).send(e)
  }
  
    })

router.post('/users' , async(req,res)=>{
    const user = new users(req.body)
    try {
      const token = await user.getauthtoken();
      res.cookie('jwt' , token , {
        httpOnly: true 
    })
      await user.save()
     res.status(201).send();

    } catch (e) {
    errors = await users.errorcheck(e)
    res.status(400).send(errors);

    }
    })

    

router.post('/users/login' , async(req,res)=>{
 
  try {
    const user = await users.signupcheck(req.body.username , req.body.password);
    const token = await user.getauthtoken();
    res.cookie('jwt' , token , {
      httpOnly: true 
  })
   res.status(200).send();
    } catch (e) {
    
    res.status(400).send(e.message);

  }
  })
    
    
    router.get('/update'  , auth , async(req,res)=>{
      try {
        res.render('update')
      } catch (e) {
        res.status(500).send(e);
      }  
      })
    
    
    router.patch('/update' ,auth , async(req,res)=>{
      const updates = Object.keys(req.body);
         try {
       const user = req.user;
       updates.forEach( update => {
         if (!(req.body[update] === "")) {
          user[update] = req.body[update];
         }
        
       });
     await user.save();
     res.send(user);
             } catch (e) {
          res.status(400).send(e)
    }
    
    })
    
    
    router.get('/users' , auth , async(req ,res)=>{
      try {
       const user = req.user;
       user.remove();
       res.cookie('jwt' , '' , {
        httpOnly: true , maxAge : 1 
    })   
    res.redirect('/');
      } catch (e) {
        res.status(400).send(e)
      }
      
        })

          
    router.get('/logout' , auth , async(req ,res)=>{
      try {
        res.cookie('jwt' , '' , {
        httpOnly: true , maxAge : 1 
    })   
    res.redirect('/');
      } catch (e) {
        res.status(400).send(e)
      }
      
        })

module.exports = router;