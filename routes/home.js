const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{ //The left defines the rout
    // res.send('Hello World!!!!');//This is the responce, also called a call back function
    res.render('index',{title: 'my Express App', message:'Hello World'})
        //First argument is name of view, index in the views folder, everything else is the peramiters
});

module.exports = router