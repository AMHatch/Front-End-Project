function dmsConverter(string) {
    // console.log(string);
    // let spaceSplit = string.split(" ")
    // console.log(spaceSplit);
    let beforeDecimal = parseFloat(string.split("°")[0])
    let afterDecimal = string.split("°")[1]
    // console.log(beforeDecimal);
    // console.log(afterDecimal);
    if(string.includes("′") && string.includes("″")){
        let minuteSplitArr = afterDecimal.split("′")
        let minutes = parseFloat(minuteSplitArr[0]);
        let minutesConverted = minutes/60
        let secondsWithDirection = minuteSplitArr[1]
        // console.log(secondsWithDirection);
        let seconds = secondsWithDirection.split("″")[0];
        // console.log(seconds);
        let secondsConverted = seconds/3600
        return beforeDecimal + minutesConverted + secondsConverted
    }
    // // // formats for degrees, minutes, seconds
    else if (string.includes("″")) {
        let minutes = parseFloat(afterDecimal.split("′")[0]);
        let minutesConverted = minutes/60
        // console.log(secondsConverted);
        return beforeDecimal + minutesConverted
    }
    return beforeDecimal
}
// let date = '3/20'
// fetch(`https://byabbe.se/on-this-day/${date}/events.json`).then(result => {
//     return result.json()
// })
// .then(data => {
//     let events = data.events
//     // let firstEvent = events[0]
//     let chosenEventsList = []
//     let event

