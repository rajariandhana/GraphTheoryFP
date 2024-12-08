let seconds = 0;
let intervalId = null;
let timeDisplay = document.getElementById('timeDisplay');
// timeDisplay.style.visibility = 'hidden';

function FormatTime(secs) {
    // const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const sec = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    timeDisplay.textContent = FormatTime(seconds);
}

function StartStopwatch() {
    if (intervalId !== null) return; // Prevent multiple intervals
    intervalId = setInterval(() => {
        seconds++;
        updateDisplay();
    }, 1000);
}

function StopStopwatch() {
    clearInterval(intervalId);
    intervalId = null;
}

function ResetStopwatch() {
    StartStopwatch();
    seconds = 0;
    updateDisplay();
}

// document.getElementById('startButton').addEventListener('click', startStopwatch);
// document.getElementById('stopButton').addEventListener('click', stopStopwatch);
// document.getElementById('resetButton').addEventListener('click', resetStopwatch);

// Initialize display
updateDisplay();
