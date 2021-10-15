

    let fetchArr =[]
for(let page = 1;page<11;page++){
    fetch(`https://icanhazdadjoke.com/search?page=${page}&limit=30`)
        .then(response => response.json())
        .then(jokes => {
        // console.log("jokes",jokes);
        // // fetchArr.push(jokes);
        // console.log('fetchArr',fetchArr);
        
    });
};
