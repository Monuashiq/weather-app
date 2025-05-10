const router = require('express').Router();
const Weather = require('../../models/Weather');
const weatherService = require('../../services/weatherService');
const mongoose = require('mongoose');

// Route to check database connection
router.get('/db-status', async (req, res) => {
  try {
    // Check MongoDB connection state
    const connectionState = mongoose.connection.readyState;
    let connectionStatus;
    
    switch (connectionState) {
      case 0:
        connectionStatus = 'Disconnected';
        break;
      case 1:
        connectionStatus = 'Connected';
        break;
      case 2:
        connectionStatus = 'Connecting';
        break;
      case 3:
        connectionStatus = 'Disconnecting';
        break;
      default:
        connectionStatus = 'Unknown';
    }
    
    // Get total count of weather records
    const recordCount = await Weather.countDocuments({});
    
    // Get sample of weather data
    const sampleData = await Weather.find().limit(3).sort({ date: -1 });
    
    res.status(200).json({
      success: true,
      data: {
        databaseConnection: connectionStatus,
        recordCount,
        sampleData
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking database status',
      error: error.message
    });
  }
});

// Route to add sample data
router.post('/add-sample-data', async (req, res) => {
  try {
    const result = await weatherService.addSampleData();
    
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Sample data added successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to add sample data'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding sample data',
      error: error.message
    });
  }
});

// Route to verify API key
router.get('/verify-api-key', (req, res) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({
      success: false,
      message: 'API key is not configured'
    });
  }
  
  // Mask most of the API key, showing only first and last few characters
  const maskedKey = `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`;
  
  res.status(200).json({
    success: true,
    message: 'API key is configured',
    data: {
      apiKey: maskedKey,
      length: apiKey.length
    }
  });
});

module.exports = router;