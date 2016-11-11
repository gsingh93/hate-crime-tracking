function map_generation(markerCenter){
  var mapProp = {
    center: markerCenter,
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map"), mapProp);

  return map;
}

google.maps.event.addDomListener(window, 'load', function () {
  var options = {
    types: ['(cities)']
  };
  var input = document.getElementById('autocomplete');
  var autocomplete = new google.maps.places.Autocomplete(input, options);
  var markerCenter = new google.maps.LatLng(-77.85,166.666667);
  var marker = null;

  var map = map_generation(markerCenter);

  google.maps.event.addListener(autocomplete, 'place_changed', function () {

    var place = autocomplete.getPlace();
    var latitude = place.geometry.location.lat();
    var longitude = place.geometry.location.lng();
    var markerCenter = new google.maps.LatLng(latitude, longitude);
    var marker = null;

    var map = map_generation(markerCenter);

    var marker = new google.maps.Marker({
      position: markerCenter
    });
    marker.setMap(map);
  });
});
