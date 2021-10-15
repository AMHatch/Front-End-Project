let submitButtonIndex = document.querySelector("#submit-button-index");
let month = document.querySelector("#month");
let day = document.querySelector("#day");
let year = document.querySelector("#year");
let desc = document.querySelector("#desc");
let map = document.querySelector("#map");

async function initialization(){
    const today = new Date()
    const todaysDate = (today.getMonth()+1)+'/'+today.getDate();
    const mapMarkers = await main(todaysDate)
    insertData(mapMarkers)
    sortObj(mapMarkers)
}

initialization()

function insertData(chosenEventsList) {
    let event1TitleEl = document.querySelector("#event1Title");
    let event1ContentEl = document.querySelector("#event1Content");


    let event2TitleEl = document.querySelector("#event2Title");
    let event2ContentEl = document.querySelector("#event2Content");

    let event3TitleEl = document.querySelector("#event3Title")
    let event3ContentEl = document.querySelector("#event3Content");

    event1TitleEl.textContent = `Year: ${chosenEventsList[0].year}`;
    event1ContentEl.textContent = `${chosenEventsList[0].description}`;
    event2TitleEl.textContent = `Year: ${chosenEventsList[1].year}`;
    event2ContentEl.textContent = `${chosenEventsList[1].description}`;
    event3TitleEl.textContent = `Year: ${chosenEventsList[2].year}`;
    event3ContentEl.textContent = `${chosenEventsList[2].description}`;
}


submitButtonIndex.addEventListener("click", async (e) => {
    e.preventDefault();
    let dateFromIndex = month.value + "/" + day.value;
    console.log(dateFromIndex);
    if (dateFromIndex === "2/30" || dateFromIndex === "2/31" || dateFromIndex === "4/31" || dateFromIndex === "6/31" || dateFromIndex === "9/31" || dateFromIndex === "11/31"){
        alert("Please enter a valid date.")
    }
    else{
        localStorage.setItem('storedDate', dateFromIndex);
        window.location.assign('search.html')
    }; 
});
