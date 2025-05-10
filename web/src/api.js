// Replace with your actual API key
const API_KEY = "7b65932e8ab58afa3302060251dcb967";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Get current weather data
export const getCurrentWeather = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      location: data.name,
      date: new Date().getTime(),
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed
    };
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
};

// Get historical weather data - This is a mock implementation
// In a real application, you would use a proper weather history API
export const getHistoricalData = async (filters) => {
  // This is a mock function since OpenWeatherMap's free tier doesn't include historical data
  // In a real app, you'd replace this with an actual API call
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const { location, fromDate, toDate } = filters;
    
    // Create mock data based on filters
    const mockData = generateMockHistoricalData(location, fromDate, toDate);
    
    return mockData;
  } catch (error) {
    console.error("Error fetching historical data:", error);
    throw error;
  }
};

// Helper function to generate mock historical weather data
function generateMockHistoricalData(location, fromDate, toDate) {
  const data = [];
  const locations = ["Delhi", "Moscow", "Paris", "New York", "Sydney", "Riyadh"];
  const weatherTypes = [
    { description: "clear sky", icon: "01d" },
    { description: "few clouds", icon: "02d" },
    { description: "scattered clouds", icon: "03d" },
    { description: "broken clouds", icon: "04d" },
    { description: "shower rain", icon: "09d" },
    { description: "rain", icon: "10d" },
    { description: "thunderstorm", icon: "11d" },
    { description: "snow", icon: "13d" },
    { description: "mist", icon: "50d" }
  ];
  
  // Convert strings to Date objects
  const start = new Date(fromDate);
  const end = new Date(toDate);
  
  // Iterate through each day in the range
  const currentDate = new Date(start);
  while (currentDate <= end) {
    // For each day, create 1-3 entries
    const entriesPerDay = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < entriesPerDay; i++) {
      const entryDate = new Date(currentDate);
      entryDate.setHours(Math.floor(Math.random() * 24)); // Random hour of the day
      
      // If location filter is provided, use it; otherwise pick a random one
      const entryLocation = location || locations[Math.floor(Math.random() * locations.length)];
      
      // Random weather condition
      const weather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
      
      // Generate random temperatures based on location
      let tempRange;
      switch (entryLocation) {
        case "Delhi":
          tempRange = [15, 35];
          break;
        case "Moscow":
          tempRange = [-10, 20];
          break;
        case "Paris":
          tempRange = [5, 25];
          break;
        case "New York":
          tempRange = [0, 30];
          break;
        case "Sydney":
          tempRange = [10, 28];
          break;
        case "Riyadh":
          tempRange = [20, 45];
          break;
        default:
          tempRange = [5, 30];
      }
      
      const temperature = tempRange[0] + Math.random() * (tempRange[1] - tempRange[0]);
      
      data.push({
        date: entryDate.toISOString(),
        location: entryLocation,
        temperature: temperature,
        description: weather.description,
        icon: weather.icon,
        humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
        windSpeed: Math.round((Math.random() * 10 + 1) * 10) / 10 // 1-11 m/s with one decimal
      });
    }
    
    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // If location filter is applied, filter the data
  const filteredData = location ? data.filter(item => item.location === location) : data;
  
  // Sort by date (newest first)
  return filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
}