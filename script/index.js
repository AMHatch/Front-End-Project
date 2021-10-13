let submitButton = document.querySelector("#submit-button");
let month = document.querySelector("#month");
let day = document.querySelector("#day");

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let date = month.value + "/" + day.value;
    // console.log(date);
    return date;
});