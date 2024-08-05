import React, { useState, FormEvent, ChangeEvent, useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  font-family: Arial, sans-serif;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1;
  color: rgb(7, 1, 41);
  max-width: 500px;
  padding: 120px;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 78%;
    padding: 50px;
  }
`;

const Title = styled.h1`
  font-size: 2em;
  margin: 5px 0;

  @media (max-width: 768px) {
    font-size: 1.9em;
  }
`;

const MainText = styled.p`
  color: rgb(7, 1, 41);
  margin: 10px 0;
  max-width: 450px;
  line-height: 30px;

  @media (max-width: 768px) {
    text-align: justify;
  }
`;

const Form = styled.form`
  margin: 20px 0;
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  background-color: #e3e3e3;
  color: rgba(7, 1, 41, 0.783);
  max-width: 400px;
  cursor: text;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const Button = styled(motion.button)`
  padding: 11px 20px;
  font-size: 1em;
  margin-left: 15px;
  color: #e3e3e3;
  background-color: rgb(7, 1, 41);
  border: none;
  border-radius: 5px;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const WeatherDisplay = styled.div`
  margin-top: 20px;
  text-align: left;
  font-size: 20px;
  color: rgb(7, 1, 41);
  display: flex;
  flex-direction: row;
  gap: 40px;
`;

const WeatherIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const ErrorMessage = styled.p`
  color: white;
  font-size: 24px;
`;
// Define the interface for the weather data
interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

const WeatherApp: React.FC = () => {
  // Set up state variables for city, weather, and error
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Define the fetchWeather function to retrieve weather data and prevent default form submission behavior
  const fetchWeather = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      if (!apiKey) {
        console.error("API key not found");
        setError("API key not found");
        return;
      }
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
          throw new Error("Whoops! Something went wrong!");
        }
        const data: WeatherData = await response.json(); // Parse the JSON data from the response
        setWeather(data); // Set the fetched weather data to the state
        setError(null); // Clear any previous error messages
        setCity(""); // Clear the input field after successful fetch
      } catch (err: any) {
        setError(err.message); // Set an error message if an exception occurred
        setWeather(null); // Clear the weather data in case of an error
      }
    },
    [city]
  ); // Dependency array:  Re-create the function when `city` changes

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const getWeatherIcon = (feels_like: number) => {
    if (feels_like > 30) return "🔥";
    if (feels_like > 20) return "☀️";
    if (feels_like > 10) return "🌤️";
    if (feels_like > 0) return "💧";
    if (feels_like < 0) return "❄️";
    if (feels_like < -10) return "🧊";
  };

  return (
    <Container>
      <Title>What's the weather like?</Title>
      <MainText>
        Search for any city to see what the weather is like at the moment. Just
        type the name of city into the box below, hit enter or click the button.
      </MainText>
      <Form onSubmit={fetchWeather}>
        <Input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
        />
        <Button
          type="submit"
          whileHover={{ scale: 1.05, backgroundColor: "#580134" }}
          whileTap={{ scale: 0.9 }}
        >
          Get Weather
        </Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {weather && (
        <WeatherDisplay>
          <div>
            <WeatherIcon>
              <h2>{weather.name}</h2>
              {getWeatherIcon(weather.main.feels_like)}
            </WeatherIcon>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Feels like: {weather.main.feels_like}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Wind: {weather.wind.speed}</p>
            <p>Humidity: {weather.main.humidity}</p>
          </div>
        </WeatherDisplay>
      )}
    </Container>
  );
};

export default WeatherApp;
