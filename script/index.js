let submitButton = document.querySelector("#submit-button");
let month = document.querySelector("#month");
let day = document.querySelector("#day");

submitButton.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(month.value + "/" + day.value)
    let date = month.value + "/" + day.value
    return date
})