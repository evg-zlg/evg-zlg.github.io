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
    const countGlob = count; // сохраняем количество кругов
    let timer = parseInt(document.getElementById('timer').textContent.split('\n')[0])
    const timerGlob = timer; // сохраняем количество времени на отдых

    const circles = createCircles(count); // генерируем массив кругов 
    const allSteps = circles.length -1; // сохраняем количество кругов 
                                        // (включая разминку и заминку)
    
    function nextStep(step) {
        if ((step-1) < allSteps) {
            let ids = 'circle'+step;
            document.getElementById(ids).style='color: red'
            if (step>0) {
                preStep = step - 1;
                ids = 'circle'+preStep;
                document.getElementById(ids).style='color: black'
                document.getElementById('count').textContent = count
                count--
            }
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
            document.getElementById('stop').style = 'visibility: visible;'   
            printCircles(circles);
            step = 0;
            step = nextStep(step);
            stateStop = false;

        } else if (runButton.className === 'restart') {
            document.getElementById('run').className = 'start'
            document.getElementById('run').textContent = 'Начать тренировку'
            document.getElementById('stop').style = 'visibility: hidden;'
            document.getElementById('timer').textContent = timerGlob;
            document.getElementById('count').textContent = countGlob;
            timer = timerGlob
            count = countGlob
            
        }
    })
    let stopButton = document.getElementById('stop');
    //Отдых
    stopButton.addEventListener('click', cel =>{
            stateStop = !stateStop;
            if (stateStop) {
                timer = timerGlob
                document.getElementById('stop').textContent= 'Завершить отдых'
                const myInterval = setInterval(() => {
                    if (!stateStop) {
                        clearInterval(myInterval);
                    }
                    if (document.getElementById('run').className === 'start') {
                        clearInterval(myInterval);
                    }
                    if ((timer >0)&&(stateStop)) {
                        timer --
                        document.getElementById('timer').textContent = timer
                    } else if ((timer === 0 )&&(count !== 0)) { 
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
}
