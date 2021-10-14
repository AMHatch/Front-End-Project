let map;
let marker;
let marker2;
let marker3;
let marker4;
let geocoder;
let infowindow;
let responseDiv;
let response;
let searchValue;
let searchValue2; 
let searchValue3;
let searchObj ;
let latitude
let longitude
let input;
let latlngStr;
let latlng;

let chosenEventsList = [{locationType: "coord", country: "", latlng: {lat: "46.81388888888888", lng: "71.20805555555556"}},
{locationType: "country", country: "Mexico", latlng: {lat: "", lng: ""}},
{locationType: "coord", country: "", latlng: {lat: "49.8486", lng: "3.2864"}},
]


// initializing the map

function initMap() {
map = new google.maps.Map(document.getElementById("map"), {
zoom: 3.3,
center: { lat: latitude = 30, lng: longitude = 15 },
mapTypeControl: false,
});
geocoder = new google.maps.Geocoder();
infowindow = new google.maps.InfoWindow();
marker = new google.maps.Marker({map,});
marker2 = new google.maps.Marker({map,});
marker3 = new google.maps.Marker({map,});

let array = chosenEventsList

map.addListener("click", (e) => {
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
        geocodeLatLng(geocoder, map, infowindow, lat, long, markerArr[i])
    }
}}
// function to process grid coordinates
function geocodeLatLng(geocoder, map, infowindow,lat,long, markVar) {
latlong = {
    lat: parseFloat(lat),
    lng: parseFloat(long),
};

geocoder.geocode({ location: latlong })
    .then((response) => {
    if (response.results[0]) {
        markVar.setPosition(response.results[0].geometry.location);
        markVar.setMap(map)
        // infowindow.setContent(response.results[0].formatted_address);
        // infowindow.open(map, markVar);
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
    // map.setCenter(results[0].geometry.location);
    markVar.setPosition(results[0].geometry.location);
    markVar.setMap(map);
    // infowindow.setContent(results[0].formatted_address);
    // infowindow.open(map, markVar);
    return results;
})
.catch((e) => {
    alert("Geocode was not successful for the following reason: " + e);
});
}

