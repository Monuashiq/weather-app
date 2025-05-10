
const WeatherTable = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
        No data available. Please adjust your filters or search for a city.
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Date</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Location</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Temperature</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Description</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Humidity</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Wind Speed</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-3 px-4">{formatDate(item.date)}</td>
              <td className="py-3 px-4">{item.location}</td>
              <td className="py-3 px-4">{Math.round(item.temperature)}°C</td>
              <td className="py-3 px-4 capitalize">{item.description}</td>
              <td className="py-3 px-4">{item.humidity}%</td>
              <td className="py-3 px-4">{item.windSpeed} m/s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherTable;