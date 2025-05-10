// const axios = require('axios');
// const Weather = require('../models/Weather');

// const API_KEY = process.env.OPENWEATHER_API_KEY;

// // const BASE_URL = 'https://api.openweathermap.org/data/2.5';
// const BASE_URL = 'https://pro.openweathermap.org/data/2.5/forecast/climate?lat={lat}&lon={lon}&appid={API key}';


// /**
//  * Fetch current weather data from OpenWeatherMap API
//  * @param {string} city - City name
//  * @returns {Promise} Weather data
//  */
// const getCurrentWeather = async (city) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/weather`, {
//       params: {
//         q: city,
//         appid: API_KEY,
//         units: 'metric'
//       }
//     });

//     // Extract relevant data
//     const weatherData = {
//       location: response.data.name,
//       temperature: response.data.main.temp,
//       description: response.data.weather[0].description,
//       humidity: response.data.main.humidity,
//       windSpeed: response.data.wind.speed,
//       icon: response.data.weather[0].icon
//     };

//     // Save to database
//     await saveWeatherData(weatherData);

//     return weatherData;
//   } catch (error) {
//     console.error('Error fetching weather data:', error.message);
//     throw error;
//   }
// };

// /**
//  * Save weather data to database
//  * @param {Object} weatherData - Weather data object
//  */
// const saveWeatherData = async (weatherData) => {
//   try {
//     const weather = new Weather(weatherData);
//     await weather.save();
//     console.log('Weather data saved to database');
//   } catch (error) {
//     console.error('Error saving weather data:', error.message);
//     // We'll continue even if saving fails
//   }
// };

// /**
//  * Get historical weather data from database
//  * @param {Object} filters - Filter criteria
//  * @returns {Promise} Historical weather data
//  */
// const getHistoricalData = async (filters) => {
//   try {
//     const { location, fromDate, toDate } = filters;

//     // Build query
//     const query = {};

//     if (location) {
//       query.location = location;
//     }

//     if (fromDate || toDate) {
//       query.date = {};
//       if (fromDate) {
//         query.date.$gte = new Date(fromDate);
//       }
//       if (toDate) {
//         // Add one day to include the end date in results
//         const endDate = new Date(toDate);
//         endDate.setDate(endDate.getDate() + 1);
//         query.date.$lt = endDate;
//       }
//     }

//     // Execute query
//     const data = await Weather.find(query)
//       .sort({ date: -1 })
//       .lean();

//     return data;
//   } catch (error) {
//     console.error('Error fetching historical data:', error.message);
//     throw error;
//   }
// };

// module.exports = {
//   getCurrentWeather,
//   getHistoricalData
// };

const axios = require('axios');
const Weather = require('../models/Weather');

// Get API key from environment variables
const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Log API key details for debugging
console.log('API Key configured:', API_KEY ? `${API_KEY.substring(0, 4)}...${API_KEY.substring(API_KEY.length - 4)}` : 'missing');

/**
 * Fetch current weather data from OpenWeatherMap API
 * @param {string} city - City name
 * @returns {Promise} Weather data
 */
const getCurrentWeather = async (city) => {
  try {
    console.log(`Fetching weather for: ${city}`);
    console.log(`Using API URL: ${BASE_URL}/weather with API Key: ${API_KEY ? `${API_KEY.substring(0, 4)}...` : 'missing'}`);
    
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    
    console.log('API response received:', response.status);
    
    // Extract relevant data
    const weatherData = {
      location: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      icon: response.data.weather[0].icon,
      date: new Date() // Add current date
    };
    
    // Save to database
    await saveWeatherData(weatherData);
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};

/**
 * Save weather data to database
 * @param {Object} weatherData - Weather data object
 */
const saveWeatherData = async (weatherData) => {
  try {
    const weather = new Weather(weatherData);
    const savedData = await weather.save();
    console.log('Weather data saved to database:', savedData._id);
    return savedData;
  } catch (error) {
    console.error('Error saving weather data:', error.message);
    // We'll continue even if saving fails
  }
};

/**
 * Get historical weather data from database
 * @param {Object} filters - Filter criteria
 * @returns {Promise} Historical weather data
 */
const getHistoricalData = async (filters) => {
  try {
    const { location, fromDate, toDate } = filters;
    
    // Build query
    const query = {};
    if (location) {
      query.location = location;
      console.log(`Looking for location: ${location}`);
    }
    
    if (fromDate || toDate) {
      query.date = {};
      if (fromDate) {
        query.date.$gte = new Date(fromDate);
      }
      if (toDate) {
        // Add one day to include the end date in results
        const endDate = new Date(toDate);
        endDate.setDate(endDate.getDate() + 1);
        query.date.$lt = endDate;
      }
    }
    
    console.log('Database query:', JSON.stringify(query));
    
    // Check if we have any records at all
    const totalCount = await Weather.countDocuments({});
    console.log(`Total weather records in database: ${totalCount}`);
    
    // Execute query
    const data = await Weather.find(query)
      .sort({ date: -1 })
      .lean();
      
    console.log(`Found ${data.length} matching records`);
    
    return data;
  } catch (error) {
    console.error('Error fetching historical data:', error.message);
    throw error;
  }
};

// Add a test function to add sample data if needed
const addSampleData = async () => {
  const sampleData = [
    {
      location: 'Delhi',
      temperature: 32,
      description: 'clear sky',
      humidity: 45,
      windSpeed: 3.5,
      icon: '01d',
      date: new Date()
    },
    {
      location: 'Delhi',
      temperature: 30,
      description: 'few clouds',
      humidity: 50,
      windSpeed: 2.8,
      icon: '02d',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000) // Yesterday
    }
  ];
  
  try {
    for (const data of sampleData) {
      const weather = new Weather(data);
      await weather.save();
    }
    console.log('Sample data added successfully');
    return true;
  } catch (error) {
    console.error('Error adding sample data:', error.message);
    return false;
  }
};

module.exports = {
  getCurrentWeather,
  getHistoricalData,
  addSampleData // Export the sample data function
};