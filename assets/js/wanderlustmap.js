function initMap() {
		var element = document.createElement('div');
        var mapDiv = document.getElementById('map-hider').appendChild(element);
		mapDiv.id = 'map';
		mapDiv.style.cssText = 'width:100%; height:750px; margin: auto';
        var map = new google.maps.Map(mapDiv, {
            center: {lat: 54.2774, lng: -1.7126},
            zoom: 4
        });
		

		marker = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          position: {lat: 54.2774, lng: -1.7126}
        });

}

window.onload = initMap;

