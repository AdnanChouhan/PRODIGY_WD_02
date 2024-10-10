let startTime;
let updatedTime;
let difference;
let timerInterval;
let isRunning = false;

let savedTime = 0;
let lapTimes = [];

const timeDisplay = document.getElementById('time');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let milliseconds = ms % 1000;

    return (
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + ':' +
        (milliseconds < 100 ? '0' : '') + Math.floor(milliseconds / 10)
    );
}

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - savedTime;
        timerInterval = setInterval(() => {
            updatedTime = Date.now() - startTime;
            timeDisplay.innerHTML = formatTime(updatedTime);
        }, 10);
        startPauseBtn.textContent = 'Pause';
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        savedTime = updatedTime;
        startPauseBtn.textContent = 'Start';
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    savedTime = 0;
    updatedTime = 0;
    isRunning = false;
    timeDisplay.innerHTML = '00:00:00';
    startPauseBtn.textContent = 'Start';
    lapTimes = [];
    lapList.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        lapTimes.push(formatTime(updatedTime));
        displayLaps();
    }
}

function displayLaps() {
    lapList.innerHTML = '';
    lapTimes.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${index + 1}: ${lap}`;
        lapItem.classList.add('animated-lap');
        lapList.appendChild(lapItem);
    });
}

startPauseBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
