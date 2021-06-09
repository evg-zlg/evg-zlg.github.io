function DayTxt(countDay) {
    d = countDay;
    if (countDay >= 0) {
        countDay = countDay % 100;
        if ((11 <= countDay) && (countDay <= 19)) {
            return (' дней')
        } else {
            countDay = countDay % 10;
            if (countDay == 1) {
                return (' день')
            } else if ((countDay >= 2) && (countDay <= 4)) {
                return (' дня')
            } else if (countDay == 0 || (countDay >= 5 && countDay <= 9)) {
                return (' дней')
            }
        }

    }
}

function printAbout() { 
    const startTime = new Date('2021-06-08');
    let lernTime = Date.now() - startTime;
    let countDay = Math.trunc(lernTime/86400000);
//   console.log(DayTxt(countDay))
    let str = 'Мужчина,  34 года, изучаю JS уже ' + countDay + DayTxt(countDay);   
//    console.log(str)
    return (str)

}
