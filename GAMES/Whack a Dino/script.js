const DINOS_COUNT = 16;

const getRandomDino = () => `./dino/${Math.floor(Math.random() * DINOS_COUNT) + 1}.png`;

const dinoImages = [...document.querySelectorAll("#board button")];
const scoreElement = document.getElementById("score");
const timeLeftElement = document.getElementById("time-left");
const startButton = document.getElementById('start-game');
let score = 0;
let timeLeft = 30;
let currentDino;


function dinoClick(btn) {
    if (btn !== currentDino || btn.innerHTML === '') return;
    score++;
    scoreElement.textContent = score;
    btn.innerHTML = '';
}

function randomDinoPosition() {
    const randomButton = dinoImages[Math.floor(Math.random() * dinoImages.length)];
    randomButton.innerHTML = `<img src="${getRandomDino()}" alt="Dino">`;
    currentDino = randomButton;

    setTimeout(() => {
        randomButton.innerHTML = '';
    }, 1000);
}

function startGame() {
    startButton.style.display = "none";
    score = 0;
    timeLeft = 30;
    currentDino = null;
    timeLeftElement.textContent = timeLeft;
    scoreElement.textContent = score;
    const gameInterval = setInterval(() => {
        if (timeLeft > 0) {
            randomDinoPosition();
            timeLeft--;
            timeLeftElement.textContent = timeLeft;
        } else {
            clearInterval(gameInterval);
            startButton.style.display = "block";
            startButton.textContent = ">> Play Again! <<";
            alert(`Game over! Your score is ${score}`);
        }
    }, 1000);
}