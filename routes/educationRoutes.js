
const express = require('express');
const Education = require('../models/Education');
const router = express.Router();

router.get('/', async(req, res) => {
    try{
        const educationD = await Education.find();
        res.json(educationD);
    } catch(err){
        console.log('Error fetching education', err);
        res.status(500).json({error: "failed to fetch experience"});
    }
});

module.exports = router