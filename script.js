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
    let str = 'Мужчина,  34 года, изучаю JS уже ' + countDay + DayTxt(countDay) + '<br>'+
        'Телеграм: @evg_zlg';
//    console.log(str)
    return (str)
}

function printArray(arraySu) {
    let id = 0
    for (i=1; i<=9; i++) {
        for (j=1; j<=9; j++) {
            id++
            document.getElementById(id).textContent = arraySu[id-1] 
        }
    }
}

function transposingArray(arraySu) {
    let arrayBuf = []
    let id = 0;
    let id2 = 0;
    for (i=1; i<=9; i++) {
        for (j=1; j<=9; j++) {
            arrayBuf[id] = arraySu[id2]
            id++
            id2 = id2 + 9 
            if (id2 >= 81) {
                id2 = (id2 % 9) + 1
            }
        }
        id2 = i
    }
 //   printArray(arrayBuf)
    return arrayBuf
}

function swapRowsSmall(arraySu) {
    let pole = Math.floor(Math.random()*3)
    let arrayBuf = arraySu.slice()
    if (pole === 0) {
    //    console.log('Меняем строки в первом поле')
        for (i=0; i<9; i++) {
            arrayBuf[i] = arraySu[i+18]
            arrayBuf[i+18] = arraySu[i]
        }
    } else if (pole === 1) {
    //   console.log('Меняем строки во втором поле')
        for (i=27; i<36; i++) {
            arrayBuf[i] = arraySu[i+18]
            arrayBuf[i+18] = arraySu[i]    

        }
    } else if (pole === 2) {
    //    console.log('Меняем строки в третьем поле')
        for (i=54; i<63; i++) {
            arrayBuf[i] = arraySu[i+18]
            arrayBuf[i+18] = arraySu[i]  
  
        }
    }
    return arrayBuf
}

function randomArray(arraySu) { // перемешиваем массив случайным образом
// транспонировать массив
    arraySu = transposingArray(arraySu)
// обмен двух строк в пределах одного района
    for (i=0; i<10; i++) {
        arraySu = swapRowsSmall(arraySu)
    }
// обмен двух столбцов в пределах одного района
// обмен двух районов по горизонтали
// обмен двух районов по вертикали

return arraySu
}

function createArray() { // создаём базовый массив
    let arraySu = [];
    let id = 0;
    let start = 1;
    for (i=1; i<=9; i++) {
        for (j=1; j<=9; j++) {
            dig = (id % 9) + start
            if (dig > 9) {dig = (dig % 9) }    
            arraySu[id] = dig
            id++
        }
        start += 3
        if (start > 9) {start = (start % 9) + 1} 
    }
    return arraySu
}

function startGame() {
    const tab = document.getElementById('table')
    tab.addEventListener('click', cel => {
        console.log(cel.target.id)
    })
    arraySu = createArray()
    arraySu = randomArray(arraySu) //глобальное перемешивание
  //  arraySu = swapRowsSmall(arraySu)
    printArray(arraySu)

}

function printTable(count) {
    let str = "<table id='table' border='1' style='border-top: 3px solid gray;" 
               + " border-left: 3px solid gray'> "
    let id = new Number;
    for (i=0; i<count; i++) {
        if ((i+1) % 3 === 0) {
            str +="<tr style='border-bottom: 3px solid gray'>"  
        } else {
            str += "<tr> "
        }
        for (j=0; j<count; j++) {
            id++
            if ((j+1) % 3 === 0) {
                str += "<td id="+id+" width='50' height='50'"+
                        " style='border-right: 3px solid grey; text-align: center' >" +
                        "</td>" 
            } else {
                str += "<td id="+id+" width='50' height='50'"+
                        " style='text-align: center'>" +
                        "</td>" 
            }           
        }
        str += "</tr>" 
    }
    document.write(str);
    //return(str)
}