//     let randomEventIndex = Math.floor(Math.random() * events.length);
//     let randomEvent = events[randomEventIndex]
//     let secondEvent = events[1]
//     let wikiLinksList = secondEvent.wikipedia
//     let firstWikiLinkObj = wikiLinksList[0]
//     let firstWikiLink = firstWikiLinkObj.wikipedia
//     console.log(randomEvent);
//     fetch(`${firstWikiLink}`).then(result => {
//         return result.text()
//     })
//     .then(data => {
//         let parser = new DOMParser();
//         let doc = parser.parseFromString(data, 'text/html');
//         console.log(doc);
//         let firstHeading = doc.querySelector('.firstHeading')
//         console.log(firstHeading.textContent);
//     })
// })
function shuffleEvents(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        if  (arr[j].value == 'ace'){
            arr[j].score = 11
        }
        arr[j] = temp;
    }
    return arr;
}
let date = "3/20"
fetch(`https://byabbe.se/on-this-day/${date}/events.json`).then(result => {
    return result.json()
})
.then(data => {
    // test items:
    // let firstWikiLink = "https://en.wikipedia.org/wiki/South_Carolina"
    // let firstWikiLink = "https://en.wikipedia.org/wiki/Tandil"
    let events = data.events
    // let firstEvent = events[0]
    let shuffledEventsList = shuffleEvents(events)
    // console.log(shuffledEventsList);
    let foundLocation = false
    let chosenEventsList = []
    let eventToSearch = shuffledEventsList.pop()
    let linksToSearch = eventToSearch.wikipedia
    console.log(linksToSearch);
    for (let index = 0; index < linksToSearch.length; index++) {
        let link = linksToSearch[index].wikipedia;
        console.log(link);
        fetch(link).then(result => {
            return result.text()
        })
        .then(data => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(data, 'text/html');
            let infoBoxLabelList = doc.querySelectorAll('.infobox-label')
            let countryNode = null
            infoBoxLabelList.forEach((element) => {
                if(element.textContent == "Country"){
                    countryNode = element
                }
            })
            if (doc.querySelector(".latitude") && doc.querySelector(".longitude")) {
                let latString = doc.querySelector(".latitude").textContent;
                let latCoord = dmsConverter(latString).toString()
                let longString = doc.querySelector(".longitude").textContent;
                let longCoord = dmsConverter(longString).toString()
                eventObj = {locationType: "coord", country: "", latlng:{lat: latCoord, lng: longCoord}}
                console.log(eventObj);
                chosenEventsList = [...chosenEventsList, eventObj]
                console.log(chosenEventsList, 'dms');
                foundLocation = true;
            }
            else if (doc.querySelector(".geo-dec")) {
                let parent = doc.querySelector(".geo-dec");
                let content = parent.textContent;
                let contentArray = content.split("°");
                let longCoord = contentArray[0];
                let contentArray2 = contentArray[1].split(" ");
                let latCoord = contentArray2[1];
                eventObj = {locationType: "coord", country: "", latlng:{lat: latCoord, lng: longCoord}}
                console.log(eventObj);
                chosenEventsList = [...chosenEventsList, eventObj]
                console.log(chosenEventsList, 'dec');
                foundLocation = true;
            }
            else if (countryNode){
                let countryParent = countryNode.parentNode
                let countryParentLastChild = countryParent.lastChild
                let countryText = countryParentLastChild.textContent
                console.log(countryText);
                eventObj = {locationType: "country", country: `countryText`, latlng:{lat: "", lng: ""}}
                chosenEventsList = [...chosenEventsList, eventObj]
                console.log(chosenEventsList, 'country');
                foundLocation = true;
            }
            else {
                console.log('else');
            }
        })
    }
})
// linksToSearch.forEach((link) => {
//     let numLinks = linksToSearch.length
//     while (foundLocation == false){
//         console.log(link);
//     }
// })
// while (foundLocation == false){
//     linksToSearch.forEach((link) => {
//         fetch(link).then(result => {
//             return result.text()
//         })
//         .then(data => {
//             let parser = new DOMParser();
//             let doc = parser.parseFromString(data, 'text/html');
//             let infoBoxLabelList = doc.querySelectorAll('.infobox-label')
//             let countryNode = null
//             infoBoxLabelList.forEach((element) => {
//                 if(element.textContent == "Country"){
//                     countryNode = element
//                 }
//             })
//             if (doc.querySelector(".latitude") && doc.querySelector(".longitude")) {
//                 let latString = doc.querySelector(".latitude").textContent;
//                 let latCoord = dmsConverter(latString).toString()
//                 let longString = doc.querySelector(".longitude").textContent;
//                 let longCoord = dmsConverter(longString).toString()
//                 eventObj = {locationType: "coord", country: "", latlng:{lat: latCoord, lng: longCoord}}
//                 console.log(eventObj);
//                 chosenEventsList = [...chosenEventsList, eventObj]
//                 console.log(chosenEventsList, 'dms');
//                 foundLocation = true;
//             }
//             else if (doc.querySelector(".geo-dec")) {
//                 let parent = doc.querySelector(".geo-dec");
//                 let content = parent.textContent;
//                 let contentArray = content.split("°");
//                 let longCoord = contentArray[0];
//                 let contentArray2 = contentArray[1].split(" ");
//                 let latCoord = contentArray2[1];
//                 eventObj = {locationType: "coord", country: "", latlng:{lat: latCoord, lng: longCoord}}
//                 console.log(eventObj);
//                 chosenEventsList = [...chosenEventsList, eventObj]
//                 console.log(chosenEventsList, 'dec');
//                 foundLocation = true;
//             }
//             else if (countryNode){
//                 let countryParent = countryNode.parentNode
//                 let countryParentLastChild = countryParent.lastChild
//                 let countryText = countryParentLastChild.textContent
//                 console.log(countryText);
//                 eventObj = {locationType: "country", country: `countryText`, latlng:{lat: "", lng: ""}}
//                 chosenEventsList = [...chosenEventsList, eventObj]
//                 console.log(chosenEventsList, 'country');
//                 foundLocation = true;
//             }
//             else {
//                 console.log('else');
//             }
//             console.log('outside if');
//         })
//     console.log(chosenEventsList, 'outside Fetch');
//     })

// }
