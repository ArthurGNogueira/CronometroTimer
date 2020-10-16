const digits = document.querySelectorAll('.keyboard ul li');
digits.forEach(digit => {
    digit.addEventListener('click', () => {

        displayUpdate(digit.textContent);
        console.log(digit.textContent);
    });
});

var arrayDigits = [];
const display = document.querySelectorAll('.display ul li span');
let hours = display[0];
let minutes = display[1];
let seconds = display[2];

function displayUpdate(digit){
   
    if(arrayDigits.length <6){

        arrayDigits.push(digit);
        console.log(arrayDigits);
        console.log(`O Array é ${arrayDigits}`);
        let i = arrayDigits.length;
        if(arrayDigits[1] === undefined){
            seconds.innerText = arrayDigits[i - 1];
        }else{
            seconds.innerText = arrayDigits[i - 2] + arrayDigits[i - 1];
        }

        if(arrayDigits[2] !== undefined){
            minutes.innerText = arrayDigits[i - 3]
        }

        if(arrayDigits[3] !==  undefined){
            minutes.innerText = arrayDigits[i - 4] + arrayDigits[i - 3]

        }

        if(arrayDigits[4] !== undefined){
            hours.innerText = arrayDigits[i - 5]
        }
        if(arrayDigits[5] !==  undefined){
            hours.innerText = arrayDigits[i - 6] + arrayDigits[i - 5]

        }
    }
    
    console.log(`${hours} Horas ${minutes} Minutos ${seconds} Segundos`);
}

function start(){
    minutes += seconds / 60;
    seconds = seconds % 60;
}