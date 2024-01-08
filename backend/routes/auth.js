const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

router.post ('/createuser',[
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email','enter a valid email').isEmail(),
    body('password','password must be 5 character').isLength({ min: 5 }),
], (req , res )=>{
    // if there are errors then return bad request and errors
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}
// check if user with this email exists already
let user = User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
}).then(user => res.json(user))
.catch(err=>console.log(err),res.json({error: "please enter a unique value for email"}))
})

module.exports = router