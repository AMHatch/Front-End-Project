let date = "10/9"

fetch(`https://byabbe.se/on-this-day/${date}/events.json`).then(result => {
    return result.json()
})
.then(data => {
    // let link = data.events[0].wikipedia[0].wikipedia
    // console.log(link)
    // let events = data.events
    // // let firstEvent = events[0]
    // let secondEvent = events[1];
    // let wikiLinksList = secondEvent.wikipedia;
    // let firstWikiLinkObj = wikiLinksList[0];
    // let firstWikiLink = firstWikiLinkObj.wikipedia;
    // // console.log(firstWikiLink);
    let firstWikiLink = "https://en.m.wikipedia.org/wiki/Battle_of_Gettysburg"

    fetch(firstWikiLink).then(result => {
        return result.text()
    })
    .then(data => {
        // console.log(data)
        let parser = new DOMParser();
        let doc = parser.parseFromString(data, 'text/html');
        // console.log(doc)

        if (doc.querySelector(".geo-dec")) {
            let parent = doc.querySelector(".geo-dec");
            let content = parent.textContent;
            let contentArray = content.split("°");
            let long = contentArray[0];
            let contentArray2 = contentArray[1].split(" ")
            let lat = contentArray2[1]
            return lat, long
        }
        else {
            console.log("error")
        }
    })
})
