function initMap() {
	var restaurant = {lat: 12.920654, lng: 77.583786}; 
	var deliveryLocation = {lat:12.931157,lng: 77.584793};
	var map = new google.maps.Map(document.getElementById('map'), {
		center: restaurant
	});
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer({
		map: map
	});
	initializeDriverRoute(map, restaurant, deliveryLocation, directionsService,
  		directionsDisplay);
}


function initializeDriverRoute(map, origin, destination, service, display) {
	service.route({
		origin: origin,
		destination: destination,
		travelMode: 'DRIVING',
		avoidTolls: true
		}, function(response, status) {
		if (status === 'OK') {
		  display.setDirections(response);
		  autoRefreshDriverLoc(map, response.routes[0].overview_path);
		} else {
		  alert('Could not display directions due to: ' + status);
		}
	});
}

//Update Driver Marker based on Coords and auto-drag the map to current Coords

function moveDriverLocMarker(map, marker, latlng) {
    marker.setPosition(latlng);
    map.panTo(latlng);
}

/*Auto updating driver Loc using overview_path for Demo.
In Real time, it can be achieved using an AJAX call using REST API to get driver GPS Location.*/

function autoRefreshDriverLoc(map, pathCoords) {
    var driverLocMarker = new google.maps.Marker({ map: map, icon: "http://maps.google.com/mapfiles/ms/micons/yellow.png" });
    var timeout = 1000;
    for (var i = 0; i < pathCoords.length; i++) {
        setTimeout(function (coords) {
            moveDriverLocMarker(map, driverLocMarker, coords);
        }, timeout * i, pathCoords[i]);
    }
}

