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
    if (date === "02/30" || date === "02/31" || date === "04/31" || date === "06/31" || date === "09/31" || date === "11/31"){
        alert("Please enter a valid date.")
    }
    else{
        //work in progress
        // const mapMarkers = main(date)
        // sortObj(mapMarkers)
    };
    
});



// eventsList = [
//     {
//     "year": "409",
//     "description": "Vandals and Alans cross the Pyrenees and appear in Hispania.",
//     "map": "https://www.google.com/maps/place/Pyrenees/@42.6929706,-1.7956742,7z/data=!3m1!4b1!4m5!3m4!1s0x12a8a48b202023d5:0x1711d86785a522d6!8m2!3d42.6681804!4d1.0011899"
//     },
//     {
//     "year": "1269",
//     "description": "The present church building at Westminster Abbey is consecrated.",
//     "map": "https://www.google.com/maps/place/Westminster+Abbey/@51.4993815,-0.1286692,18z/data=!3m1!4b1!4m5!3m4!1s0x487604c4ba43352f:0xda8effa2059b537a!8m2!3d51.4993695!4d-0.1272993"
//     },
//     {
//     "year": "1307",
//     "description": "Hundreds of Knights Templar in France are simultaneously arrested by agents of Phillip the Fair, to be later tortured into a \"confession\" of heresy.",
//     "map": "https://www.google.com/maps/place/France/@46.131424,-2.4347271,6z/data=!3m1!4b1!4m5!3m4!1s0xd54a02933785731:0x6bfd3f96c747d9f7!8m2!3d46.227638!4d2.213749"
//     }
// ];