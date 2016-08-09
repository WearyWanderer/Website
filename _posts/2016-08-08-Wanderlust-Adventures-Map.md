---
layout: page-map
title:  "Wanderlust Adventures Map"
date:   2016-04-06
excerpt: "A google map project showing all our journeys so far."
project: true
tag:
- wanderlust
- travel
- vlog
- youtube
- hobby
comments: true
---

<div>
	<div id="map" style="width=800px; height=400px;">
	</div>
</div>
<script>
	function initMap() {
        var mapDiv = document.getElementById('map');
        var map = new google.maps.Map(mapDiv, {
            center: {lat: 44.540, lng: -78.546},
            zoom: 8
        });
		
		window.alert("Loaded Google Map, adding WanderlustSA markers...");
	}
</script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB2ZCvM15O4T7uSdsGaDDcPoump8AyXKhg&callback=initMap"></script>






