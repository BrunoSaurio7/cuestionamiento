const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const buttonStage = document.getElementById("buttonStage");
const hintText = document.getElementById("hintText");
const questionText = document.getElementById("questionText");
const resultModal = document.getElementById("resultModal");
const closeModal = document.getElementById("closeModal");
const enterOverlay = document.getElementById("enterOverlay");
const enterButton = document.getElementById("enterButton");
const bgMusic = document.getElementById("bgMusic");

let musicStarted = false;
let attempts = 0;

const noTexts = [
  "No",
  "jiji no",
  "fallaste",
  "ni cerca",
  "me escapé",
  "no insistas",
  "botón rebelde",
  "me fui",
  "bye"
];

const hints = [
  "el botón de “No” solo funciona bajo sus propios términos",
  "uy, casi lo atrapas",
  "se movió con elegancia sospechosa",
  "cada intento fortalece al Sí",
  "el No está haciendo parkour emocional",
  "el No acaba de pedir vacaciones",
  "esto ya parece trámite perdido",
  "dictamen final: solo queda el Sí"
];

const playfulActions = [
  "jump",
  "spin",
  "shake",
  "sassy",
  "zoom"
];

function startMusic() {
  if (!bgMusic || musicStarted) return;

  bgMusic.volume = 0.72;

  bgMusic.play()
    .then(() => {
      musicStarted = true;
    })
    .catch((error) => {
      console.log("No se pudo reproducir la música:", error);
    });
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function rectsOverlap(rectA, rectB, buffer = 18) {
  return !(
    rectA.right + buffer < rectB.left ||
    rectA.left - buffer > rectB.right ||
    rectA.bottom + buffer < rectB.top ||
    rectA.top - buffer > rectB.bottom
  );
}

function getLocalRect(element, parentRect) {
  const rect = element.getBoundingClientRect();

  return {
    left: rect.left - parentRect.left,
    top: rect.top - parentRect.top,
    right: rect.right - parentRect.left,
    bottom: rect.bottom - parentRect.top,
    width: rect.width,
    height: rect.height
  };
}

function getSafeNoPosition() {
  const stageRect = buttonStage.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();
  const yesRect = getLocalRect(yesBtn, stageRect);

  const padding = 14;
  const maxX = Math.max(padding, stageRect.width - noRect.width - padding);
  const maxY = Math.max(padding, stageRect.height - noRect.height - padding);

  let fallback = {
    x: padding,
    y: stageRect.height - noRect.height - padding
  };

  for (let i = 0; i < 80; i++) {
    const x = randomBetween(padding, maxX);
    const y = randomBetween(padding, maxY);

    const candidateRect = {
      left: x,
      top: y,
      right: x + noRect.width,
      bottom: y + noRect.height
    };

    if (!rectsOverlap(candidateRect, yesRect, 28)) {
      return { x, y };
    }
  }

  return fallback;
}

function playNoAnimation() {
  playfulActions.forEach(action => noBtn.classList.remove(action));

  const action = playfulActions[Math.floor(Math.random() * playfulActions.length)];

  void noBtn.offsetWidth;

  noBtn.classList.add(action);

  setTimeout(() => {
    noBtn.classList.remove(action);
  }, 520);
}

function moveNoButton() {
  attempts++;

  noBtn.classList.add("is-running");

  const { x, y } = getSafeNoPosition();

  noBtn.style.right = "auto";
  noBtn.style.bottom = "auto";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = `rotate(${randomBetween(-12, 12)}deg)`;

  playNoAnimation();

  const textIndex = Math.min(attempts, noTexts.length - 1);
  const hintIndex = Math.min(attempts, hints.length - 1);

  noBtn.textContent = noTexts[textIndex];
  hintText.textContent = hints[hintIndex];

  const yesScale = Math.min(1 + attempts * 0.10, 1.7);
  yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;

  if (attempts >= 4) {
    questionText.textContent = "Zur, el universo está inclinándose hacia el sí 😌";
  }

  if (attempts >= 8) {
    noBtn.style.opacity = "0";
    noBtn.style.pointerEvents = "none";
    hintText.textContent = "el No se fue. solo queda hacer lo correcto 🙂‍↔️";
    yesBtn.style.transform = "translate(-50%, -50%) scale(1.85)";
  }
}

function showYesResult() {
  resultModal.classList.add("show");
  resultModal.setAttribute("aria-hidden", "false");
  createConfettiBurst();
}

function createConfettiBurst() {
  for (let i = 0; i < 42; i++) {
    const piece = document.createElement("span");

    piece.className = "burst";
    piece.textContent = ["💖", "✨", "😭", "💕", "💌"][Math.floor(Math.random() * 5)];
    piece.style.left = "50%";
    piece.style.top = "50%";
    piece.style.setProperty("--x", `${randomBetween(-46, 46)}vw`);
    piece.style.setProperty("--y", `${randomBetween(-42, 42)}vh`);

    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 950);
  }
}

noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

noBtn.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    moveNoButton();
  }
});

yesBtn.addEventListener("click", showYesResult);

closeModal.addEventListener("click", () => {
  resultModal.classList.remove("show");
  resultModal.setAttribute("aria-hidden", "true");
});

enterButton.addEventListener("click", () => {
  document.body.classList.remove("locked");
  enterOverlay.classList.add("hide");
  startMusic();
});

window.addEventListener("load", () => {
  document.body.classList.add("locked");
});
