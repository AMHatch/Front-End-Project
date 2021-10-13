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

        // if (doc.querySelector(".geo-dec")) {
        //     let parent = doc.querySelector(".geo-dec");
        //     console.log(parent);
        //     let content = parent.textContent;
        //     let contentArray = content.split("°");
        //     let long = contentArray[0];
        //     let contentArray2 = contentArray[1].split(" ");
        //     let lat = contentArray2[1];
        //     console.log(long, lat);
        // }
        if (doc.querySelector(".latitude") && doc.querySelector(".longitude")) {
            console.log("hi");
            let longSpan = doc.querySelector(".longitude").textContent
            console.log(longSpan);
            let latSpan = doc.querySelector(".latitude").textContent;
            console.log(latSpan);
            // need to split on degrees and spaces again... ask Andrew about this one
        }
        // else if (doc.querySelector(".geo-dms")) {
            
        // }
        else {
            console.log("error")
        }
    })
})
