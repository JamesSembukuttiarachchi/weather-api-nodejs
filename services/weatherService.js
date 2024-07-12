const axios = require("axios");

const getWeatherData = async (latitude, longitude) => {
  const response = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather`,
    {
      params: {
        lat: latitude,
        lon: longitude,
        appid: process.env.WEATHER_API_KEY,
        units: "metric",
      },
    }
  );
  return response.data;
};

module.exports = { getWeatherData };
