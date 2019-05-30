const request = require('request');

const KEY = '1fafb5187ce230';
const URL = `https://us1.locationiq.com/v1/search.php?key=${KEY}&q=SEARCH_STRING&format=json&limit=1`;

function getGeoCoding(place, callback) {
    let url = URL.replace('SEARCH_STRING', place);
    //console.log(`Geocoding : ${url}`);
    request({url: url, json: true}, function(error, resp, body) {
        //console.log("Geocoding Successful.")
        if(!error && !!body[0] && !!body[0].lat && !!body[0].lon) {
            //console.log(body[0]);
            callback({
                lat: body[0].lat,
                lon: body[0].lon,
                displayName: body[0].display_name
            });
        }
        else if(!error && (!body[0] || !body[0].lat || !body[0].lon)) {
            callback({
                error: 'Location Not Found',
                reason: 'LOCATION_NOT_FOUND'
            });
        }
        else {
            callback({
                error: 'Service unavaiable',
                reason: 'SERVICE_UNAVAILABLE'
            });
        }
    });
}

module.exports = getGeoCoding;