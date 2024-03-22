const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number:' , randomNum);

window.SpeechRecognition =window.speechRecognition || window.webkitSpeechRecognition;


let recognition = new window.SpeechRecognition;

// Start recognition and game

recognition.start();


// Generate Random number
function getRandomNumber(){
    return Math.floor(Math.random() * 100) + 1;
}

// Capture user speak

function onSpeak(e){
    const msg = e.results[0][0].transcript;

    writeMessage(msg); 
    // checkNumber(msg);
}

// Wrtie waht user speaks
function writeMessage(msg){
    msgEl.innerHTML =`
    <div>You said:</div>
    <span class="box">${msg}</span>
    `;
}

// check message against number

function chcekNumber(msg){
    const num = +msg;
 
    // check if valid number
    if(Number.NaN(num)){
        msg.innerHTML = ' <div>That is not a valid Number </div>';

        return;
    }
}



// Speak Result

recognition.addEventListener('resullt', onSpeak)