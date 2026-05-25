
require('dotenv').config();
const axios = require('axios');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// app.get('/', (req,res)=>{
//     res.send('Welcome to weather app backend!');
// });

app.get('/api/weather', async (req,res) =>{

    const cityName = req.query.city;
    // SAFETY CHECK: If cityName is missing or empty
    if (!cityName) {
        return res.status(400).json({ 
            error: "City parameter is required. Please add '?city=cityName' to your URL." 
        });
    }
    // console.log("Secret API Key loaded is:", process.env.WEATHER_API_KEY);
    // console.log(`frontend is asking for weather in: ${cityName}`);

    // This code only runs ifcityName is valid!
   try {
        // 1. Get our secret key from the vault
        const apiKey = process.env.WEATHER_API_KEY;

        // 2. Make an asynchronous call to the third-party API using await
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`);

        // 3. Extract the exact data pieces we need from their massive response object
        const realData = {
            city: response.data.location.name,
            country: response.data.location.country,
            temperature: response.data.current.temp_c,
            condition: response.data.current.condition.text,
            humidity: response.data.current.humidity,
            windSpeed: response.data.current.wind_kph
        };
res.status(200).json(realData);
  
} catch (error) {
        // 5. If the third-party API fails (e.g. city not found), catch the error here
        console.log("Error fetching weather data:", error.message);
        res.status(404).json({ error: "Could not fetch weather data. Please check the city name." });
    }
})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    console.log(`server is running on http://localhost:${PORT}`);
});