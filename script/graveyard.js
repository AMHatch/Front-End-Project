// code blocks removed from sample:


// submitButton.addEventListener("click", () =>
// geocode({ address: inputText.value })
// );


// clearButton.addEventListener("click", () => {
// clear();
// });
// clear();
// }

// const inputText = document.createElement("input");

// inputText.type = "text";
// inputText.placeholder = "Enter a location";
// const submitButton = document.createElement("input");
// submitButton.type = "button";
// submitButton.id = "submit"
// submitButton.value = "Geocode";
// submitButton.classList.add("button", "button-primary");
// const clearButton = document.createElement("input");
// clearButton.type = "button";
// clearButton.value = "Clear";
// clearButton.classList.add("button", "button-secondary");
// response = document.createElement("pre");
// response.id = "response";
// response.innerText = "";
// responseDiv = document.createElement("div");
// responseDiv.id = "response-container";
// responseDiv.appendChild(response);

// //controls for top left corner. inputs are passed into googleLand, no access.
// map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
// map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
// map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
// map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);


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