
const router = require('express').Router();
const { getCurrentWeather, getHistoricalData } = require('../../controllers/weatherController');



router.get('/current/:city', getCurrentWeather);


router.get('/history', getHistoricalData);

module.exports = router;