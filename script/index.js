let submitButton = document.querySelector("#submit-button");
let month = document.querySelector("#month");
let day = document.querySelector("#day");
let year = document.querySelector("#year");
let desc = document.querySelector("#desc");
let map = document.querySelector("#map");

async function initialization(){
    const today = new Date()
    const todaysDate = (today.getMonth()+1)+'/'+today.getDate();
    const mapMarkers = await main(todaysDate)
    sortObj(mapMarkers)
}

initialization()

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let date = month.value + "/" + day.value;
    console.log(date);
    if (date === "2/30" || date === "2/31" || date === "4/31" || date === "6/31" || date === "9/31" || date === "11/31"){
        alert("Please enter a valid date.")
    }
    else{
        //work in progress
        const mapMarkers = main(date)
        sortObj(mapMarkers)
    }; 
});
