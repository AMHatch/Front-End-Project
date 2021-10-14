function getTodaysDate() {
    let today = new Date();
    let todayDate = (today.getMonth()+1)+'/'+today.getDate();
    return todayDate
}

console.log(getTodaysDate());
