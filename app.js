const yargs = require("yargs");
const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

// var getUser = (id, callback) => {
// 	var user = {
// 		id: id,
// 		name: "Vineet"
// 	};
// 	setTimeout(() => callback(user),3000);
// };

// getUser(31, (userObj) => {
// 	console.log(userObj);
// });

const argv = yargs
.options({
'address': {
        alias: 'a',
        demand: true,
        describe: 'Address for searching weather',
        type: 'string'
}
})
.help()
.alias('help', 'h')
.argv

//Get Address Details
geocode.geocodeAddress(argv.address, (errorMessage, addressDetails) => {
	if(errorMessage){
		console.log(errorMessage);
	}
	else {
		console.log(JSON.stringify(addressDetails, undefined, 2));
		//Get Weather Details
		weather.getWeather(parseFloat(addressDetails.latitude), parseFloat(addressDetails.longitude), (errorMessage, weatherDetails) => {
			if(errorMessage){
				console.log(errorMessage);
			}
			else {
				console.log(JSON.stringify(weatherDetails, undefined, 2));
			}
		});
	}
});