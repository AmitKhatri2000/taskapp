const express = require('express');
const tasks = require('../models/tasks');
const auth = require('../middleware/auth');
const { findById } = require('../models/tasks');
const router = new express.Router();

router.get('/tasks' , auth , async(req,res)=>{
  var task ;
  const id = req.user._id; 
  if (req.query.completed === 'true'){
    // completed =  req.query.completed === 'true';
    task = await tasks.find({owner:id , completed : true })
  }
  else if (req.query.completed === 'false') {
    task = await tasks.find({owner:id , completed : false })
  }
  else{
    task = await tasks.find({owner:id })
  
  }
 
  try {
      res.send(task);
   } catch (e) {
    res.status(400).send(e);
  }

})

router.post('/tasks' , auth ,  async(req,res)=>{
  const id = req.user._id; 
  const task = new tasks({
      ...req.body,
      owner: id
    })
      try {
     await task.save();
     if (true) {
      const task = await tasks.find({owner:id})
      res.send(task);
     }
    } catch (e) {
      res.status(400).send(e);
    }
    })
    
 
router.patch('/tasks/:id' , auth , async(req,res)=>{
  const updates = Object.keys(req.body);
  try {
   const task = await tasks.findById(req.params.id);
   updates.forEach(update =>{
if (!(req.body[update] === "")) {
  task[update] = req.body[update];
}
   });
    await task.save();
  } catch (e) {
    res.status(400).send(e)
  }
  
  }) 
 
  router.get('/deltasks/:id' , async(req ,res)=>{
try {
  const task =  await tasks.findById(req.params.id); 
  task.remove();
  res.redirect('/task');
} catch (error) {
  console.log(error);
}

  })

  module.exports = router;