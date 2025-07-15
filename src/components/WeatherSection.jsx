import React, { useState } from 'react';

function WeatherSection() {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const baseUrl =
  import.meta.env.VITE_API_BASE_URL        // ⬅ value at build time
  ?? 'http://localhost:3001'; 

  const handleFetchWeather = async () => {
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      // Replace with your actual API URL and key
      const response = await fetch(
        `${baseUrl}/api/weather?city=${city}&state=${state}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather.');
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message || 'Error fetching weather data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-12 px-6 bg-blue-100 border-b border-gray-300">
      <h2 className="text-2xl font-bold mb-4">Weather Lookup</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 rounded border border-gray-400"
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="p-2 rounded border border-gray-400"
        />
        <button
          onClick={handleFetchWeather}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Get Weather
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {weather && (
        <div className="bg-white p-4 rounded shadow mt-4 text-sm">
          <p><strong>Location:</strong> {weather.location.name}, {weather.location.region}</p>
          <p><strong>Temperature:</strong> {weather.current.temp_f} °F</p>
          <p><strong>Condition:</strong> {weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="weather icon" />
        </div>
      )}
    </section>
  );
}

export default WeatherSection;
