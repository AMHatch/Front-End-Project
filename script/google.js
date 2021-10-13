let map;
let marker;
let geocoder;
let responseDiv;
let response;
let searchValue;
let lat = 37
let long = -91

// initializing the map

function initMap() {
map = new google.maps.Map(document.getElementById("map"), {
zoom: 5,
center: { lat: lat, lng: long },
mapTypeControl: false,
});

geocoder = new google.maps.Geocoder();

marker = new google.maps.Marker({
map,
});

map.addListener("click", (e) => {
geocode({ location: e.latLng });
});

}

function clear() {
marker.setMap(null);
responseDiv.style.display = "none";

geocode({ address: searchValue })
}

function geocode(request) {
clear();
geocoder.geocode(request)
.then((result) => {
    const { results } = result;

    map.setCenter(results[0].geometry.location);
    marker.setPosition(results[0].geometry.location);
    marker.setMap(map);

    // responseDiv.style.display = "block";
    // response.innerText = JSON.stringify(result, null, 2);
    return results;
})
.catch((e) => {
    alert("Geocode was not successful for the following reason: " + e);
});
}

