const request = require('request');

const getTimeData = require('./time_data');

const getWeatherData = (cityValue, callback) => {
    const urlReq = `http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=bfc01abb9d07f1618283f28a3e24c038`;
    request({url: urlReq, json: true}, (errData, resData) => {
        if (resData.statusCode === 404) {
            callback({code: 404, message: 'city not found'}, undefined);
        } else if (resData.statusCode === 400) {
            callback({code: 400, message: 'empty value'}, undefined);
        } else {
            getTimeData(resData.body.name, timeData => {
                callback({
                    city: resData.body.name,
                    temp: Math.floor(resData.body.main.temp - 273),
                    humidity: resData.body.main.humidity,
                    wind_speed: Math.round(resData.body.wind.speed),
                    wind_deg: resData.body.wind.deg,
                    weather: resData.body.weather[0].main,
                    sunrise: timeData.sunrise,
                    sunset: timeData.sunset,
                    day_time: timeData.day_time
                });
           });
        }   
    });
}

module.exports = getWeatherData;