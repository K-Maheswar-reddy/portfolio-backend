
const express = require('express');
const Profile = require('../models/Profile.js');
const router = express.Router();

// Get route for homepage
router.get('/', async(req,res) => {
    try{
        const profile = await Profile.find(); // fetch all data from collection 
        res.json(profile); // send json response
    } catch (err){
        console.log('error fetching profile data:'+ err);
        res.status(500).json({ error: "failed to fetch data"}) // return error to client
    }
})

module.exports = router