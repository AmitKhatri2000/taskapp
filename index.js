const express = require('express');
const path = require('path')
const bodyparser = require('body-parser')
var cookieParser = require('cookie-parser')
const userrouter = require('./routers/users');
const taskrouter = require('./routers/tasks')
const auth = require('./middleware/auth');
require('./db/mongoose')
const app = express();
const port = process.env.PORT;

app.use(bodyparser());
app.use(cookieParser())
app.use(express.static('public'))
app.use(userrouter , taskrouter);

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('login'));
app.get('/task', auth, (req, res) => res.render('task'));
app.get('/signup', (req, res) => res.render('signup'));
 
  
app.listen(port , ()=>{
console.log("connected to port " + port );
})