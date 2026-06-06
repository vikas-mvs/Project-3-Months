var task = document.getElementById("task");
var btn = document.getElementById("btn");
var time = document.getElementById("time");

var tasktitle = document.getElementById("tasktitle");
var timer = document.getElementById("timer");

var timeLeft = 0;
var timeText = "00:00";
var totalSeconds = 0; // store the initial total seconds for progress calculation

function start() {
  tasktitle.innerHTML = task.value;
  totalSeconds = parseInt(time.value) * 60 || 0;
  timeLeft = totalSeconds;

  const myInterval = setInterval(() => {
    timeLeft--;

    let minutes = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    let seconds = (timeLeft % 60).toString().padStart(2, "0");

    timeText = minutes + ":" + seconds;

    timer.innerHTML = timeText;

    updateProgress();

    if (timeLeft === 0) {
      clearInterval(myInterval);
      alert("Timer Over");
    }
  }, 1000);
}
function updateProgress() {
  // Guard: if totalSeconds is zero, set progress to 0
  if (!totalSeconds || totalSeconds <= 0) {
    document.getElementById("progressBar").style.width = "0%";
    return;
  }

  let elapsed = totalSeconds - timeLeft;
  let progress = (elapsed / totalSeconds) * 100;
  // Clamp between 0 and 100
  progress = Math.max(0, Math.min(100, progress));
  document.getElementById("progressBar").style.width = progress + "%";
}
