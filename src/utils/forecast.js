const request = require('request');

const forecast = (latitude, longitude, callback) => {
    // console.log(latitude);
    // console.log(longitude);
    let url = 'http://api.weatherstack.com/current?access_key=7080272dda0278741cc0b279bb510bc6&query=' + latitude + ',' + longitude + '&units=f'

    request.get({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to communicate with the weather forcast service.', undefined);
        } else if (response.body === undefined || response.body.current === undefined) {
            callback('There is an error in communicating with the service.', undefined);
        } else {
            let actualTemperature = response.body.current.temperature;
            let feelslikeTemperature = response.body.current.feelslike;
            let weatherDesc = response.body.current.weather_descriptions;
            let placeName = response.body.request.query;
            callback(undefined, { actualTemperature, feelslikeTemperature, weatherDesc, placeName })
        }
    })
}


module.exports = forecast;