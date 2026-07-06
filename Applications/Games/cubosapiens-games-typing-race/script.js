let db = null;
let currentDifficulty = 'easy';
let currentText = '';
let currentIndex = 0;
let mistakes = 0;
let totalTyped = 0;
let timerInterval = null;
let startTime = 0;
let elapsedTime = 0;
let isPlaying = false;
let isPaused = false;

const body = document.body;
const btnTheme = document.getElementById('btn-theme');
const btnHelp = document.getElementById('btn-help');
const helpModal = document.getElementById('help-modal');
const pauseOverlay = document.getElementById('pause-overlay');
const closeBtn = document.querySelector('.close-btn');
const btnResume = document.getElementById('btn-resume');

const screens = document.querySelectorAll('.screen');
const btnDiffs = document.querySelectorAll('.btn-diff');
const textDisplay = document.getElementById('text-display');
const track = document.querySelector('.track');
const car = document.getElementById('car');
const wpmDisplay = document.getElementById('wpm');
const accDisplay = document.getElementById('accuracy');
const timeDisplay = document.getElementById('time');
const btnPause = document.getElementById('btn-pause');
const btnRestart = document.getElementById('btn-restart');
const mobileInput = document.getElementById('mobile-input');

const finalWpm = document.getElementById('final-wpm');
const finalAcc = document.getElementById('final-accuracy');
const finalTime = document.getElementById('final-time');
const btnPlayAgain = document.getElementById('btn-play-again');

async function fetchDb() {
  try {
    const res = await fetch('db.json');
    db = await res.json();
  } catch (err) {
    console.error("Failed to load db.json", err);
    db = {
      easy: ["the quick fox jumps", "a cat runs fast"],
      medium: ["The quick brown fox jumps.", "A fast car zoomed by."],
      hard: ["\"Stop!\" she yelled, quickly."]
    };
  }
}

fetchDb();

btnTheme.addEventListener('click', () => {
  body.classList.toggle('night-mode');
  if (body.classList.contains('night-mode')) {
    btnTheme.textContent = '☀️ Day Mode';
  } else {
    btnTheme.textContent = '🌙 Night Mode';
  }
});

btnHelp.addEventListener('click', () => helpModal.classList.add('active'));
closeBtn.addEventListener('click', () => helpModal.classList.remove('active'));
window.addEventListener('click', (e) => {
  if (e.target === helpModal) helpModal.classList.remove('active');
});

function showScreen(screenId) {
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

btnDiffs.forEach(btn => {
  btn.addEventListener('click', () => {
    currentDifficulty = btn.dataset.level;
    startGame();
  });
});

function startGame() {
  if (!db) return;
  const texts = db[currentDifficulty];
  currentText = texts[Math.floor(Math.random() * texts.length)];
  
  currentIndex = 0;
  mistakes = 0;
  totalTyped = 0;
  elapsedTime = 0;
  isPlaying = true;
  isPaused = false;
  
  wpmDisplay.textContent = '0';
  accDisplay.textContent = '100';
  timeDisplay.textContent = '0';
  car.style.left = '0%';
  
  mobileInput.value = '';
  mobileInput.focus();
  
  renderText();
  showScreen('game-screen');

  if (track) track.classList.remove('paused');
  car.classList.remove('engine-start');
  void car.offsetWidth; 
  car.classList.add('engine-start');
  
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
}

function renderText() {
  textDisplay.innerHTML = '';
  currentText.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.classList.add('char');
    if (index === 0) span.classList.add('current');
    textDisplay.appendChild(span);
  });
}

function updateTimer() {
  if (isPaused || !isPlaying) return;
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  timeDisplay.textContent = elapsedTime;
  updateStats();
}

function updateStats() {
  const wordsTyped = currentIndex / 5;
  const minutes = elapsedTime / 60;
  const wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
  wpmDisplay.textContent = wpm;

  const accuracy = totalTyped > 0 ? Math.round(((totalTyped - mistakes) / totalTyped) * 100) : 100;
  accDisplay.textContent = accuracy;
}

function finishGame() {
  isPlaying = false;
  clearInterval(timerInterval);
  
  finalWpm.textContent = wpmDisplay.textContent;
  finalAcc.textContent = accDisplay.textContent;
  finalTime.textContent = timeDisplay.textContent;
  
  showScreen('results-screen');
}

document.querySelector('.text-container').addEventListener('click', () => {
  if (isPlaying && !isPaused) mobileInput.focus();
});

document.addEventListener('keydown', (e) => {
  if (isPlaying && !isPaused && document.activeElement !== mobileInput && e.key.length === 1) {
    mobileInput.focus();
  }
});

mobileInput.addEventListener('input', (e) => {
  if (!isPlaying || isPaused) {
    mobileInput.value = currentText.substring(0, currentIndex);
    return;
  }
  
  const currentVal = mobileInput.value;
  
  if (currentVal.length <= currentIndex) {
    mobileInput.value = currentText.substring(0, currentIndex);
    return;
  }
  
  const charTyped = currentVal[currentVal.length - 1];
  const expectedChar = currentText[currentIndex];
  
  totalTyped++;
  
  const spans = textDisplay.querySelectorAll('.char');
  const currentSpan = spans[currentIndex];
  
  if (charTyped === expectedChar) {
    currentSpan.classList.remove('current', 'incorrect');
    currentSpan.classList.add('correct');
    
    currentIndex++;
    mobileInput.value = currentText.substring(0, currentIndex);
    
    if (currentIndex < currentText.length) {
      spans[currentIndex].classList.add('current');
    }
    
    const progress = (currentIndex / currentText.length) * 90; 
    car.style.left = `${progress}%`;
    car.style.filter = 'hue-rotate(0deg)';
    
    updateStats();
    
    if (currentIndex === currentText.length) {
      finishGame();
      mobileInput.blur();
    }
  } else {
    mistakes++;
    currentSpan.classList.add('incorrect');
    updateStats();
    
    mobileInput.value = currentText.substring(0, currentIndex);
    
    car.style.filter = 'hue-rotate(-50deg) saturate(3)';
    setTimeout(() => {
      if (car.style.filter !== 'hue-rotate(0deg)') {
        car.style.filter = 'hue-rotate(0deg)';
      }
    }, 200);
  }
});

btnPause.addEventListener('click', () => {
  isPaused = true;
  pauseOverlay.classList.add('active');
  if (track) track.classList.add('paused');
});

btnResume.addEventListener('click', () => {
  isPaused = false;
  pauseOverlay.classList.remove('active');
  if (track) track.classList.remove('paused');
  startTime = Date.now() - (elapsedTime * 1000);
});

btnRestart.addEventListener('click', startGame);
btnPlayAgain.addEventListener('click', () => showScreen('setup-screen'));

document.querySelectorAll('button').forEach((btn) => {
  btn.addEventListener('click', () => btn.blur());
});