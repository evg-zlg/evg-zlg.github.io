function createCircles(count) { //создаем массив кругов
    let circles = ['Разминка']
    for (i=0; i<count; i++) {
        let j= i+1;
        let item = 'Круг ' + j;
        circles.push(item)
    }
    circles.push('Заминка')
    return circles
}

function printCircles(circles) {
    let str = '<ul style = "color: black">'
    for (i=0; i<circles.length; i++) {
        str += '<li id="circle'+i+'">'+circles[i]+'</li>'
    }
    str += '</ul>'
    document.getElementById('circles').innerHTML = str;
}

function runWorkout() {
    let stateStop = false; // состояние кнопки Отдыха
    let step = 0; // номер круга 
    let count = parseInt(document.getElementById('count').textContent.split('\n')[0])
    let countGlob = count; // сохраняем количество кругов
    let timer = parseInt(document.getElementById('timer').textContent.split('\n')[0])
    let timerGlob = timer; // сохраняем количество времени на отдых

    const circles = createCircles(count); // генерируем массив кругов 
    const allSteps = circles.length -1; // сохраняем количество кругов 
                                        // (включая разминку и заминку)
    
    function nextStep(step) {
        if ((step-1) < allSteps) {
            let ids = 'circle'+step;
            document.getElementById(ids).style='color: red'
            step++
            document.getElementById('timer').textContent = timerGlob
            document.getElementById('stop').textContent = 'Отдыхать'
            stateStop = false;
            return(step)
        } else {
            stateStop = true;
        } 
    }

    printCircles(circles);
    let runButton = document.getElementById('run');

    runButton.addEventListener('click', cel => {
        if (runButton.className === 'start') {
            document.getElementById('run').className = 'restart'
            document.getElementById('run').textContent = 'Начать сначала'
            document.getElementById('stop').style = 'visibility: visible;' +
                'width: 50mm; height: 30mm; font-size: 200%;'  
            document.getElementById('cPlus').style = 'visibility: hidden;'
            document.getElementById('cMinus').style = 'visibility: hidden;'
            document.getElementById('tPlus').style = 'visibility: hidden;'
            document.getElementById('tMinus').style = 'visibility: hidden;'

            printCircles(circles);
            step = 0;
            step = nextStep(step);
            stateStop = false;

        } else if (runButton.className === 'restart') {
            document.getElementById('run').className = 'start'
            document.getElementById('run').textContent = 'Начать тренировку'
            document.getElementById('stop').style = 'visibility: hidden; width: 10mm;'
            document.getElementById('cPlus').style = 'visibility: visible; width: 10mm;'
            document.getElementById('cMinus').style = 'visibility: visible; width: 10mm;'
            document.getElementById('tPlus').style = 'visibility: visible; width: 10mm;'
            document.getElementById('tMinus').style = 'visibility: visible; width: 10mm;'
            document.getElementById('timer').textContent = timerGlob;
            document.getElementById('count').textContent = countGlob;
            timer = timerGlob
            count = countGlob
            
        }
    })
    let stopButton = document.getElementById('stop');
    //Нажали кнопку "Отдыхать" 
    stopButton.addEventListener('click', cel =>{
            stateStop = !stateStop; // меняем маркер состояния кнопки
            if (stateStop) {
                timer = timerGlob //во временную переменную сохраняем значение таймера
                    //меняем текст кнопки
                document.getElementById('stop').textContent= 'Завершить отдых'
                    //закрашиваем зелёным законченный круг
                let ids = 'circle'+(step-1);
                document.getElementById(ids).style='color: green'
                    //уменьшаем количество оставшихся кругов 
                document.getElementById('count').textContent = count
                count--
                    // запускаем таймер отсчёта времени
                const myInterval = setInterval(() => {
                    if (!stateStop) {
                        clearInterval(myInterval);
                    }
                    if (document.getElementById('run').className === 'start') {
                        clearInterval(myInterval);
                    }
                    if ((timer >0)&&(stateStop)) {
                        timer --
                        document.getElementById('stop').textContent = timer
                    } else if ((timer === 0 )&&((count+2) !== 0)) { 
                        step = nextStep(step)
                        clearInterval(myInterval);
                    } else if (count === 0) {
                        clearInterval(myInterval);
                    }
            
                }, 1000);
            } else {
            stateStop = false;
            document.getElementById('stop').textContent = 'Отдыхать'
            step = nextStep(step);
            document.getElementById('timer').textContent = timerGlob
            }
    })
    
    let tPlusButton = document.getElementById('tPlus');
    tPlusButton.addEventListener('click', cel => {
        timerGlob = timerGlob +5;
        document.getElementById('timer').textContent = timerGlob
    })
    
    let tMinusButton = document.getElementById('tMinus');
    tMinusButton.addEventListener('click', cel => {
        timerGlob = timerGlob -5;
        document.getElementById('timer').textContent = timerGlob
    })
}
