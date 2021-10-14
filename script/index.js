let submitButton = document.querySelector("#submit-button");
let month = document.querySelector("#month");
let day = document.querySelector("#day");
let year = document.querySelector("#year");
let desc = document.querySelector("#desc");
let map = document.querySelector("#map");

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let date = month.value + "/" + day.value;
    console.log(date);
    if (date === "2/30" || date === "2/31" || date === "4/31" || date === "6/31" || date === "9/31" || date === "11/31"){
        alert("Please enter a valid date.")
    }
    else{
        return date;
    };
});