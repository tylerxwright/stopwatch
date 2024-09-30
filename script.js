let stopwatchDisplay = document.querySelector('.stopwatch');
let timeList = document.getElementById('timeList');
let startBtn = document.getElementById('start');
let pauseBtn = document.getElementById('pause');
let continueBtn = document.getElementById('continue');
let endBtn = document.getElementById('end');
let clearBtn = document.getElementById('clear');

let elapsedTime = 0;
let interval = null;
let isRunning = false;

function updateStopwatch() {
    elapsedTime += 1000;
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    stopwatchDisplay.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        interval = setInterval(updateStopwatch, 1000);
        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        endBtn.disabled = false;
    }
});

pauseBtn.addEventListener('click', () => {
    clearInterval(interval);
    isRunning = false;
    pauseBtn.disabled = true;
    continueBtn.disabled = false;
});

continueBtn.addEventListener('click', () => {
    if (!isRunning) {
        interval = setInterval(updateStopwatch, 1000);
        isRunning = true;
        continueBtn.disabled = true;
        pauseBtn.disabled = false;
    }
});

endBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
    }
    let listItem = document.createElement('li');
    listItem.textContent = stopwatchDisplay.textContent;
    timeList.appendChild(listItem);

    elapsedTime = 0;
    stopwatchDisplay.textContent = '00:00:00';

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    continueBtn.disabled = true;
    endBtn.disabled = true;
});

clearBtn.addEventListener('click', () => {
    timeList.innerHTML = '';
});