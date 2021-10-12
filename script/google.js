let map;
let marker;
let geocoder;
let responseDiv;
let response;
let searchValue = 'houston'
let lat;
let long;
// initializing the map
function initMap() {
map = new google.maps.Map(document.getElementById("map"), {
zoom: 5,
center: { lat: lat=37, lng: long= -98 },
mapTypeControl: false,
});

geocoder = new google.maps.Geocoder();

const inputText = document.createElement("input");

inputText.type = "text";
inputText.placeholder = "Enter a location";
const submitButton = document.createElement("input");
submitButton.type = "button";
submitButton.id = "submit"
submitButton.value = "Geocode";
submitButton.classList.add("button", "button-primary");
const clearButton = document.createElement("input");
clearButton.type = "button";
clearButton.value = "Clear";
clearButton.classList.add("button", "button-secondary");
response = document.createElement("pre");
response.id = "response";
response.innerText = "";
responseDiv = document.createElement("div");
responseDiv.id = "response-container";
responseDiv.appendChild(response);

//controls for top left corner. inputs are passed into googleLand, no access.
map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);

marker = new google.maps.Marker({
map,
});

map.addListener("click", (e) => {
geocode({ location: e.latLng });
});


submitButton.addEventListener("click", () =>
geocode({ address: inputText.value })
);


clearButton.addEventListener("click", () => {
clear();
});
clear();
}

function clear() {
marker.setMap(null);
responseDiv.style.display = "none";
}

function geocode(request) {
clear();
geocoder
.geocode(request)
.then((result) => {
    const { results } = result;

    map.setCenter(results[0].geometry.location);
    marker.setPosition(results[0].geometry.location);
    marker.setMap(map);
    responseDiv.style.display = "block";
    response.innerText = JSON.stringify(result, null, 2);
    return results;
})
.catch((e) => {
    alert("Geocode was not successful for the following reason: " + e);
});
}



// tests for passing in data


// let subButton = document.querySelector('#submit')
// let eventOne = new Event("click", {"bubbles":false, "cancelable":false});

// subButton.dispatchEvent(eventOne);



// function initialize() {
    
//     var latlng = new google.maps.LatLng(-34.397, 150.644);
//     var mapOptions = {
//         zoom: 8,
//         center: latlng
//     }
//     map = new google.maps.Map(document.getElementById('#map'), mapOptions);
//     codeAddress(searchValue)
//     }

//     function codeAddress(locationValue) {
//     geocoder.geocode( { address: locationValue}, function(results, status) {
//         if (status == google.maps.GeocoderStatus.OK) {
//         map.setCenter(results[0].geometry.location);
//         marker = new google.maps.Marker({
//             map: map,
//             position: results[0].geometry.location
//         });
//         } else {
//         alert('Geocode was not successful for the following reason: ' + status);
//         }
//     });
// }


// maps.event.addDomListener(window, 'load', initialize)