function initMap() {
		var element = document.createElement('div');
        var mapDiv = document.getElementById('map-hider').appendChild(element);
		mapDiv.id = 'map';
		mapDiv.style.cssText = 'width:1000px; height:700px; margin: auto';
        var map = new google.maps.Map(mapDiv, {
            center: {lat: 44.540, lng: -78.546},
            zoom: 8
        });
		
		window.alert("Loaded Google Map, adding WanderlustSA markers...");
}

window.onload = initMap;

