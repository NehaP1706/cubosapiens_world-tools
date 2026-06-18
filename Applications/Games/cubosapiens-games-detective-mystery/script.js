'use strict';

// ─── CASE DATABASE ────────────────────────────────────────────────────────────
const CASES = [
  {
    id: 'C001',
    title: 'The Midnight Heist',
    location: 'The Grand Museum',
    scene: `At 2:14 AM, the Starlight Diamond — valued at £4.2 million — vanished from its display case on the third floor of the Grand Museum. The alarm was disabled for exactly 7 minutes. Security footage shows a shadow near the east wing. A half-eaten chocolate bar was found at the scene. The janitor reports hearing heels on the marble floor at 2:10 AM.`,
    evidence: [
      { icon: '💎', text: 'Alarm disabled 2:07–2:14 AM' },
      { icon: '👠', text: 'High-heel impressions in dust near case' },
      { icon: '🍫', text: 'Half-eaten luxury chocolate bar (Valrhona)' },
      { icon: '🔑', text: 'Security keycard last used: staff entrance' },
      { icon: '📱', text: 'Phone signal traced to east wing at 2:09 AM' },
      { icon: '🧤', text: 'Single black glove, size small, found nearby' },
    ],
    suspects: [
      {
        name: 'Vivienne Thorn',
        role: 'Museum Curator',
        avatar: '👩‍💼',
        traits: ['Access codes', 'Works late', 'Knows security'],
        alibi: 'Claims she was home asleep',
      },
      {
        name: 'Marcus Veil',
        role: 'Night Security Guard',
        avatar: '💂',
        traits: ['On duty', 'Near east wing', 'Keycard access'],
        alibi: 'Says he was doing perimeter rounds',
      },
      {
        name: 'Isolde Crane',
        role: 'Visiting Art Appraiser',
        avatar: '🧑‍🎨',
        traits: ['Knew diamond value', 'Staying nearby', 'Wears heels'],
        alibi: 'Claims to have been at the hotel bar',
      },
      {
        name: 'Dorian Ash',
        role: 'Maintenance Tech',
        avatar: '🔧',
        traits: ['Alarm expertise', 'Late shift', 'Small hands'],
        alibi: 'Says he was fixing boiler in basement',
      },
    ],
    culpritIndex: 2,
    clues: [
      {
        question: 'The security keycard used at 2:07 AM belonged to which role?',
        options: ['Night Security Guard', 'Museum Curator', 'Visiting Appraiser', 'Maintenance Tech'],
        correct: 1,
        feedback: 'The keycard was cloned from the Curator\'s master card — only Vivienne had access to the original, but she lent it to Isolde for "after-hours research access" two days prior.',
      },
      {
        question: 'What does the Valrhona chocolate bar most likely tell us?',
        options: [
          'It was planted as a distraction',
          'The thief has refined, expensive tastes',
          'The janitor dropped it during rounds',
          'It was stolen from the gift shop',
        ],
        correct: 1,
        feedback: 'Valrhona is a high-end French chocolatier. Isolde Crane\'s hotel receipt shows a box of Valrhona Grands Crus purchased the afternoon before the theft.',
      },
      {
        question: 'The phone signal in the east wing at 2:09 AM — whose number does it belong to?',
        options: ['Marcus Veil', 'Dorian Ash', 'Isolde Crane', 'Vivienne Thorn'],
        correct: 2,
        feedback: 'Carrier records confirm the signal came from a prepaid SIM — but the device model (an iPhone 15 Pro) matches the one Isolde registered at the hotel check-in.',
      },
      {
        question: 'The heel impressions in dust suggest what?',
        options: [
          'The thief was over six feet tall',
          'The thief wore formal footwear — likely women\'s heels',
          'The janitor was careless with his mop',
          'The museum had recently replaced the floor',
        ],
        correct: 1,
        feedback: 'Forensics measured the stride and heel depth. The impressions match a women\'s size 7 stiletto — consistent with the shoes Isolde wore at the hotel that evening.',
      },
      {
        question: 'Why was Marcus Veil\'s alibi suspicious?',
        options: [
          'He was seen on CCTV leaving the building',
          'His perimeter log showed no east wing entry — but his swipe card was used there',
          'He owns a chocolate shop',
          'He had previously worked with Vivienne',
        ],
        correct: 1,
        feedback: 'Marcus\'s patrol log skips the east wing entirely during 2:00–2:20 AM, yet the keycard reader shows a badge scan. Someone used a cloned badge — eliminating Marcus as a direct suspect.',
      },
    ],
    verdict: 'Isolde Crane orchestrated the theft after weeks of planning. She cloned the Curator\'s keycard, disabled the alarm remotely using schematics obtained during her "appraisal visit," and made her escape through the staff entrance wearing gloves. The diamond was later recovered in a false-bottomed luggage at Heathrow Airport.',
    difficulty: 'medium',
  },

  {
    id: 'C002',
    title: 'The Poisoned Pen',
    location: 'Blackwood Manor Library',
    scene: `Lord Edmund Blackwood, 74, was found unresponsive at his writing desk in the library at 9:45 PM. His evening tea sat half-drunk beside a manuscript he was editing. The doctor confirmed a fast-acting sedative in the tea — enough to induce cardiac arrest in an elderly man. The library had been locked from inside. A window latch was found bent outward.`,
    evidence: [
      { icon: '☕', text: 'Sedative compound in tea — Rohypnol derivative' },
      { icon: '🪟', text: 'Bent window latch, consistent with forced entry from inside' },
      { icon: '📝', text: 'Manuscript: a new will, pages 3-4 missing' },
      { icon: '🧴', text: 'Trace of hand lotion on teacup rim (lavender-scented)' },
      { icon: '🔐', text: 'Library locked from inside — key still in lock' },
      { icon: '📞', text: 'Lord Blackwood received a call at 9:00 PM, 8 minutes long' },
    ],
    suspects: [
      {
        name: 'Reginald Blackwood',
        role: 'Estranged Nephew',
        avatar: '🧔',
        traits: ['Stood to inherit', 'Financial trouble', 'Arrived unannounced'],
        alibi: 'Says he was in the drawing room all evening',
      },
      {
        name: 'Mrs. Pryce',
        role: 'Head Housekeeper',
        avatar: '👩‍🦳',
        traits: ['Prepared the tea', 'Wears lavender lotion', 'Library key access'],
        alibi: 'Claims she served the tea and went to bed at 9 PM',
      },
      {
        name: 'Dr. Calloway',
        role: 'Family Physician',
        avatar: '👨‍⚕️',
        traits: ['Medical knowledge', 'Access to sedatives', 'Visited 3 PM that day'],
        alibi: 'Left the manor by 4 PM per his log',
      },
      {
        name: 'Elspeth Crane',
        role: 'Literary Secretary',
        avatar: '👩‍💻',
        traits: ['Knew about will changes', 'Uses lavender lotion', 'Remote access'],
        alibi: 'Was working from home — confirmed by laptop logs',
      },
    ],
    culpritIndex: 1,
    clues: [
      {
        question: 'The lavender lotion trace on the teacup is significant because:',
        options: [
          'It proves the tea was served by someone wearing lotion',
          'Lavender lotion is found in the Lord\'s bathroom',
          'Both Mrs. Pryce and Elspeth use lavender lotion',
          'The Lord had allergies to lavender',
        ],
        correct: 0,
        feedback: 'The rim trace indicates someone handled the cup after the tea was poured — specifically while placing the cup down or adding the compound. Only the tea-server\'s hands would leave a rim trace.',
      },
      {
        question: 'Why is the bent window latch a red herring?',
        options: [
          'It was bent inward, not outward',
          'The latch was bent from inside to simulate forced entry — the door was never unlocked',
          'Windows don\'t have latches at Blackwood Manor',
          'The window was nailed shut for winter',
        ],
        correct: 1,
        feedback: 'The forensics team noted the latch metal bent outward in a way only reachable from inside the room. This was staged to suggest an intruder — but the real killer had a key and locked the door after.',
      },
      {
        question: 'The missing pages 3-4 of the manuscript (new will) likely contained:',
        options: [
          'Edits to a chapter about his youth',
          'The beneficiary list — naming who would inherit',
          'A dedication to the housekeeper',
          'Old debts Lord Blackwood wanted forgiven',
        ],
        correct: 1,
        feedback: 'Lord Blackwood had mentioned to his solicitor that he was revising his estate distribution. Pages 3-4 in a will-format manuscript would be the primary beneficiary declarations — whoever removed them did not want to be found named or removed from inheritance.',
      },
      {
        question: 'Dr. Calloway\'s visit at 3 PM is notable because:',
        options: [
          'He prescribed a sedative that day',
          'The library\'s CCTV showed him near the kitchen after he supposedly left',
          'He and the Lord had an argument witnessed by staff',
          'He brought the manuscript from a publisher',
        ],
        correct: 1,
        feedback: 'A kitchen camera timestamped 4:22 PM captured a silhouette consistent with Dr. Calloway. However, his medical bag was checked — no sedatives unaccounted for. He likely did not administer the compound.',
      },
      {
        question: 'What does the 9:00 PM phone call most likely tell us?',
        options: [
          'Lord Blackwood was arguing with a business partner',
          'Elspeth called to discuss the will changes she discovered',
          'Reginald called asking for money',
          'Dr. Calloway called to check on his patient',
        ],
        correct: 1,
        feedback: 'Phone records show the 8-minute call came from Elspeth\'s number. But analysis of her laptop logs shows she was logged in but idle — she may have made the call to distract or learn what he was changing in the will, then relayed information to an accomplice.',
      },
    ],
    verdict: 'Mrs. Pryce poisoned the Lord\'s evening tea. She had served him for 22 years and was named prominently in his previous will. Upon learning he was rewriting the document, she added a sedative compound — obtained through Dr. Calloway\'s unlocked medical bag during his afternoon visit — to the tea. She then staged a forced-entry scene before locking the library from outside using her master key and removing the incriminating will pages.',
    difficulty: 'hard',
  },

  {
    id: 'C003',
    title: 'The Missing Prototype',
    location: 'Nexus Tech Headquarters',
    scene: `At 6:00 PM on Friday, the NX-7 AI chip prototype — worth an estimated $40 million in trade secrets — disappeared from Lab 3B at Nexus Tech. The lab requires biometric access. Only four employees had clearance. CCTV footage shows a figure in a white lab coat entering at 5:47 PM. The prototype's tracking chip was found disabled in a bathroom bin.`,
    evidence: [
      { icon: '💻', text: 'Tracking chip disabled — requires engineering tool' },
      { icon: '🧥', text: 'White lab coat (size M) found in Lab 3B recycling bin' },
      { icon: '📡', text: 'Biometric log: access at 5:47 PM — reading corrupted' },
      { icon: '📧', text: 'Anonymous email sent to competitor firm at 5:50 PM' },
      { icon: '🅿️', text: 'Parking lot CCTV: silver Toyota Prius left at 6:02 PM' },
      { icon: '☕', text: 'Coffee mug with lip print found on lab bench' },
    ],
    suspects: [
      {
        name: 'Dr. Yuna Park',
        role: 'Lead Engineer',
        avatar: '👩‍🔬',
        traits: ['Created prototype', 'Biometric access', 'Knows disable method'],
        alibi: 'Says she left at 5:30 PM for a dentist appointment',
      },
      {
        name: 'Felix Krohn',
        role: 'Product Manager',
        avatar: '👨‍💼',
        traits: ['Rival company contact', 'Biometric access', 'Drives a Prius'],
        alibi: 'Claims he was in a board meeting until 7 PM',
      },
      {
        name: 'Sana Mirza',
        role: 'Security Analyst',
        avatar: '👩‍💻',
        traits: ['Can corrupt biometrics', 'Server room access', 'Wore lab coat'],
        alibi: 'Was monitoring security feeds from server room',
      },
      {
        name: 'Tomás Reyes',
        role: 'Hardware Technician',
        avatar: '🔧',
        traits: ['Has disabling tools', 'Works in Lab 3B', 'Size M lab coat'],
        alibi: 'Says he was in the cafeteria with colleagues',
      },
    ],
    culpritIndex: 1,
    clues: [
      {
        question: 'The corrupted biometric log at 5:47 PM suggests:',
        options: [
          'The scanner malfunctioned randomly',
          'Someone with server access deliberately corrupted their own entry log',
          'The prototype damaged nearby electronics when moved',
          'An outside hacker accessed the system',
        ],
        correct: 1,
        feedback: 'Server logs show a targeted data wipe of only the 5:47 PM biometric record — the corruption is surgical, not systemic. This strongly points to someone with both lab access AND server room privileges.',
      },
      {
        question: 'What does the anonymous email to the competitor at 5:50 PM tell us?',
        options: [
          'The thief acted alone and quickly',
          'The theft was pre-planned with an external buyer already lined up',
          'The email was sent automatically by a disgruntled ex-employee',
          'The competitor firm orchestrated the whole operation',
        ],
        correct: 1,
        feedback: 'The email contained prototype specification metadata — information only accessible inside the building\'s network. The 3-minute gap from entry (5:47) to email (5:50) suggests the sender knew exactly what to grab and had pre-drafted the message.',
      },
      {
        question: 'Dr. Yuna Park\'s alibi — dentist appointment at 5:30 PM — was:',
        options: [
          'Confirmed by the dental clinic\'s appointment records',
          'Unverified — the clinic was closed and her appointment was cancelled that morning',
          'Confirmed by two colleagues who gave her a ride',
          'Impossible to verify — records were lost',
        ],
        correct: 0,
        feedback: 'The dental clinic confirmed Yuna arrived at 5:40 PM and was in the chair until 6:25 PM — she could not have physically been in the lab at 5:47. Her alibi is solid, eliminating her.',
      },
      {
        question: 'Felix Krohn\'s board meeting alibi — how was it compromised?',
        options: [
          'The board meeting was in a different city',
          'Meeting room CCTV shows an empty chair at his seat from 5:30–6:10 PM',
          'No one could confirm he was present',
          'He accidentally called the lab from his cell phone during the meeting',
        ],
        correct: 1,
        feedback: 'The board meeting room camera clearly shows Krohn absent from 5:28 PM — his chair empty, his laptop closed. He rejoined at 6:14 PM, flushed, claiming a bathroom break. The 46-minute gap is unaccounted for.',
      },
      {
        question: 'The silver Toyota Prius leaving at 6:02 PM — what does it reveal?',
        options: [
          'It was a delivery vehicle with no connection to the case',
          'Felix Krohn owns the only registered silver Prius in the company parking lot',
          'Sana Mirza borrowed the car that day from a colleague',
          'The CCTV quality was too poor to identify the vehicle',
        ],
        correct: 1,
        feedback: 'Company parking records show Felix Krohn\'s vehicle (silver Toyota Prius, plate KR04 FLX) was logged out at 6:02 PM. He had previously stated he drove to the office that day but "took the train home." His car was found later that evening two blocks from NexusTech\'s primary competitor.',
      },
    ],
    verdict: 'Felix Krohn had been secretly negotiating with a rival company for six months. He used his biometric clearance to enter Lab 3B, grabbed the NX-7 prototype, and used Sana Mirza\'s server credentials (stolen via a phishing attack weeks prior) to corrupt his biometric log. He sent a pre-drafted email to his contact at the competitor firm, then drove the prototype directly to a handoff location. His board meeting alibi collapsed entirely under CCTV scrutiny.',
    difficulty: 'easy',
  },
];

