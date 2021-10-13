let date = "10/9"

fetch(`https://byabbe.se/on-this-day/${date}/events.json`).then(result => {
    return result.json()
})
.then(data => {
    // let link = data.events[0].wikipedia[0].wikipedia
    // console.log(link)
    // let events = data.events;
    // console.log(events);

    // // let firstEvent = events[0]
    // let secondEvent = events[1];
    // let wikiLinksList = secondEvent.wikipedia;
    // let firstWikiLinkObj = wikiLinksList[0];
    // let firstWikiLink = firstWikiLinkObj.wikipedia;
    // // console.log(firstWikiLink);

    // test items:
    // let firstWikiLink = "https://en.m.wikipedia.org/wiki/Battle_of_Gettysburg"
    // let firstWikiLink = "https://en.wikipedia.org/wiki/South_Carolina"
    // let firstWikiLink = "https://en.wikipedia.org/wiki/Tandil"
    let firstWikiLink = "https://en.wikipedia.org/wiki/Tokelau"
    

    fetch(firstWikiLink).then(result => {
        // console.log(result);
        return result.text()
    })
    .then(data => {
        // console.log(data)
        let parser = new DOMParser();
        let doc = parser.parseFromString(data, 'text/html');
        // console.log(doc)

        
        if (doc.querySelector(".latitude") && doc.querySelector(".longitude")) {
            let longString = doc.querySelector(".longitude").textContent
            let long = dmsConverter(longString)
            console.log(long);

            let latString = doc.querySelector(".latitude").textContent;
            let lat = dmsConverter(latString)
            console.log(lat);
        }
        else if (doc.querySelector(".geo-dec")) {
            let parent = doc.querySelector(".geo-dec");
            let content = parent.textContent;
            let contentArray = content.split("°");
            let long = contentArray[0];
            let contentArray2 = contentArray[1].split(" ");
            let lat = contentArray2[1];
            console.log(long, lat);
        }
        else if (labelNode.textContent == "Country"){
            countryNode = labelNode
            let countryParent = countryNode.parentNode
            let countryParentLastChild = countryParent.lastChild
            let countryText = countryParentLastChild.textContent
            console.log(countryText);
        }
        else {
            console.log("error")
        }
    })
})
