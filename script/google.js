let googleMap
let marker;
let marker2;
let marker3;
let geocoder;
let infowindow;
let response;
let searchObj ;
let latitude
let longitude
let latlngStr;
let latlng;

let chosenEventsList = [{locationType: "coord", country: "", latlng: {lat: "46.81388888888888", lng: "71.20805555555556"}},
{locationType: "country", country: "Mexico", latlng: {lat: "", lng: ""}},
{locationType: "coord", country: "", latlng: {lat: "49.8486", lng: "3.2864"}},
]


// initializing the map
let options = {
    zoom: 3.3,
    center: { lat: 30, lng:  15 },
    mapTypeControl: false,
    };
function initMap() {



googleMap = new google.maps.Map(document.getElementById("googleMap"),options);
geocoder = new google.maps.Geocoder();
infowindow = new google.maps.InfoWindow();
marker = new google.maps.Marker({googleMap,});
marker2 = new google.maps.Marker({googleMap,});
marker3 = new google.maps.Marker({googleMap,});

let array = chosenEventsList

googleMap.addListener("click", (e) => {
sortObj(array)
});
}

// function to sort incoming object data by location data type
function sortObj(objArray){
    for(let i = 0; i < objArray.length; i++){
        let markerArr = [marker,marker2,marker3]
    if (objArray[i].locationType == 'country'){
        geocode({ address: objArray[i].country },markerArr[i]);
    }
    else if(objArray[i].locationType == 'coord'){
        let lat = objArray[i].latlng.lat
        let long = objArray[i].latlng.lng
        geocodeLatLng(geocoder, googleMap, infowindow, lat, long, markerArr[i])
    }
}}
// function to process grid coordinates
function geocodeLatLng(geocoder, googleMap, infowindow,lat,long, markVar) {
latlong = {
    lat: parseFloat(lat),
    lng: parseFloat(long),
};
geocoder.geocode({ location: latlong })
    .then((response) => {
    if (response.results[0]) {
        markVar.setPosition(response.results[0].geometry.location);
        markVar.setMap(googleMap)
        // infowindow.setContent(response.results[0].formatted_address);
        // infowindow.open(googleMap, markVar);
    } else {
        window.alert("No results found");
        }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
}
//function to process country 
function geocode(request,markVar,infowindow) {
geocoder.geocode(request)
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

