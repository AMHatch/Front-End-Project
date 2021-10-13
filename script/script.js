// var url = "https://en.wikipedia.org/w/api.php"; 

// var params = {
//     action: "query",
//     list: "search",
//     srsearch: "bears",
//     format: "json"
// };

// url = url + "?origin=*";
// Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});




// let search = 'las vegas'
// fetch(`https://en.wikipedia.org/w/rest.php/v1/search/page?q=${search}&limit=10`)
//     .then(function(response){return response.json();})
//     .then(function(response) {
//         console.log(response);
//         // console.log(response.pages[0]);
//         // console.log(response.pages[0].description);
//     })
//     .catch(function(error){console.log(error);});

// $(() => {
//     $.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${search}&format=json`)
//     .done((response) => {
//         console.log(response);
//         let pageID = response.query.search[0].pageid;
//         let pageURL = `http://en.wikipedia.org/?curid=${pageID}`
//         $.get(`${pageURL}`)
//         .done((response) => {
//             console.log(response);
//         })
//         // console.log(response.query.search[0].snippet);
//     })
// })

// $(() => {
//     $.get(`https://en.wikipedia.org/w/rest.php/v1/search/page?q=${search}&limit=10`)
//     .done((response) => {
//         console.log(response);
//         let pageID = response.pages[0].id;
//         console.log(pageID);
//         let pageURL = `http://en.wikipedia.org/?curid=${pageID}`
//         $.get(`${pageURL}`)
//         .done((response) => {
//             console.log(response);
//         })
//         // console.log(response.query.search[0].snippet);
//     })
// })
let date = '3/20'
fetch(`https://byabbe.se/on-this-day/${date}/events.json`).then(result => {
    return result.json()
})
.then(data => {
    let events = data.events
    // let firstEvent = events[0]
    let chosenEventsList = []
    let event

    let randomEventIndex = Math.floor(Math.random() * events.length);
    let randomEvent = events[randomEventIndex]
    let secondEvent = events[1]
    let wikiLinksList = secondEvent.wikipedia
    let firstWikiLinkObj = wikiLinksList[0]
    let firstWikiLink = firstWikiLinkObj.wikipedia
    console.log(randomEvent);
    fetch(`${firstWikiLink}`).then(result => {
        return result.text()
    })
    .then(data => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(data, 'text/html');
        console.log(doc);
        let firstHeading = doc.querySelector('.firstHeading')
        console.log(firstHeading.textContent);
    })
})

// once article is found use this to find country
// fetch(`https://en.wikipedia.org/wiki/Quebec_City`).then(result => {
//     return result.text()
// })
// .then(data => {
//     let parser = new DOMParser();
//     let doc = parser.parseFromString(data, 'text/html');
//     console.log(doc);
//     let infoBoxLabelList = doc.querySelectorAll('.infobox-label')
//     console.log(infoBoxLabelList);
//     let countryNode
//     infoBoxLabelList.forEach(labelNode => {
//         if (labelNode.textContent == "Country"){
//             countryNode = labelNode
//             let countryParent = countryNode.parentNode
//             let countryParentLastChild = countryParent.lastChild
//             let countryText = countryParentLastChild.textContent
//             console.log(countryText);
//         }
//     });
// })


