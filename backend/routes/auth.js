const express = require('express')
const router = express.Router();
const User = require('../models/User');

router.post ('/', (req , res )=>{
   console.log(req.body);
   const user = User(req.body);
   user.save();
   res.send(req.body);
    res.json([])
})

module.exports = router