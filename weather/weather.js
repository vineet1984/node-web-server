const request = require("request");

var getWeather = (lat, lng, callback) => {

	var url = `https://api.darksky.net/forecast/<your key here>/${lat},${lng}`;

	request({		
		url,
		json: true
		}, (error, response, body) => {
			if(error){
				callback("Unable to reach reach Dark Sky servers");
			}
			else if(!error && response.statusCode ===200){
				callback(undefined, `Current temperature is ${body.currently.temperature} but it feels like ${body.currently.apparentTemperature}`);
			}
	});
}

module.exports = {getWeather};