// ─── DIFFICULTY CONFIG ────────────────────────────────────────────────────────
const DIFF = {
  easy:   { timeLimit: 0, hintsAllowed: 3, penaltyPts: 5,  correctPts: 100, accusePts: 300, label: 'Rookie' },
  medium: { timeLimit: 0, hintsAllowed: 2, penaltyPts: 15, correctPts: 150, accusePts: 500, label: 'Detective' },
  hard:   { timeLimit: 0, hintsAllowed: 1, penaltyPts: 25, correctPts: 200, accusePts: 700, label: 'Inspector' },
};

// ─── GAME STATE ───────────────────────────────────────────────────────────────
let difficulty    = 'medium';
let currentCase   = null;
let caseIndex     = 0;
let phase         = 'scene'; // scene | suspects | clues | accuse
let clueIndex     = 0;
let score         = 0;
let hintsLeft     = 2;
let correctClues  = 0;
let timerSecs     = 0;
let timerHandle   = null;
let gameOver      = false;
let accusedIndex  = null;
let notebook      = [];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function $(id) { return document.getElementById(id); }
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function fmt(s) {
  const m = Math.floor(s / 60), sec = s % 60;
  return m + ':' + String(sec).padStart(2, '0');
}
function clamp(n, min, max) { return Math.min(Math.max(n, min), max); }

