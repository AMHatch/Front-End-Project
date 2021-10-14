let dadJoke = document.querySelector("#dad-joke")

fetch("https://icanhazdadjoke.com/")
.then((randomJoke) => {
    console.log(randomJoke)
})