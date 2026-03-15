let animals = [
  { translations: { it: "cane", en: "dog" }, image: "dog.png" },
  { translations: { it: "gatto", en: "cat" }, image: "cat.png" },
  { translations: { it: "coniglio", en: "rabbit" }, image: "rabbit.png" },
  { translations: { it: "cavallo", en: "horse" }, image: "horse.png" },
  { translations: { it: "maiale", en: "pig" }, image: "pig.png" },
  { translations: { it: "mucca", en: "cow" }, image: "cow.png" },
  { translations: { it: "pecora", en: "sheep" }, image: "sheep.png" },
  { translations: { it: "papera", en: "duck" }, image: "duck.png" },
  { translations: { it: "capra", en: "goat" }, image: "goat.png" },
  { translations: { it: "gallina", en: "chicken" }, image: "chicken.png" },
  { translations: { it: "rana", en: "frog" }, image: "frog.png" },
  { translations: { it: "topo", en: "mouse" }, image: "mouse.png" },
  { translations: { it: "tigre", en: "tiger" }, image: "tiger.png" },
  { translations: { it: "cervo", en: "deer" }, image: "deer.png" },
  {
    translations: { it: "coccodrillo", en: "crocodile" },
    image: "crocodile.png",
  },
  { translations: { it: "cigno", en: "swan" }, image: "swan.png" },
  { translations: { it: "formica", en: "ant" }, image: "ant.png" },
  { translations: { it: "grillo", en: "cricket" }, image: "cricket.png" },
  { translations: { it: "coccinella", en: "ladybug" }, image: "ladybug.png" },
  { translations: { it: "farfalla", en: "butterfly" }, image: "butterfly.png" },
  { translations: { it: "uccello", en: "bird" }, image: "bird.png" },
  { translations: { it: "leone", en: "lion" }, image: "lion.png" },
  { translations: { it: "giraffa", en: "giraffe" }, image: "giraffe.png" },
  { translations: { it: "granchio", en: "crab" }, image: "crab.png" },
];
let started = false;
let level = 0;
let mode = "it";
let interfaceLanguage = "en";
let gameAnimals = [];
let currentChoices = [];
let correctAnswer;
let buttons = document.querySelectorAll(".choice");
let clickedAnimal;
const promptWord = document.querySelector("#prompt-word");
const startButton = document.querySelector("#start-button");
const resultText = document.querySelector("#result-text");
const siteTitle = document.querySelector(".site-title");
const hintText = document.querySelector("#hint-text");
const levelLabel = document.querySelector(".pill-label");
const languageToggle = document.querySelector("#language-toggle");
let levelValue = document.querySelector("#level-value");

function t(en, it) {
  if (interfaceLanguage === "en") {
    return en;
  } else {
    return it;
  }
}
function updateInterface() {
  hintText.innerText = t("Click the right animal", "Clicca l'animale giusto");
  siteTitle.innerText = t("ANIMALS", "ANIMALI");
  levelLabel.innerText = t("Level", "Livello");
  if (!started) {
    promptWord.innerText = t("PRESS START", "PREMI START");
  }
}

languageToggle.addEventListener("click", function () {
  if (mode === "it") {
    mode = "en";
    interfaceLanguage = "it";
  } else {
    mode = "it";
    interfaceLanguage = "en";
  }
  languageToggle.classList.toggle("en");
  updateInterface();
  if (started) {
    startOver();
  }
});

startButton.addEventListener("click", function () {
  if (!started) {
    started = true;
    level = 0;
    startButton.style.display = "none";
    gameAnimals = [...animals];
    shuffle(gameAnimals);
    nextRound();
  }
});

function nextRound() {
  currentChoices = [];
  correctAnswer = gameAnimals[level];
  promptWord.innerText = correctAnswer.translations[mode];
  currentChoices.push(correctAnswer);
  wrongAnimals(correctAnswer);
  shuffle(currentChoices);
  displayChoices();
  levelValue.innerText = level + 1;
}
function displayChoices() {
  let images = document.querySelectorAll(".choice img");
  for (let i = 0; i < currentChoices.length; i++) {
    images[i].setAttribute("src", "images/" + currentChoices[i].image);
    buttons[i].dataset.animal = currentChoices[i].image;
  }
}
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function wrongAnimals(object) {
  let firstWrongAnimalIndex = Math.floor(Math.random() * animals.length);
  let secondWrongAnimalIndex = Math.floor(Math.random() * animals.length);

  while (
    animals[firstWrongAnimalIndex] === animals[secondWrongAnimalIndex] ||
    animals[firstWrongAnimalIndex] === object ||
    animals[secondWrongAnimalIndex] === object
  ) {
    while (object === animals[firstWrongAnimalIndex]) {
      let randomNumber1 = Math.floor(Math.random() * animals.length);
      firstWrongAnimalIndex = randomNumber1;
    }
    while (object === animals[secondWrongAnimalIndex]) {
      let randomNumber2 = Math.floor(Math.random() * animals.length);
      secondWrongAnimalIndex = randomNumber2;
    }

    while (
      firstWrongAnimalIndex === secondWrongAnimalIndex ||
      animals[firstWrongAnimalIndex] === object
    ) {
      let randomNumber = Math.floor(Math.random() * animals.length);
      firstWrongAnimalIndex = randomNumber;
    }
  }
  currentChoices.push(
    animals[firstWrongAnimalIndex],
    animals[secondWrongAnimalIndex],
  );
}

function startOver() {
  resultText.innerText = "";
  started = false;
  level = 0;
  levelValue.innerText = 0;
  startButton.style.display = "block";
  currentChoices = [];
  gameAnimals = [];
  updateInterface();
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    if (started) {
      let clickedButton = this;
      clickedAnimal = this.dataset.animal;
      if (clickedAnimal === correctAnswer.image) {
        resultText.innerText = t("Correct!", "Esatto!");
        clickedButton.classList.add("correct");
        setTimeout(function () {
          clickedButton.classList.remove("correct");
        }, 800);
        if (level === gameAnimals.length - 1) {
          promptWord.innerText = t("Well done, you won!", "Bravo, hai vinto!");
          confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
          confetti({ particleCount: 120, spread: 70, origin: { x: 0.2 } });
          confetti({ particleCount: 120, spread: 70, origin: { x: 0.8 } });
          resultText.innerText = "";
          setTimeout(function () {
            startOver();
          }, 3000);
          return;
        }
        level++;
        setTimeout(function () {
          resultText.innerText = "";
          nextRound();
        }, 800);
      } else {
        resultText.innerText = t(
          "OOPPPSS, wrong answer!",
          "OOPPPSS, sbagliato!",
        );
        clickedButton.classList.add("wrong");
        document.querySelector(".app").classList.add("game-over");
        setTimeout(function () {
          clickedButton.classList.remove("wrong");
          document.querySelector(".app").classList.remove("game-over");
        }, 800);
        setTimeout(function () {
          startOver();
        }, 1000);
      }
    }
  });
}
