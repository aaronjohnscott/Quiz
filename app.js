/* ============================================================
   Find Your Forest Vibe — quiz engine (no backend, all local)
   ============================================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'forest-vibe-quiz-v1';
  const CALM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- element lookups ---------- */
  const $ = (id) => document.getElementById(id);

  const screens = {
    start: $('screen-start'),
    quiz: $('screen-quiz'),
    results: $('screen-results')
  };

  const el = {
    startForm: $('start-form'),
    name: $('student-name'),
    startError: $('start-error'),
    resumeNote: $('resume-note'),
    resumeBtn: $('resume-btn'),
    discardBtn: $('discard-btn'),

    qForm: $('question-form'),
    qCard: $('question-card'),
    qText: $('question-text'),
    directions: $('directions'),
    qPrompt: $('question-prompt'),
    qReq: $('question-req'),
    qKind: $('q-kind'),
    qCurrent: $('q-current'),
    qTotal: $('q-total'),
    progress: $('progress-fill'),
    walker: $('trail-walker'),
    choices: $('choices'),
    written: $('written'),
    textarea: $('answer-text'),
    qError: $('q-error'),
    keyhint: $('keyhint'),
    backBtn: $('back-btn'),
    nextBtn: $('next-btn'),

    motionToggle: $('motion-toggle'),
    motionLabel: $('motion-label'),

    confetti: $('confetti'),
    resultEmoji: $('result-emoji'),
    resultFor: $('result-for'),
    resultHeading: $('result-heading'),
    resultDesc: $('result-desc'),
    tally: $('tally'),
    pdfBtn: $('pdf-btn'),
    troubleBtn: $('trouble-btn'),
    restartBtn: $('restart-btn'),
    fallback: $('fallback'),
    pngBtn: $('png-btn'),
    printBtn: $('print-btn'),
    answers: $('answers'),
    helpnote: $('helpnote'),
    teacherName: $('teacher-name'),
    teacherContact: $('teacher-contact'),

    confirmModal: $('confirm-modal'),
    confirmYes: $('confirm-yes'),

    printName: $('print-name'),
    printDate: $('print-date'),
    printResult: $('print-result'),
    printTally: $('print-tally'),
    printList: $('print-list')
  };

  /* ---------- state ---------- */
  let state = blankState();

  function blankState() {
    return { name: '', index: 0, answers: {}, order: {}, finished: false };
  }

  /* ---------- answer shuffling ----------
     Answers are authored rock/pinecone/woodland/gem but shown in a scrambled
     order, so slot 1 isn't always Rock. The shuffle for each question is
     rolled once and saved, so going Back doesn't rearrange the answers under
     the student. What gets stored is always the authoring index, which is
     what the scoring reads — the display order never touches the points. */

  function shuffled(n) {
    const list = [];
    for (let i = 0; i < n; i++) list.push(i);
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = list[i]; list[i] = list[j]; list[j] = tmp;
    }
    return list;
  }

  function displayOrder(q) {
    if (!state.order) state.order = {};
    const saved = state.order[q.id];
    if (Array.isArray(saved) && saved.length === q.options.length) return saved;

    const fresh = shuffled(q.options.length);
    state.order[q.id] = fresh;
    save();
    return fresh;
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      /* private browsing / storage full — the quiz still works, just no resume */
    }
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || typeof data !== 'object' || !data.answers) return null;
      return data;
    } catch (err) {
      return null;
    }
  }

  function clearSaved() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (err) { /* ignore */ }
  }

  /* ---------- motion switch ----------
     Some students find the drifting leaves and fireflies distracting, so the
     whole ambient layer can be shut off from the bar at the bottom. The
     choice is remembered for next time. */

  const MOTION_KEY = 'forest-vibe-motion';
  let motionOn = true;

  function applyMotion(on) {
    motionOn = on;
    document.body.classList.toggle('still', !on);
    el.motionLabel.textContent = on ? 'Stop animations' : 'Start animations';
    el.motionToggle.setAttribute('aria-pressed', String(!on));
    el.motionToggle.title = on
      ? 'Turn off the moving leaves and fireflies'
      : 'Turn the moving leaves and fireflies back on';
  }

  function initMotion() {
    let saved = null;
    try { saved = localStorage.getItem(MOTION_KEY); } catch (err) { /* ignore */ }
    applyMotion(saved ? saved === 'on' : !CALM);

    el.motionToggle.addEventListener('click', function () {
      applyMotion(!motionOn);
      try { localStorage.setItem(MOTION_KEY, motionOn ? 'on' : 'off'); } catch (err) { /* ignore */ }
    });
  }

  /* ---------- small animation helpers ---------- */

  // Re-triggers a CSS animation class that may already be on the element.
  function replay(node, className) {
    if (CALM || !motionOn) return;
    node.classList.remove(className);
    void node.offsetWidth; // force reflow
    node.classList.add(className);
  }

  function show(which) {
    Object.keys(screens).forEach((key) => {
      screens[key].classList.toggle('is-active', key === which);
    });
    window.scrollTo({ top: 0, behavior: CALM ? 'auto' : 'smooth' });
  }

  /* ============================================================
     START SCREEN
     ============================================================ */

  function initStart() {
    el.qTotal.textContent = QUESTIONS.length;

    const saved = load();
    const hasProgress = saved && (Object.keys(saved.answers).length > 0 || saved.finished);

    if (hasProgress) {
      el.resumeNote.hidden = false;
      el.name.value = saved.name || '';

      el.resumeBtn.addEventListener('click', function () {
        state = Object.assign(blankState(), saved);
        if (state.finished) {
          finish({ celebrate: false });
        } else {
          state.index = Math.min(state.index, QUESTIONS.length - 1);
          show('quiz');
          renderQuestion();
        }
      });

      el.discardBtn.addEventListener('click', function () {
        clearSaved();
        state = blankState();
        el.resumeNote.hidden = true;
        el.name.value = '';
        el.name.focus();
      });
    }

    el.startForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = el.name.value.trim();

      if (name.length < 2) {
        el.startError.textContent = 'Please type your name so your teacher knows whose answers these are.';
        el.startError.hidden = false;
        replay(el.startError, 'shake');
        el.name.focus();
        return;
      }

      el.startError.hidden = true;
      state = blankState();
      state.name = name;
      save();
      show('quiz');
      renderQuestion();
    });
  }

  /* ============================================================
     QUESTION SCREEN
     ============================================================ */

  function renderQuestion() {
    const q = QUESTIONS[state.index];
    const stored = state.answers[q.id];

    el.qError.hidden = true;
    el.qCurrent.textContent = state.index + 1;
    replay(el.qCurrent, 'tick');
    el.qText.textContent = q.text;

    if (q.prompt) {
      el.qPrompt.textContent = q.prompt;
      el.qReq.textContent = q.requirement || '';
      el.qReq.hidden = !q.requirement;
      el.directions.hidden = false;
    } else {
      el.directions.hidden = true;
    }

    updateTrail(state.index / QUESTIONS.length);

    el.backBtn.style.visibility = state.index === 0 ? 'hidden' : 'visible';
    el.nextBtn.textContent =
      state.index === QUESTIONS.length - 1 ? 'See my result ✦' : 'Next →';

    if (q.type === 'choice') {
      renderChoices(q, stored);
    } else {
      renderWritten(q, stored);
    }

    replay(el.qCard, 'is-entering');
  }

  function updateTrail(fraction) {
    const pct = Math.round(fraction * 100);
    el.progress.style.width = pct + '%';
    el.progress.parentElement.setAttribute('aria-valuenow', pct);
    el.walker.style.left = pct + '%';
    replay(el.walker, 'is-hopping');
  }

  function renderChoices(q, stored) {
    el.qKind.textContent = 'Multiple choice';
    el.written.hidden = true;
    el.choices.hidden = false;
    el.choices.innerHTML = '';

    // `slot` is where it sits on screen, `source` is its authoring index
    displayOrder(q).forEach(function (source, slot) {
      const option = q.options[source];

      const label = document.createElement('label');
      label.className = 'choice';
      label.style.setProperty('--i', slot); // drives the stagger-in delay

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'q' + q.id;
      input.value = String(source);
      input.checked = !!stored && stored.choice === source;
      input.addEventListener('change', function () {
        el.qError.hidden = true;
        state.answers[q.id] = { type: 'choice', choice: source, text: option };
        save();
        replay(label.querySelector('.choice__key'), 'is-picked');
      });

      const box = document.createElement('span');
      box.className = 'choice__box';

      const key = document.createElement('span');
      key.className = 'choice__key';
      key.dataset.num = String(slot + 1);

      const text = document.createElement('span');
      text.className = 'choice__text';
      text.textContent = option;

      box.appendChild(key);
      box.appendChild(text);
      label.appendChild(input);
      label.appendChild(box);
      el.choices.appendChild(label);
    });

    el.keyhint.hidden = false;
  }

  function renderWritten(q, stored) {
    el.qKind.textContent = 'Written response';
    el.choices.hidden = true;
    el.choices.innerHTML = '';
    el.written.hidden = false;

    el.textarea.value = stored ? stored.text : '';
    el.textarea.placeholder = q.placeholder || 'Type your answer here…';
    el.textarea.setAttribute('aria-label', q.text);
    el.keyhint.hidden = true;
    hidePasteNote(); // each question starts clean

    setTimeout(() => el.textarea.focus(), 60);
  }

  el.textarea.addEventListener('input', function () {
    const q = QUESTIONS[state.index];
    if (q.type !== 'written') return;
    state.answers[q.id] = { type: 'written', text: el.textarea.value };
    save();
  });

  /* ---------- navigation ---------- */

  // Written answers are never gated — the whole point is to see what a
  // student actually produces. Only the multiple choice needs a pick.
  function validateCurrent() {
    const q = QUESTIONS[state.index];
    if (q.type !== 'choice') return null;

    const answer = state.answers[q.id];
    if (!answer || typeof answer.choice !== 'number') {
      return 'Choose the answer that fits you best before moving on.';
    }
    return null;
  }

  el.qForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const problem = validateCurrent();

    if (problem) {
      el.qError.textContent = problem;
      el.qError.hidden = false;
      replay(el.qError, 'shake');
      replay(el.choices, 'nudge');
      return;
    }

    // last question: check before locking anything in
    if (state.index === QUESTIONS.length - 1) {
      openModal();
      return;
    }

    state.index += 1;
    save();
    renderQuestion();
  });

  el.backBtn.addEventListener('click', function () {
    if (state.index === 0) return;
    state.index -= 1;
    save();
    renderQuestion();
  });

  // 1–4 picks an option, Enter advances — but never while typing an essay.
  document.addEventListener('keydown', function (event) {
    if (!screens.quiz.classList.contains('is-active')) return;

    const typing = event.target.tagName === 'TEXTAREA' || event.target.tagName === 'INPUT';
    const q = QUESTIONS[state.index];

    if (!typing && q.type === 'choice' && /^[1-4]$/.test(event.key)) {
      const inputs = el.choices.querySelectorAll('input[type="radio"]');
      const target = inputs[Number(event.key) - 1];
      if (target) {
        target.checked = true;
        target.dispatchEvent(new Event('change'));
        target.focus();
      }
      event.preventDefault();
      return;
    }

    if (event.key === 'Enter' && !typing) {
      el.qForm.requestSubmit();
    }
  });

  /* ============================================================
     RESULTS
     ============================================================ */

  function scoreQuiz() {
    const scores = { rock: 0, pinecone: 0, woodland: 0, gem: 0 };

    QUESTIONS.forEach(function (q) {
      if (q.type !== 'choice') return;
      const answer = state.answers[q.id];
      if (!answer || typeof answer.choice !== 'number') return;
      scores[SCORE_ORDER[answer.choice]] += 1;
    });

    let best = SCORE_ORDER[0];
    SCORE_ORDER.forEach(function (key) {
      if (scores[key] > scores[best]) best = key;
    });

    // Ties are broken by the student's own self-description (Q15, then Q14),
    // which is a fairer nudge than picking whichever type sorts first.
    const tied = SCORE_ORDER.filter((key) => scores[key] === scores[best]);

    if (tied.length > 1) {
      const tiebreakers = [15, 14];
      for (let i = 0; i < tiebreakers.length; i++) {
        const answer = state.answers[tiebreakers[i]];
        if (answer && typeof answer.choice === 'number') {
          const pick = SCORE_ORDER[answer.choice];
          if (tied.indexOf(pick) !== -1) { best = pick; break; }
        }
      }
    }

    return { scores: scores, winner: best };
  }

  function finish(options) {
    const result = scoreQuiz();
    const type = TYPES[result.winner];

    el.resultEmoji.textContent = type.emoji;
    el.resultFor.textContent = state.name;
    el.resultHeading.textContent = type.heading;
    el.resultDesc.textContent = type.description;

    renderTally(result);
    renderPrintSheet(result);
    renderAnswerList();

    // the backup plan starts closed every time
    el.fallback.hidden = true;
    el.helpnote.classList.remove('is-urgent');
    el.troubleBtn.disabled = false;
    el.troubleBtn.textContent = 'PDF not working?';
    show('results');

    if (options && options.celebrate) {
      setTimeout(() => burstConfetti(type.emoji), 260);
    }
  }

  function renderTally(result) {
    el.tally.innerHTML = '';

    const total = SCORE_ORDER.reduce((sum, key) => sum + result.scores[key], 0) || 1;

    SCORE_ORDER.forEach(function (key, order) {
      const type = TYPES[key];
      const count = result.scores[key];

      const row = document.createElement('div');
      row.className = 'tally__row' + (key === result.winner ? ' is-winner' : '');
      row.style.setProperty('--i', order);

      const name = document.createElement('span');
      name.className = 'tally__name';
      name.textContent = type.emoji + ' ' + type.name;

      const track = document.createElement('span');
      track.className = 'tally__track';
      const bar = document.createElement('span');
      bar.className = 'tally__bar';
      bar.style.transitionDelay = 220 + order * 110 + 'ms';
      track.appendChild(bar);

      const num = document.createElement('span');
      num.className = 'tally__num';
      num.textContent = count;

      row.appendChild(name);
      row.appendChild(track);
      row.appendChild(num);
      el.tally.appendChild(row);

      // let the row paint at zero width before growing the bar
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          bar.style.width = Math.round((count / total) * 100) + '%';
        });
      });
    });
  }

  /* Builds the printout. Students never see this on screen — it exists so the
     PDF carries every answer even though the results page doesn't show them. */
  function renderPrintSheet(result) {
    const type = TYPES[result.winner];

    el.printName.textContent = state.name;
    el.printDate.textContent = new Date().toLocaleString();
    el.printResult.textContent = type.name + ' ' + type.emoji;
    el.printTally.textContent = SCORE_ORDER
      .map((key) => TYPES[key].name + ' ' + result.scores[key])
      .join('  ·  ');

    el.printList.innerHTML = '';

    QUESTIONS.forEach(function (q) {
      const answer = state.answers[q.id];
      const item = document.createElement('li');
      item.className = 'sheet__item' + (q.type === 'written' ? ' sheet__item--long' : '');

      const question = document.createElement('p');
      question.className = 'sheet__q';
      question.textContent = q.text;
      item.appendChild(question);

      if (q.requirement) {
        const req = document.createElement('p');
        req.className = 'sheet__req';
        req.textContent = q.requirement;
        item.appendChild(req);
      }

      const response = document.createElement('p');
      response.className = 'sheet__a';

      if (!answer || !String(answer.text).trim()) {
        response.className += ' sheet__a--empty';
        response.textContent = '(left blank)';
      } else {
        response.textContent = answer.text;
      }

      item.appendChild(response);
      el.printList.appendChild(item);
    });
  }

  function answerTextFor(q) {
    const answer = state.answers[q.id];
    const text = answer ? String(answer.text) : '';
    return text.trim() ? text : null;
  }

  /* The same answers, on screen, behind the "PDF not working?" button. */
  function renderAnswerList() {
    el.answers.innerHTML = '';

    QUESTIONS.forEach(function (q) {
      const text = answerTextFor(q);
      const item = document.createElement('li');

      const question = document.createElement('p');
      question.className = 'answers__q';
      question.textContent = q.text;

      const response = document.createElement('p');
      response.className = 'answers__a' + (text ? '' : ' answers__a--empty');
      response.textContent = text || '(left blank)';

      item.appendChild(question);
      item.appendChild(response);
      el.answers.appendChild(item);
    });
  }

  /* ---------- confetti ---------- */

  function burstConfetti(badge) {
    if (CALM || !motionOn) return;

    const pieces = ['🍃', '🌿', '🍂', '✨', '🌲', badge];
    const count = 28;

    for (let i = 0; i < count; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti__bit';
      piece.textContent = pieces[i % pieces.length];
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.fontSize = 14 + Math.random() * 18 + 'px';
      piece.style.animationDuration = 2.4 + Math.random() * 2 + 's';
      piece.style.animationDelay = Math.random() * 0.8 + 's';
      piece.style.setProperty('--drift', (Math.random() * 200 - 100).toFixed(0) + 'px');
      piece.style.setProperty('--spin', (Math.random() * 900 - 450).toFixed(0) + 'deg');
      el.confetti.appendChild(piece);
      piece.addEventListener('animationend', () => piece.remove());
    }
  }

  /* ---------- export ---------- */

  // personality_quiz_2026-08-05_avery-chen.pdf — sorts by date and says whose
  // it is, so a folder of these is easy to work through.
  function quizFileName(extension) {
    const now = new Date();
    const stamp = now.getFullYear() + '-' +
      String(now.getMonth() + 1).padStart(2, '0') + '-' +
      String(now.getDate()).padStart(2, '0');

    const who = (state.name || 'student')
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase() || 'student';

    return 'personality_quiz_' + stamp + '_' + who + '.' + extension;
  }

  /* ============================================================
     PNG FALLBACK

     This is drawn from the stored answers onto a canvas — it is not a
     screenshot of the results page. That's deliberate: a picture of
     "You are a Gem!" proves nothing, so the image is a full answer sheet
     with every question and everything the student wrote, however tall
     that ends up being.
     ============================================================ */

  const SHEET = {
    width: 820,
    margin: 46,
    bg: '#fffdf7',
    ink: '#22201b',
    quiet: '#6a6152',
    accent: '#1d4a35',
    rule: '#d8cfb6'
  };

  function wrapLines(ctx, text, maxWidth) {
    const out = [];

    String(text).split('\n').forEach(function (paragraph) {
      const words = paragraph.split(/\s+/).filter(Boolean);
      if (!words.length) { out.push(''); return; }

      let line = words[0];
      for (let i = 1; i < words.length; i++) {
        const attempt = line + ' ' + words[i];
        if (ctx.measureText(attempt).width > maxWidth) {
          out.push(line);
          line = words[i];
        } else {
          line = attempt;
        }
      }
      out.push(line);
    });

    return out;
  }

  /* Runs twice: once to measure (draw = false) and once to paint. Returns the
     height the sheet needs. */
  function paintSheet(ctx, result, draw) {
    const M = SHEET.margin;
    const colWidth = SHEET.width - M * 2;
    const type = TYPES[result.winner];
    let y = M;

    function line(text, font, color, lineHeight, indent) {
      ctx.font = font;
      const x = M + (indent || 0);
      wrapLines(ctx, text, colWidth - (indent || 0)).forEach(function (row) {
        y += lineHeight;
        if (draw) {
          ctx.fillStyle = color;
          ctx.fillText(row, x, y);
        }
      });
    }

    function rule(gapBefore, gapAfter) {
      y += gapBefore;
      if (draw) {
        ctx.fillStyle = SHEET.rule;
        ctx.fillRect(M, y, colWidth, 1);
      }
      y += gapAfter;
    }

    line('Find Your Forest Vibe', 'bold 30px Georgia, serif', SHEET.accent, 34);
    y += 8;
    line('Name: ' + state.name, 'bold 16px Georgia, serif', SHEET.ink, 22);
    line('Completed: ' + new Date().toLocaleString(), '15px Georgia, serif', SHEET.quiet, 21);
    line('Result: ' + type.name + ' ' + type.emoji, '15px Georgia, serif', SHEET.quiet, 21);
    line(
      'Points: ' + SCORE_ORDER.map((k) => TYPES[k].name + ' ' + result.scores[k]).join('  ·  '),
      '15px Georgia, serif', SHEET.quiet, 21
    );
    rule(16, 10);

    QUESTIONS.forEach(function (q, i) {
      const text = answerTextFor(q);
      y += 16;
      line(i + 1 + '. ' + q.text, 'bold 17px Georgia, serif', SHEET.ink, 23);
      if (q.requirement) line(q.requirement, 'italic 13px Georgia, serif', SHEET.quiet, 18);

      const answerTop = y;
      line(text || '(left blank)', (text ? '' : 'italic ') + '16px Georgia, serif',
           text ? SHEET.ink : '#9b9384', 24, 16);

      if (draw) { // the little bar down the left of each answer
        ctx.fillStyle = text ? '#c9c0a5' : '#e6ddc7';
        ctx.fillRect(M + 2, answerTop + 6, 3, y - answerTop);
      }
    });

    rule(26, 6);
    line('Saved as an image because the PDF could not be created.',
         'italic 13px Georgia, serif', SHEET.quiet, 19);

    return y + M;
  }

  function savePng() {
    const result = scoreQuiz();
    const scale = 2; // so the text stays sharp when zoomed
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) { reportTrouble('canvas unavailable'); return; }

    // measure first — the sheet is as tall as the writing demands
    canvas.width = SHEET.width * scale;
    ctx.scale(scale, scale);
    ctx.textBaseline = 'alphabetic';
    const height = paintSheet(ctx, result, false);

    canvas.height = Math.ceil(height) * scale;
    ctx.scale(scale, scale); // resizing the canvas resets the context
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = SHEET.bg;
    ctx.fillRect(0, 0, SHEET.width, height);
    paintSheet(ctx, result, true);

    const filename = quizFileName('png');

    function deliver(url, revoke) {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (revoke) setTimeout(() => URL.revokeObjectURL(url), 1500);
      flash(el.pngBtn, 'Image saved ✓');
    }

    try {
      if (canvas.toBlob) {
        canvas.toBlob(function (blob) {
          if (!blob) { reportTrouble('empty image'); return; }
          deliver(URL.createObjectURL(blob), true);
        }, 'image/png');
      } else {
        deliver(canvas.toDataURL('image/png'), false);
      }
    } catch (err) {
      reportTrouble(String(err));
    }
  }

  function flash(button, message) {
    const original = button.textContent;
    button.textContent = message;
    button.disabled = true;
    setTimeout(function () {
      button.textContent = original;
      button.disabled = false;
    }, 1800);
  }

  // An export actually failed: open the backup panel and make the warning loud.
  function reportTrouble(detail) {
    if (el.fallback.hidden) openFallback();
    el.helpnote.classList.add('is-urgent');
    if (detail) el.helpnote.setAttribute('data-detail', detail);
    el.helpnote.scrollIntoView({ behavior: CALM ? 'auto' : 'smooth', block: 'center' });
  }

  /* PDF export goes through the browser's own print dialog ("Save as PDF" /
     "Microsoft Print to PDF"). It needs no library and no internet, which
     matters on a locked-down school machine. The page title becomes the
     suggested filename, so it's set just for the duration of the dialog. */
  /* Builds the PDF in the page and hands it to the browser as a download, so
     there's no print dialog and nothing to name — it lands in Downloads as
     personality_quiz_2026-08-05_avery-chen.pdf and is ready to upload. */
  function savePdf() {
    if (typeof ForestPdf === 'undefined') {
      reportTrouble('pdf builder missing');
      return;
    }

    try {
      const result = scoreQuiz();
      const type = TYPES[result.winner];

      const bytes = ForestPdf.build({
        title: 'Find Your Forest Vibe - Personality Quiz',
        meta: [
          'Name: ' + state.name,
          'Completed: ' + new Date().toLocaleString(),
          'Result: ' + type.name,
          'Points: ' + SCORE_ORDER.map((k) => TYPES[k].name + ' ' + result.scores[k]).join('   ')
        ],
        items: QUESTIONS.map(function (q) {
          return {
            question: q.text,
            requirement: q.requirement || '',
            answer: answerTextFor(q) || '(left blank)'
          };
        })
      });

      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = quizFileName('pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 2000);

      flash(el.pdfBtn, '✓ PDF saved to your Downloads');
    } catch (err) {
      reportTrouble(String(err));
    }
  }

  el.pdfBtn.addEventListener('click', savePdf);

  // the old route, kept in the backup panel for anyone whose downloads are blocked
  el.printBtn.addEventListener('click', function () {
    const originalTitle = document.title;
    document.title = quizFileName('').replace(/\.$/, '');
    try {
      window.print();
    } catch (err) {
      reportTrouble(String(err));
    }
    setTimeout(function () { document.title = originalTitle; }, 800);
  });

  el.pngBtn.addEventListener('click', savePng);

  el.troubleBtn.addEventListener('click', function () {
    openFallback();
  });

  function openFallback() {
    el.fallback.hidden = false;
    el.troubleBtn.textContent = 'Backup options are open below ↓';
    el.troubleBtn.disabled = true;
    el.fallback.scrollIntoView({ behavior: CALM ? 'auto' : 'smooth', block: 'start' });
  }

  el.restartBtn.addEventListener('click', function () {
    const warning =
      'This erases everything you wrote and starts the quiz over from question 1.\n\n' +
      'Make sure you have already saved your PDF.\n\nErase and start over?';
    if (!confirm(warning)) return;
    clearSaved();
    state = blankState();
    el.startForm.reset();
    el.resumeNote.hidden = true;
    updateTrail(0);
    show('start');
    el.name.focus();
  });

  /* ---------- clipboard lock ----------
     Copy, cut, paste and text-dragging are all switched off so the writing
     samples are actually the student's own. Blocking the `paste` event covers
     every route into the box — Ctrl+V, the right-click menu, and middle-click
     — while `dragstart`/`drop` stop text being dragged in or out. Selection
     itself is disabled in the stylesheet, apart from the boxes they type in.

     Worth knowing: this stops casual copying, not a determined student with
     devtools. It's a classroom speed bump, not a lock. */

  // The warning stays out of sight until someone actually tries to paste —
  // no reason to accuse a class that hasn't done anything.
  function flagPasteBlocked() {
    const note = $('nopaste');
    if (!note) return;

    note.hidden = false;
    note.classList.remove('is-flagged');
    void note.offsetWidth;
    note.classList.add('is-flagged');

    clearTimeout(flagPasteBlocked.timer);
    flagPasteBlocked.timer = setTimeout(function () {
      note.classList.remove('is-flagged');
      note.hidden = true;
    }, 6000);
  }

  function hidePasteNote() {
    const note = $('nopaste');
    if (!note) return;
    clearTimeout(flagPasteBlocked.timer);
    note.classList.remove('is-flagged');
    note.hidden = true;
  }

  function initClipboardLock() {
    ['copy', 'cut', 'paste', 'dragstart', 'drop'].forEach(function (type) {
      document.addEventListener(type, function (event) {
        event.preventDefault();
        if (type === 'paste' || type === 'drop') flagPasteBlocked();
      });
    });
  }

  /* ---------- "is this your final submission?" ---------- */

  let modalReturnFocus = null;

  function openModal() {
    modalReturnFocus = document.activeElement;
    el.confirmModal.hidden = false;
    document.body.classList.add('modal-open');
    setTimeout(() => el.confirmYes.focus(), 60);
  }

  function closeModal() {
    el.confirmModal.hidden = true;
    document.body.classList.remove('modal-open');
    if (modalReturnFocus && modalReturnFocus.focus) modalReturnFocus.focus();
  }

  function initModal() {
    el.confirmModal.querySelectorAll('[data-close]').forEach(function (node) {
      node.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !el.confirmModal.hidden) closeModal();
    });

    el.confirmYes.addEventListener('click', function () {
      closeModal();
      state.finished = true;
      save();
      updateTrail(1);
      finish({ celebrate: true });
    });
  }

  function initTeacher() {
    if (typeof TEACHER === 'undefined') return;
    if (TEACHER.name) el.teacherName.textContent = TEACHER.name;
    if (TEACHER.contact) el.teacherContact.textContent = ' ' + TEACHER.contact;
  }

  /* ---------- go ---------- */
  initMotion();
  initClipboardLock();
  initModal();
  initTeacher();
  initStart();
})();
