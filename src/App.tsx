import React from 'react';
import "./App.css";
import AnimatedBackground from './components/AnimateBackground';
import WeatherApp from './components/WeatherApp';


const App: React.FC = () => {
  return (
    <div>
      <WeatherApp />
      <AnimatedBackground />
    </div>
  );
};

export default App;
