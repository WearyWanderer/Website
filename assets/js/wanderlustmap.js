function initMap() {
		
        document.getElementById('map-hider').appendChild("map");
		var mapDiv = document.getElementById('map');
		mapDiv.style.cssText = 'width:200px; height:200px;';
        var map = new google.maps.Map(mapDiv, {
            center: {lat: 44.540, lng: -78.546},
            zoom: 8
        });
		
		window.alert("Loaded Google Map, adding WanderlustSA markers...");
}