// ─── TIMER ────────────────────────────────────────────────────────────────────
function startTimer() {
  if (timerHandle) return;
  timerHandle = setInterval(() => {
    timerSecs++;
    const el = $('timer-display');
    el.textContent = fmt(timerSecs);
    el.classList.remove('urgent');
  }, 1000);
}
function stopTimer() { clearInterval(timerHandle); timerHandle = null; }
function resetTimer() { stopTimer(); timerSecs = 0; $('timer-display').textContent = '0:00'; }

// ─── TOAST ────────────────────────────────────────────────────────────────────
let toastTmr = null;
function showToast(msg, type) {
  const t = $('toast');
  t.textContent = msg;
  t.className = 'toast ' + (type || 'info') + ' show';
  clearTimeout(toastTmr);
  toastTmr = setTimeout(() => t.classList.remove('show'), 2500);
}

// ─── STATUS ───────────────────────────────────────────────────────────────────
function setStatus(msg, color) {
  const el = $('status-text');
  el.textContent = msg;
  el.style.color = color || 'var(--text)';
}

// ─── PROGRESS ─────────────────────────────────────────────────────────────────
function updateProgress() {
  const total = currentCase.clues.length;
  const pct   = (clueIndex / total) * 100;
  $('progress-fill').style.width = pct + '%';
  $('progress-count').textContent = clueIndex + '/' + total;
}

