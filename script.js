const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const buttonStage = document.getElementById("buttonStage");
const hintText = document.getElementById("hintText");
const questionText = document.getElementById("questionText");
const resultModal = document.getElementById("resultModal");
const closeModal = document.getElementById("closeModal");
const floatingHearts = document.getElementById("floatingHearts");
const enterOverlay = document.getElementById("enterOverlay");
const enterButton = document.getElementById("enterButton");
const musicButton = document.getElementById("musicButton");
const bgMusic = document.getElementById("bgMusic");

// La canción debe estar exactamente en:
// assets/bby_romeo.mp3
let musicStarted = false;

const noTexts = [
  "No",
  "¿segura?",
  "piénsalo bien",
  "no sirve 😭",
  "botón en huelga",
  "error 404",
  "casi le picas",
  "mejor el sí",
  "ya ni modo"
];

const hints = [
  "el botón de “No” está en periodo de reflexión",
  "uy, se asustó",
  "creo que no quiere cooperar",
  "está corriendo por su vida",
  "cada intento hace más poderoso al Sí",
  "el No acaba de renunciar",
  "última oportunidad para aceptar lo obvio",
  "dictamen final: solo queda el Sí"
];

let attempts = 0;

function startMusic() {
  if (!bgMusic || musicStarted) return;

  bgMusic.volume = 0.72;

  bgMusic.play()
    .then(() => {
      musicStarted = true;
      musicButton.textContent = "⏸ pausar";
    })
    .catch((error) => {
      console.log("No se pudo reproducir la música:", error);
      musicButton.textContent = "▶ reproducir";
    });
}

function toggleMusic() {
  if (!bgMusic) return;

  if (bgMusic.paused) {
    startMusic();
  } else {
    bgMusic.pause();
    musicButton.textContent = "▶ reproducir";
    musicStarted = false;
  }
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function moveNoButton() {
  attempts++;

  noBtn.classList.add("is-running", "panic");

  const stageRect = buttonStage.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const padding = 12;
  const maxX = Math.max(padding, stageRect.width - btnRect.width - padding);
  const maxY = Math.max(padding, stageRect.height - btnRect.height - padding);

  const x = randomBetween(padding, maxX);
  const y = randomBetween(padding, maxY);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = `rotate(${randomBetween(-14, 14)}deg)`;

  const textIndex = Math.min(attempts, noTexts.length - 1);
  const hintIndex = Math.min(attempts, hints.length - 1);

  noBtn.textContent = noTexts[textIndex];
  hintText.textContent = hints[hintIndex];

  const yesScale = Math.min(1 + attempts * 0.11, 1.85);
  yesBtn.style.transform = `scale(${yesScale})`;

  if (attempts >= 4) {
    questionText.textContent = "Zur, el universo está inclinándose hacia el sí 😌";
  }

  if (attempts >= 7) {
    noBtn.style.opacity = "0";
    noBtn.style.pointerEvents = "none";
    hintText.textContent = "el No se fue. solo queda hacer lo correcto 🙂‍↔️";
    yesBtn.style.transform = "scale(1.9)";
  }
}

function showYesResult() {
  resultModal.classList.add("show");
  resultModal.setAttribute("aria-hidden", "false");
  createConfettiBurst();
}

function createFloatingHeart() {
  const heart = document.createElement("span");

  heart.className = "heart";
  heart.textContent = ["💖", "💘", "💕", "💗", "✨"][Math.floor(Math.random() * 5)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDuration = `${randomBetween(5, 9)}s`;
  heart.style.fontSize = `${randomBetween(16, 30)}px`;

  floatingHearts.appendChild(heart);

  setTimeout(() => heart.remove(), 9500);
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

noBtn.addEventListener("pointerenter", moveNoButton);

noBtn.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  moveNoButton();
});

noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

buttonStage.addEventListener("touchstart", (event) => {
  if (event.target === noBtn) {
    event.preventDefault();
    moveNoButton();
  }
}, { passive: false });

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

musicButton.addEventListener("click", toggleMusic);

window.addEventListener("load", () => {
  document.body.classList.add("locked");
});

setInterval(createFloatingHeart, 950);
