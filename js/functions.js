const digits = document.querySelectorAll('.keyboard ul li');
digits.forEach(digit => {
    digit.addEventListener('click', () => {

        displayUpdate(digit.textContent);
    });
});

const btnStart = document.querySelector('.start');
//sp- space/pause
var keySP = btnStart;
document.addEventListener('keydown', (e) => {

    if(e.keyCode === 32 || e.keyCode === 13){
        e.preventDefault();
        keySP.click();
    }

    const keyName = e.key;
    // alert('keydown event\n\n' + 'key: ' + keyName);
    if(Number(keyName)>= 0){
        displayUpdate(keyName);
    };
});

const display = document.querySelectorAll('.display ul li span');
let display_hours = display[0];
let display_minutes = display[1];
let display_seconds = display[2];

var timeInSeconds = 0
var arrayDigits = [];

const audioScroll = document.querySelector('.audio_effectScroll');

display.forEach(num =>{
    num.addEventListener('wheel',(event)=>{
        var y = event.deltaY;
        audioScroll.play();
        if(y>0){
            document.querySelector(`#${num.className}m`).click();
        }else{
            document.querySelector(`#${num.className}p`).click();
        }
        // console.log(num.className);
    })
})

const btnDisplay = document.querySelectorAll('.btn_display');
btnDisplay.forEach(btn => {
    btn.addEventListener('click',()=>{
        switch(btn.id){
            case 'hp':
                display_hours.innerText = Number(display_hours.textContent) + 1;               
            break;
            case 'hm':
                if(Number(display_hours.textContent) > 0){
                display_hours.innerText = Number(display_hours.textContent) - 1;
                }
            break;
            case 'mp':
                display_minutes.innerText = Number(display_minutes.textContent) + 1;
            break;
            case 'mm':
                if(Number(display_minutes.textContent) > 0){
                display_minutes.innerText = Number(display_minutes.textContent) - 1;
                }
            break;
            case 'sp':
                display_seconds.innerText = Number(display_seconds.textContent) + 1;
            break;
            case 'sm':
                if(Number(display_seconds.textContent) > 0){
                    display_seconds.innerText = Number(display_seconds.textContent) - 1;
                }
            break;
        }
        // console.log(btn.id);
    });
});

function displayUpdate(digit){
   
    if(arrayDigits.length <6){

        arrayDigits.push(digit);

        let i = arrayDigits.length;
        if(arrayDigits[1] === undefined){
            number = arrayDigits[i - 1];
            display_seconds.innerText = number.padStart(2, '0');

        }else{
            number = arrayDigits[i - 2] + arrayDigits[i - 1];
            display_seconds.innerText = number.padStart(2, '0');
        }

        if(arrayDigits[2] !== undefined){
            number = arrayDigits[i - 3];
            display_minutes.innerText = number.padStart(2, '0');
        }

        if(arrayDigits[3] !==  undefined){
            number = arrayDigits[i - 4] + arrayDigits[i - 3]
            display_minutes.innerText = number.padStart(2, '0');
        }

        if(arrayDigits[4] !== undefined){
            number = arrayDigits[i - 5];
            display_hours.innerText = number.padStart(2, '0');
        }
        if(arrayDigits[5] !==  undefined){
            number = arrayDigits[i - 6] + arrayDigits[i - 5];
            display_hours.innerText = number.padStart(2, '0');

        }
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
    let ajustedTime = [hours,minutes,seconds];
    let hourInSeconds = hours * 3600;
    let minutesInSeconds = minutes * 60;
    timeInSeconds = hourInSeconds + minutesInSeconds + seconds;

    return [ajustedTime, timeInSeconds];
}

const timeContainer = document.querySelector('.time_container');
btnStart.addEventListener('click',() => {
    pause.disabled = true;
    btnDel.disabled = true;

    const enablePause = setTimeout(()=>{
        pause.disabled = false;
        btnDel.disabled = false;
    },500);
    let ajusted = adjust();
    start(ajusted);
    // timeContainer.classList.add('.bounce-in-top');
    timeContainer.style.top = "0";
    timeContainer.style.animation = "bounce-in-top 1s both";


})
const audioAlarm = document.querySelector('.audio_alarm');

const pause = document.querySelector('.btnPause');

function start(ajusted){
    pause.disabled = false;
    keySP = pause;
    console.log(ajusted);
    let hours = ajusted[0][0];
    let minutes = ajusted[0][1];
    let seconds = ajusted[0][2];

    let timeInSeconds = ajusted[1]
    let second = 0;

    const timer = document.querySelector('.cronometro').childNodes;

    timer[0].innerText = hours;
    timer[2].innerText = minutes;
    timer[4].innerText = seconds;

    
    function timeStart(){
            update = setInterval(() =>{
            if(seconds == 0){
                if(minutes == 0){
                    if(hours == 0){
                        //fim
                    }else{
                        hours --;
                        minutes = 59;
                        timer[0].innerText = hours;
                        timer[2].innerText = minutes;
    
                    }
                }else{
                    minutes --;
                    seconds = 59;
                    timer[2].innerText = minutes;
                    timer[4].innerText = seconds;
    
                }
            }
            else{
                seconds --;
                timer[4].innerText = seconds;
            }
            second ++;
        },1000);

        time = setTimeout(()=>{
            audioAlarm.play();
            clearInterval(update);
            pause.disabled = true;
        },timeInSeconds * 1000);
    };
    
    timeStart();

    var stop = false;
    pause.addEventListener('click',()=>{
        pause.disabled = true;
        btnDel.disabled = true;

        const enablePause = setTimeout(()=>{
            pause.disabled = false;
            btnDel.disabled = false;
        },500)
        stop = !stop;

        if(stop == true){
            clearInterval(update);
            clearTimeout(time);
            timeInSeconds = timeInSeconds - second;
            second = 0;
            pause.textContent = 'Continuar'
        }else{
            timeStart();
            pause.textContent = 'Pausar'
        }
        
    })
}

const btnDel = document.querySelector('.btnDel');
btnDel.addEventListener('click',()=>{
    clearInterval(update);
    clearTimeout(time);
    pause.textContent = 'Pausar'
    btnStart.disabled = true;

    timeContainer.style.animation = "slide-out-top 1.0s";
    const slideOutTop = setTimeout(()=>{
        timeContainer.style.top = "-1080px";

    },1000) 
    const enableStart = setTimeout(()=>{
        btnStart.disabled = false;
    },1700)

})

const func = document.querySelector('.function');
const menu = document.querySelector('.menu>svg');
menu.addEventListener('mouseenter',() => {
    func.classList.remove('slide-out-bottom');
    func.classList.add('active','slide-in-bottom');
    menu.style.opacity = "0";
});
func.addEventListener('click',() => {
    func.classList.remove('slide-in-bottom');

    const slideOut = setTimeout(()=>{
        func.classList.add('slide-out-bottom');
    },1000)
    menu.style.opacity = "0.5";
    const timeActive = setTimeout(()=>{
        func.classList.remove('active');
    },2 * 1000)
});