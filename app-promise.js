const yargs = require("yargs");
const axios = require("axios");
const express = require("express");
const fs = require("fs");

var app = express();
app.use(express.static(__dirname + "/public"));
console.log(__dirname + "/public");

app.use((req, res, next) => {
	var now = new Date().toString();
	log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile("server.log", log + "\n", (err) => {
		if (err){
			console.log("Unable to add to server.log");
		}
	});
	next();
});

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

var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.address)}`;

axios.get(geocodeUrl).then((response) => {
	if(response.data.status ==="ZERO_RESULTS"){
		throw new Error("Unable to find that address");
	}
	console.log(response.data.results[0].formatted_address);

	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;
	var weatherUrl = `https://api.darksky.net/forecast/c1e4edc36dca014416d19036fba8f2a9/${lat},${lng}`;
	return axios.get(weatherUrl);
}).then((response) => {
	console.log(`Current temperature is ${response.data.currently.temperature}. It feels like ${response.data.currently.apparentTemperature}`);
}).catch((e) => {
	if(e.code === 'ENOTFOUND'){
		console.log("Unable to connect to API servers");
	} else {
		console.log(e.message);
	}
});

app.listen(3000, ()=>{
	console.log("server has started");
})