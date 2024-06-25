const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const centiSecond = document.getElementsByClassName("msec")[0];
const lapsContainer = document.querySelector(".laps");
const clearLapsButton = document.querySelector(".lap-clear-button");

let isPlay = false;
let secCounter = 0;
let minCounter = 0;
let centiCounter = 0;
let secInterval;
let minInterval;
let centiSecInterval;
let lapCounter = 0;

const toggleButton = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
}

const play = () => {
    if (!isPlay) {
        playButton.innerHTML = 'Pause';

        minInterval = setInterval(() => {
            minute.innerHTML = `${minCounter++} :`;
        }, 60 * 1000);

        secInterval = setInterval(() => {
            if (secCounter === 59) {
                secCounter = -1;
                minCounter++;
            }
            second.innerHTML = `&nbsp;${++secCounter} :`;
        }, 1000);

        centiSecInterval = setInterval(() => {
            if (centiCounter === 99) {
                centiCounter = -1;
                secCounter++;
            }
            centiSecond.innerHTML = `&nbsp;${++centiCounter}`;
        }, 10);

        isPlay = true;
    } else {
        playButton.innerHTML = 'Play';
        clearInterval(minInterval);
        clearInterval(secInterval);
        clearInterval(centiSecInterval);
        isPlay = false;
    }
    toggleButton();
}

const reset = () => {
    playButton.innerHTML = 'Play';
    clearInterval(minInterval);
    clearInterval(secInterval);
    clearInterval(centiSecInterval);
    isPlay = false;

    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    clearLapsButton.classList.add("hidden");

    secCounter = 0;
    centiCounter = 0;
    minCounter = 0;

    second.innerHTML = '&nbsp;0 :';
    centiSecond.innerHTML = '&nbsp;0';
    minute.innerHTML = '0 :';

    lapsContainer.innerHTML = '';
}

const addLap = () => {
    lapCounter++;
    const lapItem = document.createElement("li");
    lapItem.classList.add("lap-item");
    lapItem.innerHTML = `
        <span class="number">#${lapCounter}</span>
        <span class="time-stamp">${minute.innerHTML} ${second.innerHTML} ${centiSecond.innerHTML}</span>
    `;
    lapsContainer.appendChild(lapItem);
    clearLapsButton.classList.remove("hidden"); // Show the "Clear All" button when a lap is added
}

const clearLaps = () => {
    lapsContainer.innerHTML = '';
    lapCounter = 0;
    clearLapsButton.classList.add("hidden"); // Hide the "Clear All" button when laps are cleared
}

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", addLap);
clearLapsButton.addEventListener("click", clearLaps);

