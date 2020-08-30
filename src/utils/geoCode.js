const request = require('request');

const geoCode = (address, callback) => {
    let geolocation = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmJvdmlsbGEiLCJhIjoiY2tlZWhvbmRvMTJqMTMwcDdubWF1dWc3diJ9.C3ikUJg7itGc6o49RIihGw&limit=1';

    request.get({ url: geolocation, json: true }, (error, response) => {
        if (error) {
            // console.log(error);
            callback('Unable to connect to location services', undefined);
        } else if (response.body === undefined) {
            // console.log('There is no body in the response.');
            callback('There is no body in the response.', undefined);
        } else if (response.body.features === undefined) {
            // console.log('There is an error in the response');
            callback('There is an error in the response.', undefined);
        } else if (response.body.features.length === 0) {
            // console.log('no coordinates returned in the response');
            callback('No Co-Ordinates returned in the response.', undefined);
        } else {
            let { 0: longitude, 1: latitude } = { ...response.body.features[0].center };

            let placeName = response.body.features[0].place_name;
            callback(undefined, { latitude, longitude, placeName });
        }
    })
}

// geoCode('Dayton', (error, response) => {
//     console.log('Error : ', error);
//     console.log('Data : ', response);
// })

module.exports = geoCode;