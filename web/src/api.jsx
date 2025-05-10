import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL:'http://localhost:5000/api/'
});

/**
 * Fetch current weather data for a city
 * @param {string} city - City name
 * @returns {Promise} Weather data
 */
export const getCurrentWeather = async (city) => {
  try {
    const response = await api.get(`/weather/current/${encodeURIComponent(city)}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

/**
 * Get historical weather data with filters
 * @param {Object} filters - Filter criteria
 * @returns {Promise} Historical weather data
 */
export const getHistoricalData = async (filters) => {
  try {
    const { location, fromDate, toDate } = filters;
    
    // Build query params
    const params = {};
    if (location) params.location = location;
    if (fromDate) params.fromDate = fromDate;
    if (toDate) params.toDate = toDate;
    
    const response = await api.get('/weather/history', { params });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};
