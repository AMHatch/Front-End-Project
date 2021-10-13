
function dmsConverter(string) {
    let firstArray = string.split("°");
    let secondArray = firstArray[1].split("′");
    let formattedArray = [];
    
    // formats for degrees, minutes, seconds
    if (string.includes("″")) {
        let thirdArray = secondArray[1].split("″")
        let formattedArray = [];
        formattedArray.push(firstArray[0],secondArray[0],thirdArray[0]);
        let decimalFormat = formattedArray.join(".");
        return decimalFormat;
    }
    // formats for degrees, minutes
    else {
        formattedArray.push(firstArray[0], secondArray[0]);
        let decimalFormat = formattedArray.join(".");
        return decimalFormat;
    }   
}


// dmsConverter("46° 48′N")