let db = null;
let currentDifficulty = 'easy';
let currentText = '';
let currentIndex = 0;
let mistakes = 0;
let totalTyped = 0;
let timerInterval = null;
let ghostInterval = null;
let startTime = 0;
let elapsedTime = 0;
let isPlaying = false;
let isPaused = false;
let isCountdown = false;

// Selected car state
let selectedCarEmoji = '🏎️';
let selectedCarFilter = '';

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
const ghostCar = document.getElementById('ghost-car');
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

// Car options configuration
const carOpts = document.querySelectorAll('.car-opt');
carOpts.forEach(opt => {
  opt.addEventListener('click', () => {
    carOpts.forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
    selectedCarEmoji = opt.dataset.car;
    selectedCarFilter = opt.style.filter || '';
  });
});

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
  // Initialize records dashboard after db is ready
  updateRecordsDashboard();
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
  if (screenId === 'setup-screen') {
    updateRecordsDashboard();
  }
}

btnDiffs.forEach(btn => {
  btn.addEventListener('click', () => {
    currentDifficulty = btn.dataset.level;
    startGame();
  });
});

// Update Records Board from localStorage
function updateRecordsDashboard() {
  ['easy', 'medium', 'hard'].forEach(diff => {
    const wpmVal = localStorage.getItem(`typing_race_last_wpm_${diff}`);
    const timeVal = localStorage.getItem(`typing_race_last_time_${diff}`);
    const accVal = localStorage.getItem(`typing_race_last_accuracy_${diff}`);
    
    const card = document.querySelector(`.record-card[data-diff="${diff}"]`);
    if (card) {
      if (wpmVal) {
        card.querySelector('.wpm-val').textContent = wpmVal;
        card.querySelector('.time-val').textContent = `${timeVal}s`;
        card.querySelector('.acc-val').textContent = accVal;
        card.classList.add('has-record');
      } else {
        card.querySelector('.wpm-val').textContent = '-';
        card.querySelector('.time-val').textContent = '-';
        card.querySelector('.acc-val').textContent = '-';
        card.classList.remove('has-record');
      }
    }
  });
}

function runCountdown(callback) {
  const overlay = document.getElementById('countdown-overlay');
  const numEl = document.getElementById('countdown-number');
  const l1 = document.getElementById('light-1');
  const l2 = document.getElementById('light-2');
  const l3 = document.getElementById('light-3');
  
  isCountdown = true;
  overlay.classList.add('active');
  
  numEl.textContent = '3';
  l1.className = 'light red';
  l2.className = 'light';
  l3.className = 'light';
  
  setTimeout(() => {
    numEl.textContent = '2';
    l2.className = 'light red';
  }, 1000);
  
  setTimeout(() => {
    numEl.textContent = '1';
    l3.className = 'light yellow';
  }, 2000);
  
  setTimeout(() => {
    numEl.textContent = 'GO!';
    l1.className = 'light green';
    l2.className = 'light green';
    l3.className = 'light green';
  }, 3000);
  
  setTimeout(() => {
    overlay.classList.remove('active');
    isCountdown = false;
    callback();
  }, 3800);
}

function startGame() {
  if (!db) return;
  const texts = db[currentDifficulty];
  currentText = texts[Math.floor(Math.random() * texts.length)];
  
  currentIndex = 0;
  mistakes = 0;
  totalTyped = 0;
  elapsedTime = 0;
  isPlaying = false;
  isPaused = false;
  
  wpmDisplay.textContent = '0';
  accDisplay.textContent = '100';
  timeDisplay.textContent = '0';
  
  // Set selected player vehicle
  car.textContent = selectedCarEmoji;
  car.style.filter = selectedCarFilter ? `${selectedCarFilter} drop-shadow(0 4px 4px rgba(0, 0, 0, 0.4))` : 'drop-shadow(0 4px 4px rgba(0, 0, 0, 0.4))';
  car.style.left = '0%';
  car.classList.remove('nitro');
  
  // Reset ghost car
  ghostCar.style.left = '0%';
  
  mobileInput.value = '';
  renderText();
  showScreen('game-screen');

  if (track) track.classList.add('paused');
  clearInterval(timerInterval);
  clearInterval(ghostInterval);
  
  // Load target/previous score to beat
  let ghostWpm = 25;
  const lastWpmKey = `typing_race_last_wpm_${currentDifficulty}`;
  const savedLastWpm = localStorage.getItem(lastWpmKey);
  if (savedLastWpm) {
    ghostWpm = parseInt(savedLastWpm);
    document.getElementById('target-wpm').textContent = savedLastWpm;
    document.getElementById('ghost-tag').textContent = `LAST RUN (${savedLastWpm} WPM)`;
  } else {
    if (currentDifficulty === 'easy') ghostWpm = 25;
    else if (currentDifficulty === 'medium') ghostWpm = 45;
    else if (currentDifficulty === 'hard') ghostWpm = 65;
    document.getElementById('target-wpm').textContent = `${ghostWpm} (Pace)`;
    document.getElementById('ghost-tag').textContent = `PACE CAR (${ghostWpm} WPM)`;
  }

  // Start Traffic light countdown
  runCountdown(() => {
    isPlaying = true;
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    
    // Ghost competitor path duration
    const totalWords = currentText.length / 5;
    const targetDurationMs = (totalWords / ghostWpm) * 60 * 1000;
    
    ghostInterval = setInterval(() => {
      if (isPaused || !isPlaying) return;
      const elapsedMs = Date.now() - startTime;
      const ghostProgress = Math.min((elapsedMs / targetDurationMs) * 90, 90);
      ghostCar.style.left = `${ghostProgress}%`;
    }, 100);
    
    if (track) track.classList.remove('paused');
    car.classList.remove('engine-start');
    void car.offsetWidth; 
    car.classList.add('engine-start');
    
    mobileInput.focus();
  });
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
  
  // Real-time speed-activated Nitro visual effects!
  const nitroThreshold = currentDifficulty === 'easy' ? 45 : (currentDifficulty === 'medium' ? 60 : 75);
  if (wpm >= nitroThreshold) {
    car.classList.add('nitro');
  } else {
    car.classList.remove('nitro');
  }
}

