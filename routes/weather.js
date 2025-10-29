const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/:city', async function(req, res, next) {
    const city = req.params.city;
     try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();
  
      if (!geoData.results || geoData.results.length === 0) {
        return res.render('weather', { error: 'City not found' });
      }
  
      const { latitude, longitude, name } = geoData.results[0];
     
  
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=is_day,rain,temperature_2m,wind_speed_10m,relative_humidity_2m`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      res.render('weather', {
        city: name,
        temperature: weatherData.current.temperature_2m,
        temperatureUnit: weatherData.current_units.temperature_2m|| '°C',
        rainPercentage: weatherData.current.rain || 0,
        humidity: weatherData.current.relative_humidity_2m || 0,
        windspeed: weatherData.current.wind_speed_10m|| 0,
        windspeedUnit: weatherData.current_units.wind_speed_10m|| 'm/s',
        isDay: weatherData.current.is_day,
      });
  
    } catch (err) {
      console.error(err);
      res.render('weather', { error: 'Failed to fetch weather data.' });
    }
  });
  
module.exports = router;
