const User = require("../models/User");

const getUserWeatherData = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Parse the query date
    const queryDate = new Date(req.query.date);
    if (isNaN(queryDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    // Filter weather data by date
    const weatherData = user.weatherData.filter((data) => {
      const dataDate = new Date(data.date);
      return (
        dataDate.getFullYear() === queryDate.getFullYear() &&
        dataDate.getMonth() === queryDate.getMonth() &&
        dataDate.getDate() === queryDate.getDate()
      );
    });

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserWeatherData };
