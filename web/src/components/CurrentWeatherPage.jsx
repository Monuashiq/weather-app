import React, { useState, useEffect } from 'react';
import CurrentWeather from './CurrentWeather';
import SearchForm from './SearchForm';

const CurrentWeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch weather data
  const fetchWeatherData = async (city) => {
    try {
      setLoading(true);
      setError(null);
      
      // Replace this URL with your actual API endpoint
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7b65932e8ab58afa3302060251dcb967`);
      
      if (!response.ok) {
        throw new Error('City not found or weather data unavailable');
      }
      
      const data = await response.json();
      
      // Format the data to match what CurrentWeather component expects
      const formattedData = {
        location: data.name,
        date: new Date().getTime(),
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed
      };
      
      setWeatherData(formattedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch default city weather on component mount
  useEffect(() => {
    fetchWeatherData('Delhi'); // Default city
  }, []);

  // Handle search form submission
  const handleSearch = (city) => {
    fetchWeatherData(city);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Weather Forecast</h1>
      
      <SearchForm onSearch={handleSearch} loading={loading} />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {loading && !weatherData && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {weatherData && <CurrentWeather data={weatherData} />}
    </div>
  );
};

export default CurrentWeatherPage;