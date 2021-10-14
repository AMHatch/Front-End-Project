function dmsConverter(string) {
  let beforeDecimal = parseFloat(string.split("°")[0]);
  let afterDecimal = string.split("°")[1];
  if (string.includes("′") && string.includes("″")) {
    let minuteSplitArr = afterDecimal.split("′");
    let minutes = parseFloat(minuteSplitArr[0]);
    let minutesConverted = minutes / 60;
    let secondsWithDirection = minuteSplitArr[1];
    let seconds = secondsWithDirection.split("″")[0];
    let secondsConverted = seconds / 3600;
    return beforeDecimal + minutesConverted + secondsConverted;
  }
  // // // formats for degrees, minutes, seconds
  else if (string.includes("″")) {
    let minutes = parseFloat(afterDecimal.split("′")[0]);
    let minutesConverted = minutes / 60;
    return beforeDecimal + minutesConverted;
  }
  return beforeDecimal;
}

function shuffleEvents(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    if (arr[j].value == "ace") {
      arr[j].score = 11;
    }
    arr[j] = temp;
  }
  return arr;
}

// Input link
// Output - 1) lat long in decimal (string), 2) lat long in dms (string), 3) country name (string), 4) null
function scrapeWikipedia(link) {
  return new Promise(async (res, _rej) => {
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
      const long = dmsConverter(longString).toString();
      res({
        country: "",
        locationType: "coord",
        latlng: { lat, long },
      });
    }
    // Option 2: Check lat long decimal
    else if (doc.querySelector(".geo-dec")) {
      const parent = doc.querySelector(".geo-dec");
      const content = parent.textContent;
      const contentArray = content.split("°");
      const contentArray2 = contentArray[1].split(" ");
      const long = contentArray[0];
      const lat = contentArray2[1];
      res({
        country: "",
        locationType: "coord",
        latlng: { lat, long },
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
        latlng: { lat: "", long: "" },
      });
    }
    // Option 4: Found Nothing
    else {
      res(null);
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
async function main() {
  try {
    const date = "4/20";
    const mapLocations = [];
    const eventsJSON = await fetch(
      `https://byabbe.se/on-this-day/${date}/events.json`
    );
    const eventsData = await eventsJSON.json();
    const events = eventsData.events;
    const shuffledEvents = shuffleEvents(events);

    while (mapLocations.length < 3) {
      const newEvent = shuffledEvents.pop();
      const newEventWikiLinksArr = newEvent.wikipedia; //array of wikipedia link objects

      for (let index = 0; index < newEventWikiLinksArr.length; index++) {
        const wikiLink = newEventWikiLinksArr[index].wikipedia;
        const result = await scrapeWikipedia(wikiLink);
        if (result) {
          mapLocations.push(
            parseMapEvent(result, newEvent.description, newEvent.year)
          );
          break;
        }
      }
    }

    console.log(mapLocations);
  } catch (ex) {
    console.log(ex);
  }
}

main();
