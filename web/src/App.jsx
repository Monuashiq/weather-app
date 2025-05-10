// App.jsx
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HistoricalData from './components/HistoricalData';
// import CurrentWeather from './components/CurrentWeather';
import CurrentWeatherPage from './components/CurrentWeatherPage';

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<CurrentWeather />} />
    //   {/* <Route path="/" element={<HistoricalData />} /> */}
    // </Routes>

     <div className="container mx-auto px-4 py-6">
      <nav className="bg-white shadow-md rounded-lg mb-6">
        <ul className="flex p-4">
          <li className="mr-6">
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">Current Weather</Link>
          </li>
          <li>
            <Link to="/historical" className="text-blue-600 hover:text-blue-800 font-medium">Historical Data</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<CurrentWeatherPage />} />
        <Route path="/historical" element={<HistoricalData />} />
      </Routes>
    </div>
  );
}

export default App;