function finishGame() {
  isPlaying = false;
  clearInterval(timerInterval);
  clearInterval(ghostInterval);
  
  const finalWpmVal = parseInt(wpmDisplay.textContent);
  const finalAccVal = parseInt(accDisplay.textContent);
  const finalTimeVal = parseInt(timeDisplay.textContent);
  
  finalWpm.textContent = finalWpmVal;
  finalAcc.textContent = finalAccVal;
  finalTime.textContent = finalTimeVal;
  
  // Load target to see if we beat it
  const lastWpmKey = `typing_race_last_wpm_${currentDifficulty}`;
  const savedLastWpm = localStorage.getItem(lastWpmKey);
  const targetWpm = savedLastWpm ? parseInt(savedLastWpm) : null;
  
  const beatMsgEl = document.getElementById('beat-message');
  if (targetWpm) {
    if (finalWpmVal > targetWpm) {
      beatMsgEl.innerHTML = `<span style="color: var(--primary);">👑 TARGET BEATEN BY ${finalWpmVal - targetWpm} WPM! NEW RECORD! 👑</span>`;
    } else if (finalWpmVal < targetWpm) {
      beatMsgEl.innerHTML = `<span style="color: var(--error);">GHOST BEAT YOU BY ${targetWpm - finalWpmVal} WPM. GO FAST! ⚡</span>`;
    } else {
      beatMsgEl.innerHTML = `<span style="color: var(--racing-yellow);">YOU TIED WITH THE GHOST RIDER!</span>`;
    }
  } else {
    beatMsgEl.innerHTML = `<span style="color: var(--primary);">FIRST RUN COMPLETE! SCORE RECORDED!</span>`;
  }
  
  // Save new last run values
  localStorage.setItem(`typing_race_last_wpm_${currentDifficulty}`, finalWpmVal);
  localStorage.setItem(`typing_race_last_time_${currentDifficulty}`, finalTimeVal);
  localStorage.setItem(`typing_race_last_accuracy_${currentDifficulty}`, finalAccVal);
  
  // Refresh Setup screen cards
  updateRecordsDashboard();
  
  showScreen('results-screen');
}

document.querySelector('.text-container').addEventListener('click', () => {
  if (isPlaying && !isPaused && !isCountdown) mobileInput.focus();
});

document.addEventListener('keydown', (e) => {
  if (isPlaying && !isPaused && !isCountdown && document.activeElement !== mobileInput && e.key.length === 1) {
    mobileInput.focus();
  }
});

mobileInput.addEventListener('input', (e) => {
  if (!isPlaying || isPaused || isCountdown) {
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
    
    // Reapply user's base car filter to clear mistake filter
    car.style.filter = selectedCarFilter ? `${selectedCarFilter} drop-shadow(0 4px 4px rgba(0, 0, 0, 0.4))` : 'drop-shadow(0 4px 4px rgba(0, 0, 0, 0.4))';
    
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
    
    // Flash red outline styling to vehicle
    car.style.filter = selectedCarFilter ? `${selectedCarFilter} hue-rotate(-50deg) saturate(3)` : 'hue-rotate(-50deg) saturate(3)';
    setTimeout(() => {
      if (isPlaying && !isPaused) {
        car.style.filter = selectedCarFilter ? `${selectedCarFilter} drop-shadow(0 4px 4px rgba(0, 0, 0, 0.4))` : 'drop-shadow(0 4px 4px rgba(0, 0, 0, 0.4))';
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