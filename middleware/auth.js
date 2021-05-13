const jwt = require('jsonwebtoken');
const users = require('../models/users') 
const auth =  async function (req,res,next) { 
try {
    const token = req.cookies.jwt; 
    const decoded = jwt.verify(token, process.env.SECRETCODE);
    const user = await users.findOne({_id : decoded.id})
    if (decoded) {
        req.user = user
        next();
    }
} catch (error) {
       res.redirect('/')
}


}

module.exports = auth