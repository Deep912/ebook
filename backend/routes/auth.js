const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

router.post ('/createuser',[
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email','enter a valid email').isEmail(),
    body('password','password must be 5 character').isLength({ min: 5 }),
], async (req , res )=>{
    // if there are errors then return bad request and errors
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}
try {
// check if user with this email exists already
let user = await User.findOne({email: req.body.email})
if(user){
    return res.status(400).json({error: "sorry a user with this email already exists"})
}
const salt = await bcrypt.genSalt(10);
const secPass =await bcrypt.hash (req.body.password, salt )
user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: secPass,
})

res.json(user)
}catch (error){

    console.error(error.message);
    res.status(500).send("some error occured");}
}
)



// .then(user => res.json(user))
// .catch(err=>console.log(err),res.json({error: "please enter a unique value for email"}))
// })

module.exports = router