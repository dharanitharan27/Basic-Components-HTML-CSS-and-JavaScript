// DOM Elements
const timerDisplay = document.getElementById('timer-display');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const playPauseBtn = document.getElementById('play-pause');
const resetBtn = document.getElementById('reset');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const progressRing = document.querySelector('.progress-ring');

// Audio setup
const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');

// Timer state
let totalSeconds = 60;
let currentSeconds = totalSeconds;
let isPlaying = false;
let timerInterval = null;

// Format time to HH:MM:SS
function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Update progress ring
function updateProgress() {
    const progress = ((totalSeconds - currentSeconds) / totalSeconds) * 360;
    progressRing.style.background = `conic-gradient(
        #60A5FA ${progress}deg,
        #1a202c ${progress}deg
    )`;
}

// Update timer display
function updateDisplay() {
    timerDisplay.textContent = formatTime(currentSeconds);
    updateProgress();
}

// Calculate total seconds from inputs
function calculateTotalSeconds() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    return hours * 3600 + minutes * 60 + seconds;
}

// Handle input changes
function handleInputChange() {
    const newTotal = calculateTotalSeconds();
    if (newTotal >= 0 && newTotal <= 86400) { // Max 24 hours
        totalSeconds = newTotal;
        currentSeconds = newTotal;
        updateDisplay();
    }
}

// Toggle timer state
function toggleTimer() {
    isPlaying = !isPlaying;
    playPauseBtn.classList.toggle('playing');
    playIcon.classList.toggle('hidden');
    pauseIcon.classList.toggle('hidden');

    const inputs = [hoursInput, minutesInput, secondsInput];
    inputs.forEach(input => input.disabled = isPlaying);

    if (isPlaying) {
        if (currentSeconds === 0) {
            currentSeconds = totalSeconds;
        }
        timerInterval = setInterval(() => {
            currentSeconds--;
            updateDisplay();
            
            if (currentSeconds <= 0) {
                audio.play();
                clearInterval(timerInterval);
                isPlaying = false;
                playPauseBtn.classList.remove('playing');
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
                inputs.forEach(input => input.disabled = false);
            }
        }, 1000);
    } else {
        clearInterval(timerInterval);
    }
}

// Reset timer
function resetTimer() {
    clearInterval(timerInterval);
    isPlaying = false;
    playPauseBtn.classList.remove('playing');
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
    
    const inputs = [hoursInput, minutesInput, secondsInput];
    inputs.forEach(input => input.disabled = false);
    
    currentSeconds = totalSeconds;
    updateDisplay();
}

// Event listeners
[hoursInput, minutesInput, secondsInput].forEach(input => {
    input.addEventListener('change', handleInputChange);
});

playPauseBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);

// Initial display update
updateDisplay();
