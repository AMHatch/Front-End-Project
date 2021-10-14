chosenEventsList = [{country: '', locationType: 'coord', latlng: {lat: '50.06026111111111', lng: '8.26581111111111'}, description: 'Manfred von Richthofen, a.k.a. The Red Baron, shoo…nal victories before his death the following day.', year: '1918'}, {country: '', locationType: 'coord', latlng: {lat: '42', lng: '43'}, description: 'The Georgian king, Erekle II, abandoned by his Rus…, wins a victory over Ottoman forces at Aspindza.', year: '1770'}, {country: '', locationType: 'coord', latlng: {lat: '59.32944444444445', lng: '18.06861111111111'}, description: 'The sun dog phenomenon observed over Stockholm and depicted in the famous painting Vädersolstavlan.', year: '1535'}]

function makeDiv(classes, id) {
    let div = document.createElement("div");
    div.setAttribute('class', classes);
    if (id) {
        div.setAttribute('id', id);
    }
    return div;
}

function makeHr(classes) {
    let hr = document.createElement("hr");
    if (classes) {
        hr.setAttribute('class', classes);
    }
    return hr;
}

function makeH5(classes, text) {
    let h5 = document.createElement("h5");
    h5.setAttribute('class', classes);
    hr.textContent = text;
    return h5;
}

function makeP(classes, text) {
    let p = document.createElement("p");
    p.setAttribute('class', classes);
    p.textContent = text;
    return p;
}


// parent container
let main_container = document.querySelector("#searchDateDiv");
console.log(main_container);

// building elements
let subheadingHR = makeHr("subheading-hr");
let cardMainContainer = makeDiv("row d-flex align-items-start");
// card1
let cardContainerFirstChild = makeDiv("col-xs-12 col-sm-12 col-md-4 mb-5 d-flex justify-content-center align-items-center");
let firstCardDiv = makeDiv("card border-dark bg-med-gray");
let firstCardBody = makeDiv("card-body");
let firstCardTitle = makeH5("card-title text-white font-roboto", `Year: ${chosenEventsList[0].year}`);
let title1HR = makeHr();
let firstCardContent = makeP("card-text text-white", `${chosenEventsList[0].description}`);

// card2
let cardContainerSecondChild = makeDiv("col-xs-12 col-sm-12 col-md-4 mb-5 d-flex justify-content-center align-items-center");
let secondCardDiv = makeDiv("card border-dark bg-med-gray");
let secondCardBody = makeDiv("card-body");
let secondCardTitle = makeH5("card-title text-white font-roboto", `Year: ${chosenEventsList[1].year}`);
let title2HR = makeHr();
let secondCardContent = makeP("card-text text-white", `${chosenEventsList[1].description}`);

// card3
let cardContainerThirdChild = makeDiv("col-xs-12 col-sm-12 col-md-4 mb-5 d-flex justify-content-center align-items-center");
let thirdCardDiv = makeDiv("card border-dark bg-med-gray");
let thirdCardBody = makeDiv("card-body");
let thirdCardTitle = makeH5("card-title text-white font-roboto", `Year: ${chosenEventsList[2].year}`);
let title3HR = makeHr();
let thirdCardContent = makeP("card-text text-white", `${chosenEventsList[2].description}`);

// map area

// start assembling


// apend children to main container







