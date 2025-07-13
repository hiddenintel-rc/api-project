import React, { useEffect, useState } from 'react';

function VehiclesSection() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [details, setDetails] = useState(null);
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch vehicle list
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('https://www.swapi.tech/api/vehicles?page=1&limit=10');
        const data = await response.json();
        setVehicles(data.results);
      } catch (err) {
        console.error('Error fetching vehicles:', err);
      }
    };

    fetchVehicles();
  }, []);

  // Fetch vehicle details and associated films
  useEffect(() => {
    if (!selectedId) return;

    const fetchDetails = async () => {
      setLoading(true);
      setFilms([]);
      try {
        const response = await fetch(`https://www.swapi.tech/api/vehicles/${selectedId}`);
        const data = await response.json();
        const props = data.result.properties;
        setDetails(props);

        // Fetch film titles in parallel
        if (props.films?.length) {
          const filmResponses = await Promise.all(
            props.films.map(url => fetch(url).then(res => res.json()))
          );
          const filmTitles = filmResponses.map(f => f.result.properties.title);
          setFilms(filmTitles);
        }
      } catch (err) {
        console.error('Error fetching vehicle or films:', err);
        setDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [selectedId]);

  const desiredFields = [
    'name',
    'cargo_capacity',
    'passengers',
    'max_atmosphering_speed',
    'crew',
    'model',
    'manufacturer',
    'vehicle_class',
  ];

  return (
    <section className="w-full py-12 px-6 bg-yellow-100 border-b border-gray-300">
      <h2 className="text-2xl font-bold mb-4">Star Wars Vehicles</h2>

      <select
        className="p-2 rounded border border-gray-400 mb-4"
        onChange={(e) => setSelectedId(e.target.value)}
        value={selectedId}
      >
        <option value="">Select a vehicle</option>
        {vehicles.map((v) => (
          <option key={v.uid} value={v.uid}>{v.name}</option>
        ))}
      </select>

      {loading && <p>Loading vehicle details...</p>}

      {details && (
        <div className="bg-white p-4 rounded shadow mt-4 text-sm">
          <h3 className="text-lg font-semibold mb-2">Vehicle Details</h3>
          <ul className="list-disc pl-6 mb-4">
            {desiredFields.map((key) => (
              <li key={key}>
                <strong>{key.replace(/_/g, ' ')}:</strong> {details[key]}
              </li>
            ))}
          </ul>

          {films.length > 0 && (
            <>
              <h4 className="font-semibold mb-1">Featured In Films:</h4>
              <ul className="list-disc pl-6">
                {films.map((title, i) => (
                  <li key={i}>{title}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </section>
  );
}

export default VehiclesSection;
