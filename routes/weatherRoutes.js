const express = require('express');
const router = express.Router();

// 1. Import our chef (controller) from next door
const { getWeatherData } = require('../controllers/weatherController');

// 2. Connect the URL path to our specific controller function
router.get('/weather', getWeatherData);

// 3. Export this router so our main server.js can read it
module.exports = router;