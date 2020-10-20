const digits = document.querySelectorAll('.keyboard ul li');
digits.forEach(digit => {
    digit.addEventListener('click', () => {

        displayUpdate(digit.textContent);
    });
});

var arrayDigits = [];
const display = document.querySelectorAll('.display ul li span');
let display_hours = display[0];
let display_minutes = display[1];
let display_seconds = display[2];
var timeInSeconds = 0

function displayUpdate(digit){
   
    if(arrayDigits.length <6){

        arrayDigits.push(digit);

        let i = arrayDigits.length;
        if(arrayDigits[1] === undefined){
            display_seconds.innerText = arrayDigits[i - 1];
        }else{
            display_seconds.innerText = arrayDigits[i - 2] + arrayDigits[i - 1];
        }

        if(arrayDigits[2] !== undefined){
            display_minutes.innerText = arrayDigits[i - 3]
        }

        if(arrayDigits[3] !==  undefined){
            display_minutes.innerText = arrayDigits[i - 4] + arrayDigits[i - 3]

        }

        if(arrayDigits[4] !== undefined){
            display_hours.innerText = arrayDigits[i - 5]
        }
        if(arrayDigits[5] !==  undefined){
            display_hours.innerText = arrayDigits[i - 6] + arrayDigits[i - 5]

        }

        adjust()

    }
    // console.log(display_hours.textContent + 'h', display_minutes.textContent + 'm', display_seconds.textContent + 's');
}

function adjust(){
    let hours = Number(display_hours.textContent);
    let minutes = Number(display_minutes.textContent);
    let seconds = Number(display_seconds.textContent);

    minutes += Math.floor(seconds / 60); 
    seconds = seconds % 60;

    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;

    console.log(`AJUSTADO ${hours} Horas ${minutes} Minutos ${seconds} Segundos`);
    let hourInSeconds = hours * 3600;
    let minutesInSeconds = minutes * 60;
    timeInSeconds = hourInSeconds + minutesInSeconds + seconds;
}

const btnStart = document.querySelector('.start');
btnStart.addEventListener('click',() => {
    start(timeInSeconds);
    const timeContainer = document.querySelector('.time_container');
    timeContainer.style.top = "0";
})

function start(timeInSeconds){

    const time = setInterval(() =>{
        const timer = document.querySelector('.cronometro');
        timer.innerText = hours;

        // alert(`se passaram ${timeInSeconds} segundos`);
        clearInterval(time);
    },timeInSeconds* 1000);

}