// ─── NOTEBOOK ─────────────────────────────────────────────────────────────────
function addNote(type, text) {
  notebook.push({ type, text });
  renderNotebook();
}
function renderNotebook() {
  const el = $('notebook-entries');
  el.innerHTML = '';
  for (const n of notebook) {
    const div = document.createElement('div');
    div.className = 'notebook-entry clue-' + n.type;
    const icons = { correct: '✓', wrong: '✗', hint: '💡' };
    div.innerHTML = `<span class="notebook-icon">${icons[n.type] || '·'}</span><span>${n.text}</span>`;
    el.appendChild(div);
  }
  el.scrollTop = el.scrollHeight;
}

// ─── SCORE DISPLAY ────────────────────────────────────────────────────────────
function updateScore(delta) {
  score = clamp(score + delta, 0, 99999);
  $('score-display').textContent = score;

  // Flash effect
  const el = $('score-display');
  el.style.transform = 'scale(1.3)';
  setTimeout(() => { el.style.transform = 'scale(1)'; }, 200);
}

// ─── PHASE TRANSITIONS ────────────────────────────────────────────────────────
function showPhase(name) {
  document.querySelectorAll('.phase-section').forEach(s => s.classList.remove('active'));
  const el = $('phase-' + name);
  if (el) el.classList.add('active');
  phase = name;
}

