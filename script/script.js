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

function findLocation(
  shuffledListFunction,
  eventListForFunction,
  indexOfShuffledArray,
  lengthOfEventList,
  state
) {
  if (state) {
    let eventObj = {};
    let newEventObjToSearch = {};
    let eventObjLinkList = [];
    let link = "";
    let countryNode;
    let innerState = true;
    newEventObjToSearch = shuffledListFunction.pop();
    eventObjLinkList = newEventObjToSearch.wikipedia; //array of wikipedia link objects
    // Goes through wikipedia links within one actual api event
    for (let index = 0; index < eventObjLinkList.length; index++) {
      link = eventObjLinkList[index].wikipedia;
      console.log(innerState);
      if (innerState == false) {
        break;
      } else {
        //   Scraping wikipedia
        fetch(link)
          .then((result) => {
            return result.text();
          })
          .then((data) => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(data, "text/html");
            let infoBoxLabelList = doc.querySelectorAll(".infobox-label");
            // Checks to see if a country field exists to scrape coordinates
            infoBoxLabelList.forEach((element) => {
              if (element.textContent == "Country") {
                countryNode = element;
              }
            });
            if (
              doc.querySelector(".latitude") &&
              doc.querySelector(".longitude")
            ) {
              let latString = doc.querySelector(".latitude").textContent;
              let longString = doc.querySelector(".longitude").textContent;
              let latCoord = dmsConverter(latString).toString();
              let longCoord = dmsConverter(longString).toString();

              eventObj = {
                locationType: "coord",
                latlng: { lat: latCoord, lcountry: "", ng: longCoord },
                description: `${newEventObjToSearch.description}`,
                year: `${newEventObjToSearch.year}`,
              };
              eventListForFunction = [...eventListForFunction, eventObj];
              latCoord = "";
              longCoord = "";
              if (eventListForFunction.length < 3) {
                indexOfShuffledArray += 1;
                lengthOfEventList += 1;
                innerState = false;
                findLocation(
                  shuffledListFunction,
                  eventListForFunction,
                  indexOfShuffledArray,
                  lengthOfEventList,
                  state
                );
              } else {
                state = false;
                console.log(indexOfShuffledArray);
                console.log(eventListForFunction);
                console.log("done dms");
                findLocation(
                  shuffledListFunction,
                  eventListForFunction,
                  indexOfShuffledArray,
                  lengthOfEventList,
                  state
                );
                return;
              }
            } else if (doc.querySelector(".geo-dec")) {
              let parent = doc.querySelector(".geo-dec");
              let content = parent.textContent;
              let contentArray = content.split("°");
              let longCoord = contentArray[0];
              let contentArray2 = contentArray[1].split(" ");
              let latCoord = contentArray2[1];
              eventObj = {
                locationType: "coord",
                country: "",
                latlng: { lat: latCoord, lng: longCoord },
                description: `${newEventObjToSearch.description}`,
                year: `${newEventObjToSearch.year}`,
              };
              eventListForFunction = [...eventListForFunction, eventObj];
              latCoord = "";
              longCoord = "";
              if (eventListForFunction.length < 3) {
                indexOfShuffledArray += 1;
                lengthOfEventList += 1;
                innerState = false;
                findLocation(
                  shuffledListFunction,
                  eventListForFunction,
                  indexOfShuffledArray,
                  lengthOfEventList,
                  state
                );
              } else {
                state = false;
                console.log(indexOfShuffledArray);
                console.log(eventListForFunction);
                console.log("done dec");
                findLocation(
                  shuffledListFunction,
                  eventListForFunction,
                  indexOfShuffledArray,
                  lengthOfEventList,
                  state
                );
                return;
              }
            } else if (countryNode) {
              let countryParent = countryNode.parentNode;
              let countryParentLastChild = countryParent.lastChild;
              let countryText = countryParentLastChild.textContent;
              eventObj = {
                locationType: "country",
                country: `${countryText}`,
                latlng: { lat: "", lng: "" },
                description: `${newEventObjToSearch.description}`,
                year: `${newEventObjToSearch.year}`,
              };
              eventListForFunction = [...eventListForFunction, eventObj];
              countryNode = null;
              if (eventListForFunction.length < 3) {
                indexOfShuffledArray += 1;
                lengthOfEventList += 1;
                innerState = false;
                findLocation(
                  shuffledListFunction,
                  eventListForFunction,
                  indexOfShuffledArray,
                  lengthOfEventList,
                  state
                );
              } else {
                state = false;
                console.log(indexOfShuffledArray);
                console.log(eventListForFunction);
                console.log("done country");
                findLocation(
                  shuffledListFunction,
                  eventListForFunction,
                  indexOfShuffledArray,
                  lengthOfEventList,
                  state
                );
                return;
              }
            } else if (
              lengthOfEventList < 3 &&
              indexOfShuffledArray < shuffledListFunction.length
            ) {
              indexOfShuffledArray += 1;
              findLocation(
                shuffledListFunction,
                eventListForFunction,
                indexOfShuffledArray,
                lengthOfEventList,
                state
              );
            }
          });
      }
    }
  } else {
    state = false;
    console.log(indexOfShuffledArray);
    console.log(eventListForFunction);
    console.log(`done outside`);
  }
} // big function closes here

// Main
let date = "4/20";
fetch(`https://byabbe.se/on-this-day/${date}/events.json`)
  .then((result) => {
    return result.json();
  })
  .then((data) => {
    console.log("Raw Data events from api: ", data);
    let events = data.events;
    let shuffledEventsList = shuffleEvents(events);
    let chosenEventsList = [];
    let indexShuffle = 0;
    let listLength = 1;
    let shouldLoop = true;
    //    shuffledlist of objects, chosenList
    findLocation(
      shuffledEventsList,
      chosenEventsList,
      indexShuffle,
      listLength,
      shouldLoop
    );
  });
