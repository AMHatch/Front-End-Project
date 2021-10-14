
chosenEventsList = [{country: '', locationType: 'coord', latlng: {lat: '50.06026111111111', lng: '8.26581111111111'}, description: 'Manfred von Richthofen, a.k.a. The Red Baron, shoo…nal victories before his death the following day.', year: '1918'}, {country: '', locationType: 'coord', latlng: {lat: '42', lng: '43'}, description: 'The Georgian king, Erekle II, abandoned by his Rus…, wins a victory over Ottoman forces at Aspindza.', year: '1770'}, {country: '', locationType: 'coord', latlng: {lat: '59.32944444444445', lng: '18.06861111111111'}, description: 'The sun dog phenomenon observed over Stockholm and depicted in the famous painting Vädersolstavlan.', year: '1535'}]

// selecting for DOM elements
let event1TitleEl = document.querySelector("#event1Title")
let event1ContentEl = document.querySelector("#event1Content")


let event2TitleEl = document.querySelector("#event2Title")
let event2ContentEl = document.querySelector("#event2Content")

let event3TitleEl = document.querySelector("#event3Title")
let event3ContentEl = document.querySelector("#event3Content")

event1TitleEl.textContent = `Year: ${chosenEventsList[0].year}`
event1ContentEl.textContent = `${chosenEventsList[0].description}`
event2TitleEl.textContent = `Year: ${chosenEventsList[1].year}`
event2ContentEl.textContent = `${chosenEventsList[1].description}`
event3TitleEl.textContent = `Year: ${chosenEventsList[2].year}`
event3ContentEl.textContent = `${chosenEventsList[2].description}`