// ─── BUILD GAME ───────────────────────────────────────────────────────────────
function startCase(idx) {
  caseIndex  = idx % CASES.length;
  currentCase = CASES[caseIndex];
  const cfg  = DIFF[difficulty];

  score         = 0;
  hintsLeft     = cfg.hintsAllowed;
  clueIndex     = 0;
  correctClues  = 0;
  gameOver      = false;
  accusedIndex  = null;
  notebook      = [];

  resetTimer();
  updateScore(0);
  updateProgress();
  renderNotebook();

  $('case-number').textContent = currentCase.id;
  $('case-title').textContent  = currentCase.title;
  $('case-location').textContent = '📍 ' + currentCase.location;
  $('diff-label').textContent  = cfg.label.toUpperCase();
  $('hints-left').textContent  = hintsLeft;

  buildScenePhase();
  showPhase('scene');
  setStatus('STUDY THE CRIME SCENE', 'var(--amber)');
  $('overlay').classList.remove('show');
}

function buildScenePhase() {
  $('scene-text').textContent = currentCase.scene;
  const grid = $('evidence-grid');
  grid.innerHTML = '';
  for (const ev of currentCase.evidence) {
    const chip = document.createElement('div');
    chip.className = 'evidence-chip';
    chip.innerHTML = `<span class="evidence-icon">${ev.icon}</span><span>${ev.text}</span>`;
    grid.appendChild(chip);
  }
}

