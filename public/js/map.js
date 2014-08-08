// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map').setView([10, 10], 2);

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var geojsonMarkerOptions = {
    radius: 3,
    fillColor: "#ff7800",
    color: "#ff7800",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var myLayer = L.geoJson([],{style:geojsonMarkerOptions, pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }}).addTo(map);


var parseGeo = function(data){
	myLayer.addData(data);
}

