let resetButtons = document.querySelector('.reset-button')
let chosenEventsList;

function shuffleEvents(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

// Input link
// Output - 1) lat long in decimal (string), 2) lat long in dms (string), 3) country name (string), 4) null
function scrapeWikipedia(link) {
  return new Promise(async (res, _rej) => {
    try{
      const wikiPageBlock = await fetch(`https://api.allorigins.win/raw?url=${link}`);
      // const wikiPageBlock = await fetch(link);
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
      // Option 1: Check for coordinates
      if (doc.querySelector(".geo")) {
        const coordString = doc.querySelector(".geo").textContent;
        const coordArr = coordString.split('; ')
        const lat = coordArr[0]
        const lng = coordArr[1]
        res({
          country: "",
          locationType: "coord",
          latlng: { lat, lng },
        });
      }
      // Option 1: Check lat long dms
      // if (doc.querySelector(".latitude") && doc.querySelector(".longitude")) {
      //   const latString = doc.querySelector(".latitude").textContent;
      //   const longString = doc.querySelector(".longitude").textContent;
      //   const lat = dmsConverter(latString).toString();
      //   const lng = dmsConverter(longString).toString();
      //   res({
      //     country: "",
      //     locationType: "coord",
      //     latlng: { lat, lng },
      //   });
      // }
      // // Option 2: Check lat long decimal
      // else if (doc.querySelector(".geo-dec")) {
      //   const parent = doc.querySelector(".geo-dec");
      //   const content = parent.textContent;
      //   console.log(content);
      //   const contentArray = content.split("°");
      //   const contentArray2 = contentArray[1].split(" ");
      //   const lng = contentArray[0];
      //   const lat = contentArray2[1];
      //   res({
      //     country: "",
      //     locationType: "coord",
      //     latlng: { lat, lng },
      //   });
      // }
      // Option 2: Check Country
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
      // Option 3: Found Nothing
      else {
        res(null);
      }
    }catch (ex) {
      //possible 404 page link, stretch goal
      console.log(ex);
    }
  });
}

// Input - 1) lat long in decimal (string), 2) lat long in dms (string), 3) country name (string)
// Output - map object for andrew
// eventObj = {
//   locationType: "coord",
//   latlng: { lat: latCoord, lcountry: "", ng: longCoord },
//   description: `${newEventObjToSearch.description}`,
//   year: `${newEventObjToSearch.year}`,
// };
function parseMapEvent(OG, description, year) {
  return {
    ...OG,
    description,
    year,
  };
}

// Main
async function main(date) {
  try {
    chosenEventsList = [];
    const eventsJSON = await fetch(
      `https://byabbe.se/on-this-day/${date}/events.json`
    );
    const eventsData = await eventsJSON.json();
    const events = eventsData.events;
    const shuffledEvents = shuffleEvents(events);
    while (chosenEventsList.length < 3) {
      const newEvent = shuffledEvents.pop();
      const newEventWikiLinksArr = newEvent.wikipedia; //array of wikipedia link objects
      for (let index = 0; index < newEventWikiLinksArr.length; index++) {
        const wikiLink = newEventWikiLinksArr[index].wikipedia;
        const result = await scrapeWikipedia(wikiLink);
        if (result) {
          chosenEventsList.push(
            parseMapEvent(result, newEvent.description, newEvent.year)
          );
          break;
        }
      }
    }
    console.log(chosenEventsList); 
    return chosenEventsList
  } catch (ex) {
    console.log(ex);
  }
}

function dataReset() {
  let event1TitleEl = document.querySelector("#event1Title");
  let event1ContentEl = document.querySelector("#event1Content");

  let event2TitleEl = document.querySelector("#event2Title");
  let event2ContentEl = document.querySelector("#event2Content");

  let event3TitleEl = document.querySelector("#event3Title")
  let event3ContentEl = document.querySelector("#event3Content");

  event1TitleEl.textContent = `Waiting...`;
  event1ContentEl.textContent = ``;
  event2TitleEl.textContent = `Waiting...`;
  event2ContentEl.textContent = ``;
  event3TitleEl.textContent = `Waiting...`;
  event3ContentEl.textContent = ``;
}

resetButtons.addEventListener("click", async (e) => {
  e.preventDefault();
  dataReset();
  const mapMarkers = await main(storedDate);
  insertData(mapMarkers, storedDate);
  sortObj(mapMarkers);
});

// function dmsConverter(string) {
//   let beforeDecimal = parseFloat(string.split("°")[0]);
//   let afterDecimal = string.split("°")[1];
//   if (string.includes("′") && string.includes("″")) {
//     let minuteSplitArr = afterDecimal.split("′");
//     let minutes = parseFloat(minuteSplitArr[0]);
//     let minutesConverted = minutes / 60;
//     let secondsWithDirection = minuteSplitArr[1];
//     let seconds = secondsWithDirection.split("″")[0];
//     let secondsConverted = seconds / 3600;
//     return beforeDecimal + minutesConverted + secondsConverted;
//   }
//   // // // formats for degrees, minutes, seconds
//   else if (string.includes("″")) {
//     let minutes = parseFloat(afterDecimal.split("′")[0]);
//     let minutesConverted = minutes / 60;
//     return beforeDecimal + minutesConverted;
//   }
//   return beforeDecimal;
// }