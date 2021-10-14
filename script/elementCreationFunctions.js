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
    hr.setAttribute('class', classes);
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

let main_container = document.querySelector("#searchDateDiv")
console.log(main_container);