function buildSuspectsPhase() {
  const grid = $('suspects-grid');
  grid.innerHTML = '';
  for (let i = 0; i < currentCase.suspects.length; i++) {
    const s = currentCase.suspects[i];
    const card = document.createElement('div');
    card.className = 'suspect-card';
    card.setAttribute('data-index', i);
    card.innerHTML = `
      <span class="suspect-avatar">${s.avatar}</span>
      <div class="suspect-name">${s.name}</div>
      <div class="suspect-role">${s.role}</div>
      <div class="suspect-traits">${s.traits.map(t => `<span class="trait-tag">${t}</span>`).join('')}</div>
    `;
    card.addEventListener('click', () => {
      document.querySelectorAll('.suspect-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      showToast('📋 SUSPECT NOTED: ' + s.name, 'info');
    });
    grid.appendChild(card);
  }
}

function buildCluePhase() {
  renderClue(clueIndex);
  updateProgress();
}

function renderClue(idx) {
  if (idx >= currentCase.clues.length) {
    transitionToAccuse();
    return;
  }

  const clue = currentCase.clues[idx];
  $('question-number').textContent = 'CLUE ' + (idx + 1) + ' OF ' + currentCase.clues.length;
  $('question-text').textContent   = clue.question;

  const optWrap = $('answer-options');
  optWrap.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  clue.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.setAttribute('data-idx', i);
    btn.innerHTML = `<span class="answer-letter">${letters[i]}</span><span>${opt}</span>`;
    btn.addEventListener('click', () => handleAnswer(i));
    optWrap.appendChild(btn);
  });

  // Hide feedback and next button
  const fb = $('clue-feedback');
  fb.className = 'clue-feedback';
  fb.textContent = '';
  $('btn-next-clue').classList.remove('show');
}

function handleAnswer(selectedIdx) {
  const clue    = currentCase.clues[clueIndex];
  const correct = selectedIdx === clue.correct;
  const cfg     = DIFF[difficulty];
  const buttons = document.querySelectorAll('.answer-btn');

  // Disable all buttons
  buttons.forEach(b => b.disabled = true);

  // Mark selected
  buttons[selectedIdx].classList.add(correct ? 'correct' : 'wrong');
  if (!correct) {
    buttons[clue.correct].classList.add('reveal');
  }

  // Feedback
  const fb = $('clue-feedback');
  fb.className = 'clue-feedback ' + (correct ? 'correct' : 'wrong') + ' show';
  fb.innerHTML = `<strong>${correct ? '✓ CORRECT' : '✗ INCORRECT'}:</strong> ${clue.feedback}`;

  // Score
  if (correct) {
    updateScore(cfg.correctPts);
    correctClues++;
    addNote('correct', clue.options[selectedIdx]);
    showToast('✓ CORRECT! +' + cfg.correctPts + ' PTS', 'success');
    setStatus('CORRECT — CLUE LOGGED', 'var(--green)');
  } else {
    updateScore(-cfg.penaltyPts);
    addNote('wrong', clue.options[selectedIdx] + ' ✗');
    showToast('✗ WRONG! -' + cfg.penaltyPts + ' PTS', 'error');
    setStatus('WRONG DEDUCTION!', 'var(--crimson)');
  }

  clueIndex++;
  updateProgress();
  $('btn-next-clue').classList.add('show');
}

