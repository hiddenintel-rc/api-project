
import React, { useEffect, useState } from 'react';
import './App.css';
import WeatherSection from './components/WeatherSection';
import VehiclesSection from './components/VehiclesSection';
import TriviaSection from './components/TriviaSection';
import BurgersSection from './components/BurgersSection';

function Section({ title, endpoint }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate fetching data from API
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setData({ error: 'Failed to fetch data.' });
      }
    };

    fetchData();
  }, [endpoint]);

  return (
    <section className="w-full py-12 px-6 bg-gray-100 border-b border-gray-300">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <pre className="bg-white p-4 rounded shadow text-sm overflow-auto">
        {data ? JSON.stringify(data, null, 2) : 'Loading...'}
      </pre>
    </section>
  );
}

function App() {
  return (
    <div className="flex flex-col items-center w-full">
      <WeatherSection />
      <VehiclesSection />
      <TriviaSection />
      <BurgersSection />
    </div>
  );
}

export default App;
