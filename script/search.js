let submitButtonSearch = document.querySelector("#submit-button-search");
let month = document.querySelector("#month");
let day = document.querySelector("#day");
let year = document.querySelector("#year");
let desc = document.querySelector("#desc");
let map = document.querySelector("#map");

async function searchInitialization(inputDate){
    const mapMarkers = await main(inputDate)
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

submitButtonSearch.addEventListener("click", async (e) => {
    e.preventDefault();
    let date = month.value + "/" + day.value;
    console.log(date);
    if (date === "2/30" || date === "2/31" || date === "4/31" || date === "6/31" || date === "9/31" || date === "11/31"){
        alert("Please enter a valid date.")
    }
    else{
        //work in progress
        const mapMarkers = await main(date)
        insertData(mapMarkers)
        sortObj(mapMarkers)
    }; 
});
