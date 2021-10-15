# WhereBack Machine
On this date in history, or on the date of your choosing, learn about historical events and where those locations are in the modern world. 


screenshot or video placeholder


## Tech Stack 

- Languages:
    - Javascript
    - HTML
    - CSS
- APIs:
    - Google Maps API
    - Google Geocode API
    - WikiPedia API
    - WikiPedia scrapes
    - Swagger API

- Bootstrap
- AJAX

## MVP
 
Build a mobile responsive webpage that displays the data for this day in history and also allows the user to select a date of their choice. 
Use various API's to compile data on the event, it's historical location, and displays its modern day location using Google maps. and a dad joke. 

404 error catching page with dad jokes. Because dad jokes make everything better.


## Strech Goals

Dad jokes API

add in a travel api to show travel options to the location. 




## Code Snippets
```js

// Input link
// Output - 1) lat long in decimal (string), 2) lat long in dms (string), 3) country name (string), 4) null
function scrapeWikipedia(link) {
  return new Promise(async (res, _rej) => {
    try{
      const wikiPageBlock = await fetch(link);
      const wikiPageText = await wikiPageBlock.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(wikiPageText, "text/html");
      const infoBoxLabelList = doc.querySelectorAll(".infobox-label");
      let countryNode;
  
      // Checks to see if a country field exists to scrape coordinates
      infoBoxLabelList.forEach((element) => {
        if (element.textContent == "Country") {
          countryNode = element;
        }
      });
  
      // Option 1: Check lat long dms
      if (doc.querySelector(".latitude") && doc.querySelector(".longitude")) {
        const latString = doc.querySelector(".latitude").textContent;
        const longString = doc.querySelector(".longitude").textContent;
        const lat = dmsConverter(latString).toString();
        const lng = dmsConverter(longString).toString();
        res({
          country: "",
          locationType: "coord",
          latlng: { lat, lng },
        });
      }
      // Option 2: Check lat long decimal
      else if (doc.querySelector(".geo-dec")) {
        const parent = doc.querySelector(".geo-dec");
        const content = parent.textContent;
        const contentArray = content.split("°");
        const contentArray2 = contentArray[1].split(" ");
        const lng = contentArray[0];
        const lat = contentArray2[1];
        res({
          country: "",
          locationType: "coord",
          latlng: { lat, lng },
        });
      }
      // Option 3: Check Country
      else if (countryNode) {
        const countryParent = countryNode.parentNode;
        const countryParentLastChild = countryParent.lastChild;
        const country = countryParentLastChild.textContent;
        res({
          country,
          locationType: "country",
          latlng: { lat: "", lng: "" },
        });
      }
      // Option 4: Found Nothing
      else {
        res(null);
      }
      
    }catch (ex) {
      //possible 404 page link, stretch goal
      console.log(ex);
    };
  });
}
// Written by  Hunter Hutchisson and Victoria Walker
```
```js
// function to sort incoming Object data by location datatype.
function sortObj(objArray){
    for(let i = 0; i < objArray.length; i++){
        let markerArr = [marker,marker2,marker3];
        if (objArray[i].locationType == 'country'){
            geocode({ address: objArray[i].country },markerArr[i]);
        }
        else if(objArray[i].locationType == 'coord'){
            let lat = objArray[i].latlng.lat;
            let long = objArray[i].latlng.lng;
            geocodeLatLng(geocoder, googleMap, infowindow, lat, long, markerArr[i]);
        }
    }   
};
//Written by Andrew Hatch
```


## Screenshots




## Developers:

Victoria Walker :
 https://github.com/v-walker
- historical APIs and Front End integration
- TBD

Hunter Hutchisson : 
https://github.com/hunterhutchisson
- historical APIs and back end integration
- TBD

Ryan Donald :
 https://github.com/ryanthomasdonald
- creative director
- Front end development of landing page HTML, JS and CSS
- TBD
 

Andrew Hatch :
 https://github.com/AMHatch
 - Google Maps API, and Google Geocode API integration
 - Google Maps styling and customiztion
 - TBD

