const weatherService = require('../services/weatherService');
const validators = require('../utils/validators');

/**
 * Get current weather for a city
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getCurrentWeather = async (req, res) => {
  try {
    const { city } = req.params;
    
    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'City name is required'
      });
    }
    
    const weatherData = await weatherService.getCurrentWeather(city);
    
    res.status(200).json({
      success: true,
      data: weatherData
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: 'City not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error fetching weather data',
      error: error.message
    });
  }
};

/**
 * Get historical weather data with filters
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getHistoricalData = async (req, res) => {
  try {
    const { location, fromDate, toDate } = req.query;
    
    // Validate date range
    const dateValidation = validators.validateDateRange(fromDate, toDate);
    if (!dateValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: dateValidation.message
      });
    }
    
    // Validate location
    const locationValidation = validators.validateLocation(location);
    if (!locationValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: locationValidation.message
      });
    }
    
    const data = await weatherService.getHistoricalData({
      location,
      fromDate,
      toDate
    });
    
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching historical data',
      error: error.message
    });
  }
};

module.exports = {
  getCurrentWeather,
  getHistoricalData
};
