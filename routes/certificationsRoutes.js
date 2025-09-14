
const express = require('express');
const Certifications = require('../models/Certifications');
const router = express.Router();

router.get('/', async(req, res) => {
    try{
        const certification = await Certifications.find();
        res.json(certification);
    } catch(err){
        console.log('Error fetching certification', err);
        res.status(500).json({error: "failed to fetch experience"});
    }
});

module.exports = router