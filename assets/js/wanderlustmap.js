function addNewMarker(locationString, map, geocoder) {
	geocoder.geocode({'address': locationString}, function(results, status) 
	{
		if (status === google.maps.GeocoderStatus.OK) 
		{
			marker = new google.maps.Marker({
			map: map,
			position: results[0].geometry.location,
			animation: google.maps.Animation.DROP
			});
		} 
		else 
		{
		  alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}


function populateMarkers(mapData, map) {
	var geocoder = new google.maps.Geocoder();
	var timeToAddMarker = 1000;
	for (i = 1; i < mapData.length; i++) {
		console.log(mapData[i][1]);
		
		setTimeout(addNewMarker, timeToAddMarker, mapData[i][4], map, geocoder);
		timeToAddMarker += 1000;
	}
}

function initMap() {
	var element = document.createElement('div');
	var mapDiv = document.getElementById('map-hider').appendChild(element);
	mapDiv.id = 'map';
	mapDiv.style.cssText = 'width:100%; height:750px; margin: auto';
	var map = new google.maps.Map(mapDiv, {
		center: {lat: 54.2774, lng: -1.7126},
		zoom: 7
	});

	var mapdata = Papa.parse("https://rawcdn.githack.com/WearyWanderer/wearywanderer.github.io/master/assets/csv/wanderlustvids.csv", {
		download: true,
		complete: function(results) {
			console.log(results);
			populateMarkers(results.data, map);
		}
	});
}

window.onload = initMap;

