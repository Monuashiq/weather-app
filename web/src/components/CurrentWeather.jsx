
const CurrentWeather = ({ data }) => {
  if (!data) return null;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-800">{data.location}</h2>
          <p className="text-gray-600">{formatDate(data.date || new Date())}</p>
          <div className="mt-2">
            <span className="text-4xl font-bold text-gray-800">{Math.round(data.temperature)}</span>
            <span className="ml-1 text-gray-600">°C</span>
          </div>
          <p className="text-lg text-gray-700 capitalize mt-1">{data.description}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-gray-600">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017a2 2 0 01-1.789-2.894l3.5-7A2 2 0 0114 10z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v3m0 0v3m0-3h3m-3 0H9"></path>
              </svg>
              <span>{data.windSpeed} m/s</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
              <span>{data.humidity}%</span>
            </div>
          </div>
        </div>
        <div className="weather-icon">
          <img 
            src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} 
            alt="Weather icon" 
            className="w-24 h-24"
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;



// import React, { useState, useEffect } from 'react';
// import CurrentWeather from './CurrentWeather';
// import SearchForm from './SearchForm';

// const CurrentWeatherPage = () => {
  // const [weatherData, setWeatherData] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // // Function to fetch weather data
  // const fetchWeatherData = async (city) => {
  //   try {
  //     setLoading(true);
  //     setError(null);
      
  //     // Replace this URL with your actual API endpoint
  //     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_API_KEY`);
      
  //     if (!response.ok) {
  //       throw new Error('City not found or weather data unavailable');
  //     }
      
  //     const data = await response.json();
      
  //     // Format the data to match what CurrentWeather component expects
  //     const formattedData = {
  //       location: data.name,
  //       date: new Date().getTime(),
  //       temperature: data.main.temp,
  //       description: data.weather[0].description,
  //       icon: data.weather[0].icon,
  //       humidity: data.main.humidity,
  //       windSpeed: data.wind.speed
  //     };
      
  //     setWeatherData(formattedData);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Fetch default city weather on component mount
  // useEffect(() => {
  //   fetchWeatherData('London'); // Default city
  // }, []);

  // // Handle search form submission
  // const handleSearch = (city) => {
  //   fetchWeatherData(city);
  // };

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-4xl">
//       <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Weather Forecast</h1>
      
//       <SearchForm onSearch={handleSearch} loading={loading} />
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//           {error}
//         </div>
//       )}
      
//       {loading && !weatherData && (
//         <div className="flex justify-center items-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       )}
      
//       {weatherData && <CurrentWeather data={weatherData} />}
//     </div>
//   );
// };

// export default CurrentWeatherPage;