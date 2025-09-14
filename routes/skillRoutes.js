
const express = require('express');
const Skills = require('../models/Skills');
const router = express.Router();

router.get('/', async(req, res) => {
    try{
        const skill = await Skills.find();
        res.json(skill);
    } catch(err){
        console.log('Error fetching skill', err);
        res.status(500).json({error: "failed to fetch experience"});
    }
});

module.exports = router