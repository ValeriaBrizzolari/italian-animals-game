let animals = [
  { name: "cane", image: "cane.png" },
  { name: "gatto", image: "gatto.png" },
  { name: "coniglio", image: "coniglio.png" },
  { name: "cavallo", image: "cavallo.png" },
  { name: "maiale", image: "maiale.png" },
  { name: "mucca", image: "mucca.png" },
  { name: "pecora", image: "pecora.png" },
  { name: "papera", image: "papera.png" },
];
let started = false;
let level = 0;
let currentChoices = [];
let currentRightAnimal;
let buttons = document.querySelectorAll(".choice");
let clickedAnimal;
const title = document.querySelector("#prompt-word");
const startButton = document.querySelector("#start-button");
const resultText = document.querySelector("#result-text");
startButton.addEventListener("click", function () {
  if (!started) {
    started = true;
    level = 0;
    startButton.style.display = "none";
    nextRound();
  }
});

function nextRound() {
  currentChoices = [];
  currentRightAnimal = animals[level].name;
  title.innerText = currentRightAnimal;
  currentChoices.push(currentRightAnimal);
  wrongAnimals(currentRightAnimal);
  shuffle(currentChoices);
  displayedImages();
  document.querySelector("#level-value").innerText = level + 1;
}
function displayedImages() {
  let images = document.querySelectorAll(".choice img");
  for (let i = 0; i < currentChoices.length; i++) {
    images[i].setAttribute("src", "images/" + currentChoices[i] + ".png");
    buttons[i].dataset.animal = currentChoices[i];
  }
}
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function wrongAnimals(name) {
  let firstWrongAnimalIndex = Math.floor(Math.random() * animals.length);
  let secondWrongAnimalIndex = Math.floor(Math.random() * animals.length);

  while (
    animals[firstWrongAnimalIndex].name ===
      animals[secondWrongAnimalIndex].name ||
    animals[firstWrongAnimalIndex].name === name ||
    animals[secondWrongAnimalIndex].name === name
  ) {
    while (name === animals[firstWrongAnimalIndex].name) {
      let randomNumber1 = Math.floor(Math.random() * animals.length);
      firstWrongAnimalIndex = randomNumber1;
    }
    while (name === animals[secondWrongAnimalIndex].name) {
      let randomNumber2 = Math.floor(Math.random() * animals.length);
      secondWrongAnimalIndex = randomNumber2;
    }

    while (
      firstWrongAnimalIndex === secondWrongAnimalIndex ||
      animals[firstWrongAnimalIndex].name === name
    ) {
      let randomNumber = Math.floor(Math.random() * animals.length);
      firstWrongAnimalIndex = randomNumber;
    }
  }
  currentChoices.push(
    animals[firstWrongAnimalIndex].name,
    animals[secondWrongAnimalIndex].name,
  );
}

function startOver() {
  resultText.innerText = "";
  title.innerText = "Premi START per iniziare ";
  started = false;
  level = 0;
  document.querySelector("#level-value").innerText = level;
  startButton.style.display = "block";
  currentChoices = [];
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    if (started) {
      let clickedButton = this;
      clickedAnimal = this.dataset.animal;
      if (clickedAnimal === currentRightAnimal) {
        resultText.innerText = "Esatto!";
        clickedButton.classList.add("correct");
        setTimeout(function () {
          clickedButton.classList.remove("correct");
        }, 800);
        if (level === animals.length - 1) {
          title.innerText = "Bravo, hai vinto!";
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
        resultText.innerText = "OOPPPSS, sbagliato!";
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
