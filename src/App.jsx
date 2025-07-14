import React from 'react';
import './App.css';
import WeatherSection from './components/WeatherSection';
import VehiclesSection from './components/VehiclesSection';
import TriviaSection from './components/TriviaSection';
import BurgersSection from './components/BurgersSection';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-10">
        <section id="weather">
          <WeatherSection />
        </section>
        <section id="vehicles">
          <VehiclesSection />
        </section>
        <section id="trivia">
          <TriviaSection />
        </section>
        <section id="burgers">
          <BurgersSection />
        </section>
      </main>
    </div>
  );
}

export default App;