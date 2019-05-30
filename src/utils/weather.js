const request = require('request');
const key = "dfa9e05d07c3e29ef15ac062a9c10c66";
const url= `https://api.darksky.net/forecast/${key}/LAT,LONG?units=si`;

function getWeatherReport(lat, long, callback) {
    //console.log(`Getting weather for ${lat}, ${long}.`)
    request({url: url.replace('LAT', lat).replace('LONG', long), json: true}, function (error, response, body) {
        if(!error){
            const data = body
            //console.log(url);
            callback({
                forecast: `Currently it is ${data.currently.summary} with a temperature of ${data.currently.temperature} degree celsius with a ${Math.round(data.currently.precipProbability * 100)}% chance of ${data.currently.precipType || 'precipitation'}.`
            });
        }else {
            callback({
                error: 'Service Unavailable',
                reason: 'SERVICE_UNAVAILABLE'
            });
        }
    });
}

module.exports = {
    getWeatherReport
}