function buildAccusePhase() {
  const grid = $('suspect-select-grid');
  grid.innerHTML = '';
  accusedIndex = null;
  $('btn-confirm-accuse').classList.remove('show');

  for (let i = 0; i < currentCase.suspects.length; i++) {
    const s = currentCase.suspects[i];
    const card = document.createElement('div');
    card.className = 'accuse-card';
    card.setAttribute('data-index', i);
    card.innerHTML = `
      <span class="suspect-avatar">${s.avatar}</span>
      <div class="suspect-name">${s.name}</div>
      <div class="suspect-role" style="font-size:0.7rem;color:var(--muted);margin-top:4px;letter-spacing:1px;">${s.role}</div>
    `;
    card.addEventListener('click', () => {
      document.querySelectorAll('.accuse-card').forEach(c => c.classList.remove('accused'));
      card.classList.add('accused');
      accusedIndex = i;
      $('btn-confirm-accuse').classList.add('show');
      setStatus('MAKE YOUR ACCUSATION', 'var(--crimson)');
    });
    grid.appendChild(card);
  }
}

function handleAccusation() {
  if (accusedIndex === null) return;

  const correct = accusedIndex === currentCase.culpritIndex;
  const cfg = DIFF[difficulty];
  stopTimer();
  gameOver = true;

  if (correct) {
    updateScore(cfg.accusePts);
    showResult(true);
  } else {
    updateScore(-100);
    showResult(false);
  }
}

function showResult(correct) {
  const culprit = currentCase.suspects[currentCase.culpritIndex];
  const accused = currentCase.suspects[accusedIndex];

  $('res-emoji').textContent   = correct ? '🏆' : '😔';
  const title = $('res-title');
  title.textContent            = correct ? 'CASE CLOSED!' : 'WRONG SUSPECT!';
  title.style.color            = correct ? 'var(--amber)' : 'var(--crimson)';

  if (correct) {
    $('res-sub').textContent = `You correctly identified ${culprit.name} as the culprit.`;
  } else {
    $('res-sub').textContent = `You accused ${accused.name}, but the real culprit was ${culprit.name}.`;
  }

  $('verdict-text').textContent = currentCase.verdict;

  $('res-stat-score').textContent = score;
  $('res-stat-score').style.color = correct ? 'var(--amber)' : 'var(--crimson)';
  $('res-stat-time').textContent  = fmt(timerSecs);
  $('res-stat-clues').textContent = correctClues + '/' + currentCase.clues.length;

  $('overlay').classList.add('show');
}

// ─── PHASE TRANSITIONS ────────────────────────────────────────────────────────
function transitionToScene() {
  buildScenePhase();
  showPhase('scene');
  setStatus('STUDY THE CRIME SCENE', 'var(--amber)');
}

function transitionToSuspects() {
  buildSuspectsPhase();
  showPhase('suspects');
  startTimer();
  setStatus('REVIEW THE SUSPECTS', 'var(--cyan)');
  showToast('🕵️ IDENTIFY THE KILLER', 'info');
}

function transitionToClues() {
  buildCluePhase();
  showPhase('clues');
  setStatus('ANALYSE THE CLUES', 'var(--cyan)');
}

