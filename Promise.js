const request = require("request");

var geocodeAddress = (address) => {
	return new Promise((resolve, reject) => {
		var url = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`;

		request({		
			url,
			json: true
			}, (error, response, body) => {
				if(error){
					reject("Unable to reach google servers");
				}
				else if(body.status === "ZERO_RESULTS"){
					reject("Invalid address");
				}
				else if(body.status === "OK"){
					resolve({
						address: body.results[0].formatted_address,
						latitude: body.results[0].geometry.location.lat,
						longitude: body.results[0].geometry.location.lng
					})
				}
		});
	});
}

geocodeAddress("470 Oak Grove Dr").then((location) => {
	console.log(JSON.stringify(location, undefined, 2));
}).catch((errorMessage) => {
	console.log(errorMessage);
});