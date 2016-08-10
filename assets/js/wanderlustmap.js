function populateMarkers(mapData) {
	console.log(mapData[0][1]);
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
	

	marker = new google.maps.Marker({
	  map: map,
	  animation: google.maps.Animation.DROP,
	  position: {lat: 54.2774, lng: -1.7126}
	});

	var mapdata = Papa.parse("https://rawcdn.githack.com/WearyWanderer/wearywanderer.github.io/master/assets/csv/wanderlustvids.csv", {
		download: true,
		complete: function(results) {
			console.log(results);
			populateMarkers(results);
		}
	});
}

window.onload = initMap;

