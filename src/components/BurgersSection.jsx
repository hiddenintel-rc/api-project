import React, { useState } from 'react';

const burgerEmojis = ['🍔', '🥓', '🧀', '🥬', '🌶️', '🥯', '🥪', '🍞', '🍟'];

const funFacts = [
  "Bob's Burgers is created by Loren Bouchard.",
  "The show is set in a fictional town called Seymour's Bay.",
  "H. Jon Benjamin voices Bob — and also voices Archer!",
  "Linda’s singing was inspired by Bouchard’s real-life friend.",
  "Every episode has a unique Burger of the Day pun!",
  "Tina’s character was originally written as a boy named Daniel.",
  "Gene uses real fart sounds for his keyboard!",
];

function getRandomItems(array, count) {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function BurgersSection() {
  const [count, setCount] = useState('');
  const [burgers, setBurgers] = useState([]);
  const [error, setError] = useState('');
  const [fact, setFact] = useState('');

  const handleFetch = async () => {
    const num = parseInt(count);

    if (isNaN(num) || num < 1 || num > 5) {
      setError('Please enter a number between 1 and 5.');
      setBurgers([]);
      setFact('');
      return;
    }

    setError('');
    try {
      const response = await fetch(`https://bobsburgers-api.herokuapp.com/burgerOfTheDay/`);
      const data = await response.json();

      const selectedBurgers = getRandomItems(data, num);
      const selectedFact = getRandomItems(funFacts, 1)[0];

      setBurgers(selectedBurgers);
      setFact(selectedFact);
    } catch (err) {
      console.error('Error fetching burgers:', err);
      setError('Failed to fetch burgers. Please try again.');
      setBurgers([]);
      setFact('');
    }
  };

  return (
    <section className="w-full py-12 px-6 bg-red-100 border-b border-gray-300">
      <h2 className="text-2xl font-bold mb-4">Bob's Burgers: Burger of the Day</h2>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <label htmlFor="burger-count" className="font-medium">
          How many burgers of the day would you like to see?
        </label>
        <input
          id="burger-count"
          type="number"
          min="1"
          max="5"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          className="p-2 rounded border border-gray-400 w-20"
        />
        <button
          onClick={handleFetch}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retrieve
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid gap-4 max-w-2xl">
        {burgers.map((burger) => (
          <div key={burger.id} className="p-4 bg-white rounded shadow flex items-start gap-3">
            <span className="text-3xl">{getRandomItems(burgerEmojis, 1)[0]}</span>
            <div>
              <p className="font-semibold text-lg">{burger.name}</p>
              <p className="text-sm text-gray-700">Price: ${burger.price}</p>
            </div>
          </div>
        ))}
      </div>

      {fact && (
        <div className="mt-8 bg-white p-4 rounded shadow max-w-2xl">
          <h3 className="font-semibold text-lg mb-2">🍔 Fun Fact</h3>
          <p className="text-sm text-gray-800">{fact}</p>
        </div>
      )}
    </section>
  );
}

export default BurgersSection;