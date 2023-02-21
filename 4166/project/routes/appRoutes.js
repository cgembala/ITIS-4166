const express = require('express');

const router = express.Router();

router.get('events', (req, res)=>{
    res.send('events');
});


router.get('newEvent', (req, res)=>{
    res.send('send new event form');
});






module.exports = router