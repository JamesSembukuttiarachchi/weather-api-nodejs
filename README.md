# Weather App

## Overview

This Node.js backend application stores users' emails and locations and automatically sends hourly weather reports every 3 hours. It uses MongoDB for data storage and the OpenWeatherMap API to fetch weather data.

## Features

- User registration and login with JWT authentication
- Store and update user details (email, location)
- Send hourly weather reports every 3 hours via email
- Retrieve user's weather data for a given day

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- OpenWeatherMap API
- Nodemailer
- JWT (jsonwebtoken)
- Cron jobs (node-cron)

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Postman (for testing the API)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app

2. **Install the dependencies**:

    ```bash
    npm install

3. **Start the Server**:
    ```bash
    npm start

4. **API Endpoints**

```json
{
  "email": "test@example.com",
  "password": "password",
  "location": {
    "latitude": 12.34,
    "longitude": 56.78
  }
}

{
  "latitude": 12.34,
  "longitude": 56.78
}

