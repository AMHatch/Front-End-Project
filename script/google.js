let googleMap;
let marker;
let marker2;
let marker3;
let geocoder;
let infowindow;
let response;
let searchObj;
let latitude;
let longitude;
let latlngStr;
let latlng;

// let chosenEventsList = [
//   {
//     locationType: "coord",
//     country: "",
//     latlng: { lat: "46.81388888888888", lng: "71.20805555555556" },
//   },
//   { locationType: "country", country: "Mexico", latlng: { lat: "", lng: "" } },
//   {
//     locationType: "coord",
//     country: "",
//     latlng: { lat: "49.8486", lng: "3.2864" },
//   },
// ];

// initializing the map
let options = {
  zoom: 3,
  center: { lat: 30, lng: 15 },
  mapTypeControl: false,
  styles: [
    { elementType: "geometry", stylers: [{ color: "#585858" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#000000" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#01FEFF" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#CB00F8" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#000000" }],
    },
  ],
};

function initMap() {
  googleMap = new google.maps.Map(
    document.getElementById("googleMap"),
    options
  );
  geocoder = new google.maps.Geocoder();
  infowindow = new google.maps.InfoWindow();
  marker = new google.maps.Marker({ googleMap });
  marker2 = new google.maps.Marker({ googleMap });
  marker3 = new google.maps.Marker({ googleMap });
  googleMap.addListener("click", (e) => {
    sortObj(chosenEventsList);
  });
}

// function to sort incoming object data by location data type
function sortObj(objArray) {
  for (let i = 0; i < objArray.length; i++) {
    let markerArr = [marker, marker2, marker3];
    if (objArray[i].locationType == "country") {
      geocode({ address: objArray[i].country }, markerArr[i]);
    } else if (objArray[i].locationType == "coord") {
      let lat = objArray[i].latlng.lat;
      let long = objArray[i].latlng.lng;
      geocodeLatLng(geocoder, googleMap, infowindow, lat, long, markerArr[i]);
    }
  }
}
// function to process grid coordinates

function geocodeLatLng(geocoder, googleMap, infowindow, lat, long, markVar) {
  latlong = {
    lat: parseFloat(lat),
    lng: parseFloat(long),
  };
  geocoder
    .geocode({ location: latlong })
    .then((response) => {
      if (response.results[0]) {
        markVar.setPosition(response.results[0].geometry.location);
        markVar.setMap(googleMap);
        // infowindow.setContent(response.results[0].formatted_address);
        // infowindow.open(googleMap, markVar);
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
}
//function to process country

function geocode(request, markVar, infowindow) {
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;
      // googleMap.setCenter(results[0].geometry.location);
      markVar.setPosition(results[0].geometry.location);
      markVar.setMap(googleMap);
      // infowindow.setContent(results[0].formatted_address);
      // infowindow.open(googleMap, markVar);
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}
