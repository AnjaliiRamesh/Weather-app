const axios = require('axios');

// We create a clean, named function for our weather fetching logic
const getWeatherData = async (req, res) => {
    const cityName = req.query.city;

    if (!cityName) {
        return res.status(400).json({ error: "City parameter is required." });
    }

    try {
        const apiKey = process.env.WEATHER_API_KEY;
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`);

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
        console.log("Error fetching weather data:", error.message);
        res.status(404).json({ error: "Could not fetch weather data. Please check the city name." });
    }
};

// Export the function so our router can see and use it!
module.exports = {
    getWeatherData
};