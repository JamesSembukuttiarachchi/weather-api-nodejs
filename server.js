const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cron = require("node-cron");
const User = require("./models/User");
const { getWeatherData } = require("./services/weatherService");
const { sendEmail } = require("./utils/emailService");

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const userRoutes = require("./routes/userRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
//const authRoutes = require("./routes/authRoutes");

app.get("/", (req, res) => {
  return res.status(234).send("Hello world");
});

app.use("/api/users", userRoutes);
app.use("/api/weather", weatherRoutes);
//app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Schedule weather reports every 3 hours  "0 */3 * * *"
cron.schedule("0 */3 * * *", async () => {
  try {
    const users = await User.find();
    for (const user of users) {
      const weatherData = await getWeatherData(
        user.location.latitude,
        user.location.longitude
      );
      user.weatherData.push({ date: new Date(), weather: weatherData });
      await user.save();

      const weatherText = `Weather Report:
      Location: ${weatherData.name}
      Description: ${weatherData.weather[0].description}
      Temperature: ${weatherData.main.temp}°C
      Feels Like: ${weatherData.main.feels_like}°C
      Humidity: ${weatherData.main.humidity}%
      Wind Speed: ${weatherData.wind.speed} m/s
      Wind Direction: ${weatherData.wind.deg}°
      Pressure: ${weatherData.main.pressure} hPa
      Visibility: ${weatherData.visibility} meters
      Clouds: ${weatherData.clouds.all}% cloud coverage
      `;

      await sendEmail(user.email, "3-Hourly Weather Report", weatherText);
    }
  } catch (error) {
    console.error("Error scheduling weather reports:", error);
  }
});
