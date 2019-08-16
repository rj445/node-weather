const request = require('request');

const getGeoCode = (address, callback) => {
    const accessToken = "pk.eyJ1IjoicnVzaGFiaGE0NCIsImEiOiJjano2bndnN3oweWs0M2lxdHc0amV5Z2Z3In0.hXh5TL-LYRfYKw2z_KjvaA";
    const geoLocationUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=' + accessToken + '&limit=1';
    request({ url: geoLocationUrl, json: true }, (error, response) => {
        let longitude = response.body.features[0].center[0];
        let latitude = response.body.features[0].center[1];
        console.log('Latitude in geocode: ' + latitude);
        callback({latitude, longitude});
    });
}

const getWeather = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/7066a9da455e545aff23508adb3c59f8/" + latitude + "," + longitude;
    request({ url: url, json: true }, (weatherError, weatherResponse) => {
        if (!weatherError) {
            console.log(weatherResponse.body.currently);
            let responseMessage = '';
            if (!weatherResponse.body.currently) {
                responseMessage = 'Enable to get temperature';
            }
            else {
                responseMessage = 'Current temperature : ' + weatherResponse.body.currently.temperature;
            }
            callback({
                summary: responseMessage
            });

        } else {
            callback({
                error: weatherError
            });
        }
    });

}

module.exports = {
    getGeoCode,
    getWeather
}