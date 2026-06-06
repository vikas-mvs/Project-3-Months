const $ = (id) => document.getElementById(id);

const elements = {
    task: $("task"),
    time: $("time"),
    taskTitle: $("tasktitle"),
    timer: $("timer"),
    progressBar: $("progressBar"),
    timerRing: $("timerRing"),
    statusChip: $("statusChip"),
    focusLine: $("focusLine"),
    scoreValue: $("scoreValue"),
    completedCount: $("completedCount"),
    focusedMinutes: $("focusedMinutes"),
    celebration: $("celebration"),
    celebrationText: $("celebrationText"),
    timerActionBtn: $("timerActionBtn"),
    cancelBtn: $("cancelBtn"),
    stopAlarmBtn: $("stopAlarmBtn"),
    alarmSound: $("alarmSound")
};

const focusLines = [
    "Deep work mode is on.",
    "One task. Full power.",
    "Stay with this sprint.",
    "Tiny steps, clean finish."
];

const celebrationMessages = [
    "Clean work. Take a breath.",
    "Another task locked in.",
    "Focus points added.",
    "You finished the loop."
];

const state = {
    intervalId: null,
    totalSeconds: 0,
    remainingSeconds: 0,
    status: "idle"
};

const stats = {
    completed: Number(localStorage.getItem("completedSprints")) || 0,
    minutes: Number(localStorage.getItem("focusedMinutes")) || 0
};

function setText(element, value) {
    element.textContent = value;
}

function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
    const restSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${restSeconds}`;
}

function setTimerState(status) {
    state.status = status;
    const isRunning = status === "running";

    document.body.classList.toggle("running", isRunning);
    setText(elements.timerActionBtn, status === "paused" ? "Resume" : isRunning ? "Pause" : "Start");
}

function renderStats() {
    setText(elements.completedCount, stats.completed);
    setText(elements.focusedMinutes, stats.minutes);
    setText(elements.scoreValue, stats.completed * 10 + stats.minutes);
}

function renderTimer() {
    const progress = state.totalSeconds
        ? ((state.totalSeconds - state.remainingSeconds) / state.totalSeconds) * 100
        : 0;

    setText(elements.timer, formatTime(state.remainingSeconds));
    elements.progressBar.style.width = `${progress}%`;
    elements.progressBar.style.backgroundColor = `hsl(${120 - progress}, 95%, 55%)`;
    elements.timerRing.style.background = `conic-gradient(var(--accent) ${progress * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`;
}

function startTimer() {
    const minutes = Number.parseInt(elements.time.value, 10);

    if (!minutes || minutes <= 0) {
        alert("Enter valid time");
        return;
    }

    stopAlarm();
    elements.celebration.classList.remove("show");
    document.body.classList.remove("finished");

    state.totalSeconds = minutes * 60;
    state.remainingSeconds = state.totalSeconds;

    setText(elements.taskTitle, elements.task.value.trim() || "Focus Task");
    setText(elements.statusChip, "Running");
    setText(elements.focusLine, randomItem(focusLines));

    setTimerState("running");
    renderTimer();
    runTimer();
}

function runTimer() {
    clearInterval(state.intervalId);

    state.intervalId = setInterval(() => {
        state.remainingSeconds--;
        renderTimer();

        if (state.remainingSeconds <= 0) {
            completeTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(state.intervalId);
    setTimerState("paused");
    setText(elements.statusChip, "Paused");
    setText(elements.focusLine, "Paused. Resume when ready.");
}

function resumeTimer() {
    setTimerState("running");
    setText(elements.statusChip, "Running");
    setText(elements.focusLine, "Back in focus.");
    runTimer();
}

function completeTimer() {
    clearInterval(state.intervalId);
    state.remainingSeconds = 0;

    renderTimer();
    setTimerState("idle");
    document.body.classList.add("finished");
    setText(elements.statusChip, "Done");
    setText(elements.focusLine, "Complete Task.");

    saveCompletedSprint();
    showCelebration();
    playAlarm();
}

function cancelTimer() {
    clearInterval(state.intervalId);
    state.totalSeconds = 0;
    state.remainingSeconds = 0;

    setTimerState("idle");
    document.body.classList.remove("finished");
    elements.celebration.classList.remove("show");

    setText(elements.taskTitle, "- No Task -");
    setText(elements.statusChip, "Ready");
    setText(elements.focusLine, "Pick a task and start.");
    renderTimer();
    stopAlarm();
}

function handleTimerAction() {
    if (state.status === "idle") {
        startTimer();
        return;
    }

    if (state.status === "paused") {
        resumeTimer();
        return;
    }

    pauseTimer();
}

function saveCompletedSprint() {
    stats.completed++;
    stats.minutes += Math.round(state.totalSeconds / 60);

    localStorage.setItem("completedSprints", stats.completed);
    localStorage.setItem("focusedMinutes", stats.minutes);
    renderStats();
}

function showCelebration() {
    setText(elements.celebrationText, randomItem(celebrationMessages));
    elements.celebration.classList.add("show");

    setTimeout(() => {
        elements.celebration.classList.remove("show");
    }, 4500);
}

function playAlarm() {
    elements.alarmSound.currentTime = 0;
    elements.alarmSound.loop = true;
    document.body.classList.add("alarm-on");
    elements.stopAlarmBtn.style.display = "inline-block";
    elements.alarmSound.play();
}

function stopAlarm() {
    elements.alarmSound.pause();
    elements.alarmSound.currentTime = 0;
    document.body.classList.remove("alarm-on");
    elements.stopAlarmBtn.style.display = "none";
}

elements.timerActionBtn.addEventListener("click", handleTimerAction);
elements.cancelBtn.addEventListener("click", cancelTimer);
elements.stopAlarmBtn.addEventListener("click", stopAlarm);

document.querySelectorAll("#presetTimes button").forEach((button) => {
    button.addEventListener("click", () => {
        elements.time.value = button.dataset.minutes;
    });
});

renderStats();
renderTimer();