function transitionToAccuse() {
  buildAccusePhase();
  showPhase('accuse');
  setStatus('WHO DID IT? MAKE YOUR ACCUSATION', 'var(--crimson)');
  showToast('⚠ FINAL DECISION — CHOOSE WISELY', 'error');
}

// ─── HINT LOGIC ───────────────────────────────────────────────────────────────
function useHint() {
  if (hintsLeft <= 0 || phase !== 'clues') return;
  const clue = currentCase.clues[clueIndex];
  if (!clue) return;

  // Find a wrong answer and eliminate it
  const wrongOptions = document.querySelectorAll('.answer-btn:not(:disabled)');
  let eliminated = false;
  for (const btn of wrongOptions) {
    if (parseInt(btn.dataset.idx) !== clue.correct) {
      btn.disabled = true;
      btn.style.opacity = '0.3';
      btn.style.textDecoration = 'line-through';
      eliminated = true;
      break;
    }
  }

  if (eliminated) {
    hintsLeft--;
    $('hints-left').textContent = hintsLeft;
    $('btn-hint').disabled = hintsLeft === 0;
    addNote('hint', 'Hint used on clue ' + (clueIndex + 1));
    showToast('💡 HINT USED — ' + hintsLeft + ' REMAINING', 'hint');
  }
}

// ─── DIFFICULTY SWITCH ────────────────────────────────────────────────────────
function switchDiff(d) {
  difficulty = d;
  document.querySelectorAll('.setup-btn[data-diff]').forEach(b => {
    b.classList.toggle('active', b.dataset.diff === d);
  });
  startCase(caseIndex);
}

// ─── INIT & EVENT WIRING ──────────────────────────────────────────────────────
document.querySelectorAll('.setup-btn[data-diff]').forEach(b =>
  b.addEventListener('click', () => switchDiff(b.dataset.diff))
);

$('btn-scene-next').addEventListener('click', () => transitionToSuspects());
$('btn-suspects-next').addEventListener('click', () => transitionToClues());
$('btn-next-clue').addEventListener('click', () => {
  if (clueIndex >= currentCase.clues.length) {
    transitionToAccuse();
  } else {
    renderClue(clueIndex);
    updateProgress();
    $('btn-next-clue').classList.remove('show');
    setStatus('ANALYSE THE CLUES', 'var(--cyan)');
  }
});
$('btn-confirm-accuse').addEventListener('click', () => handleAccusation());
$('btn-hint').addEventListener('click', () => useHint());

$('btn-restart').addEventListener('click', () => startCase(caseIndex));
$('btn-newcase').addEventListener('click', () => startCase(caseIndex + 1));
$('res-replay').addEventListener('click', () => startCase(caseIndex));
$('res-newcase').addEventListener('click', () => startCase(caseIndex + 1));

// How-to-play accordion
$('htp-toggle').addEventListener('click', () => {
  const body = $('htp-body'), chev = $('htp-chev');
  const open = body.classList.toggle('open');
  chev.classList.toggle('open', open);
  $('htp-toggle').setAttribute('aria-expanded', open);
});

// ─── BOOT ─────────────────────────────────────────────────────────────────────
// Load saved difficulty
const saved = localStorage.getItem('detective_diff');
if (saved && DIFF[saved]) {
  difficulty = saved;
  document.querySelectorAll('.setup-btn[data-diff]').forEach(b => {
    b.classList.toggle('active', b.dataset.diff === saved);
  });
}
// Save on change
document.querySelectorAll('.setup-btn[data-diff]').forEach(b =>
  b.addEventListener('click', () => localStorage.setItem('detective_diff', b.dataset.diff))
);
// Save high score
function saveStats() {
  const stats = JSON.parse(localStorage.getItem('detective_stats') || '{}');
  const key   = currentCase.id + '_' + difficulty;
  if (!stats[key] || score > stats[key].best) {
    stats[key] = { best: score, time: timerSecs };
    localStorage.setItem('detective_stats', JSON.stringify(stats));
  }
}
// Shuffle cases so returning players get variety
const startIdx = Math.floor(Math.random() * CASES.length);
startCase(startIdx);