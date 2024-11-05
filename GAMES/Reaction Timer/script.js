const box = document.getElementById('box');
const gameArea = document.getElementById('game-area');
const reactionTimeDisplay = document.getElementById('reaction-time');
const message = document.getElementById('message');
const startButton = document.getElementById('start-game');

let startTime;

function startGame() {
    message.textContent = 'Get ready...';
    box.style.display = 'none';
    reactionTimeDisplay.textContent = '';
    setTimeout(showBox, Math.random() * 2000 + 1000);
    startButton.style.display = 'none';
}

function showBox() {
    const randomPosition = {
        x: Math.random() * (gameArea.offsetWidth - 50),
        y: Math.random() * (gameArea.offsetHeight - 50)
    };

    Object.assign(box.style, {
        left: `${randomPosition.x}px`,
        top: `${randomPosition.y}px`,
        display: 'block'
    });
    startTime = new Date();
}

function boxClicked() {
    const reactionTime = ((new Date()) - startTime) / 1000;
    reactionTimeDisplay.textContent = `Your reaction time: ${(reactionTime).toFixed(3)}s`;
    box.style.display = 'none';
    if (reactionTime <= 0.01) {
        message.textContent = 'Ok you are the flash i admit it';
    } else if (reactionTime <= 0.2) {
        message.textContent = 'Is that even possible ? Your are a not a human!';
    } else if (reactionTime <= 0.3) {
        message.textContent = 'Wow that\'s cool! You are too fast \'O\' ';
    } else if (reactionTime <= 0.4) {
        message.textContent = 'Wow you are getting faster!';
    } else if (reactionTime <= 0.5) {
        message.textContent = 'Nice your reaction is fast!';
    } else if (reactionTime <= 0.6) {
        message.textContent = 'That\'s good for a beginner :)';
    } else {
        message.textContent = 'You are too slow :(';
    }
    startButton.style.display = 'block';
}

