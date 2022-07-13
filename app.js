const msToHHMMSS = (ms) => {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 360000) / 1000);
  const hh = h < 10 ? `0${h}` : h;
  const mm = m < 10 ? `0${m}` : m;
  const ss = s < 10 ? `0${s}` : s;
  const deciSec = ms % 1000;

  return { hh, mm, ss, deciSec };
};

const initialTime = "00:00:00.0<sub>00</sub>";

document.addEventListener("DOMContentLoaded", () => {
  let time = 0;
  let interval;

  const startPauseBtn = document.getElementById("start-pause-btn");
  const splitBtn = document.getElementById("split-btn");
  const resetBtn = document.getElementById("reset-btn");

  const startTimer = () => {
    startPauseBtn.innerHTML = "pause";
    startPauseBtn.classList.remove("stopwatch-controls-start");
    startPauseBtn.classList.add("stopwatch-controls-pause");
    resetBtn.classList.add("disabled-btn");
    splitBtn.classList.remove("disabled-btn");
    const interval = setInterval(() => {
      time++;
      const { hh, mm, ss, deciSec } = msToHHMMSS(time);
      document.getElementById(
        "stopwatch-time"
      ).innerHTML = `${hh}:${mm}:${ss}:${Math.floor(deciSec / 100)}<sub>${
        deciSec % 100
      }</sub>`;
    }, 1);
    return interval;
  };

  const addItemToSplitPauseList = (type) => {
    const { hh, mm, ss, deciSec } = msToHHMMSS(time);
    const formattedTime = `${hh}:${mm}:${ss}:${deciSec}`;
    const list = document.getElementById("stopwatch-splits-list");
    document.getElementById("stopwatch-split-time-title").innerHTML =
      formattedTime;

    document.getElementById("stopwatch-splits-list").innerHTML += `<li>
    <span>#${
      list.children.length + 1
    }</span><span class="${type}-item">${formattedTime}</span
    ><span>${type}</span>
  </li>`;
  };

  const pauseTimer = () => {
    clearInterval(interval);
    startPauseBtn.innerHTML = "start";
    splitBtn.classList.add("disabled-btn");
    resetBtn.classList.remove("disabled-btn");
    addItemToSplitPauseList("pause");
  };

  const resetTimer = () => {
    clearInterval(interval);
    startPauseBtn.innerHTML = "start";
    time = 0;
    splitBtn.classList.add("disabled-btn");
    resetBtn.classList.add("disabled-btn");
    document.getElementById("stopwatch-time").innerHTML = initialTime;
    document.getElementById("stopwatch-splits-list").innerHTML = "";
  };

  const startPause = () => {
    if (startPauseBtn.innerHTML.includes("start")) {
      interval = startTimer();
    } else {
      startPauseBtn.classList.remove("stopwatch-controls-pause");
      startPauseBtn.classList.add("stopwatch-controls-start");
      pauseTimer();
    }
  };

  startPauseBtn.addEventListener("click", startPause);
  splitBtn.addEventListener("click", () => addItemToSplitPauseList("split"));
  resetBtn.addEventListener("click", resetTimer);
});
