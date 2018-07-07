const request = require("request");

var geocodeAddress = (address, callback) => {

	var url = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`;

	request({		
		url,
		json: true
		}, (error, response, body) => {
			if(error){
				callback("Unable to reach google servers");
			}
			else if(body.status === "ZERO_RESULTS"){
				callback("Invalid address");
			}
			else if(body.status === "OK"){
				callback(undefined, {
					address: body.results[0].formatted_address,
					latitude: body.results[0].geometry.location.lat,
					longitude: body.results[0].geometry.location.lng
				})
			}
	});
}

module.exports = {geocodeAddress};