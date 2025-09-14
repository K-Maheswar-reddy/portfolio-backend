
const express = require('express');
const Experience = require('../models/Experience');
const router = express.Router();

router.get('/', async(req, res) => {
    try{
        const experience = await Experience.find();
        res.json(experience);
    } catch(err){
        console.log('Error fetching experiences', err);
        res.status(500).json({error: "failed to fetch experience"});
    }
});

module.exports = router