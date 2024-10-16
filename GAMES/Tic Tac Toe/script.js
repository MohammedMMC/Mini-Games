const canvas = document.querySelector("canvas");
const statusText = document.getElementById("status");
const playAgainButton = document.getElementById("playAgain");

const ctx = canvas.getContext("2d");

const CANVAS_SIZE = 300;
const BOX_SIZE = CANVAS_SIZE / 3;

const WIN_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

let player = 'X';
let board = Array(9).fill(null);
let gameOver = false;

function drawBoard() {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#45d1ca";
    for (let i = 1; i < 3; i++) {
        ctx.moveTo(i * BOX_SIZE, 0);
        ctx.lineTo(i * BOX_SIZE, CANVAS_SIZE);
        ctx.moveTo(0, i * BOX_SIZE);
        ctx.lineTo(CANVAS_SIZE, i * BOX_SIZE);
    }
    ctx.stroke();
}

function checkWinner() {
    for (const [a, b, c] of WIN_PATTERNS) {
        if (board[a] && board[a] === board[b] && board[a] === board[c])
            return board[a];
    }
    return board.includes(null) ? null : 'T';
}

canvas.addEventListener('click', (e) => {
    if (gameOver) return;

    const { offsetX, offsetY } = e, col = Math.floor(offsetX / BOX_SIZE), row = Math.floor(offsetY / BOX_SIZE);
    const index = row * 3 + col;
    if (board[index]) return;
    board[index] = player;

    ctx.font = '80px Arial';
    ctx.fillStyle = player === 'X' ? "#e04d5b" : "#457dd1";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(player, col * BOX_SIZE + BOX_SIZE / 2, row * BOX_SIZE + BOX_SIZE / 2);

    const winner = checkWinner();

    console.log(winner);


    if (winner) {
        gameOver = true;
        statusText.innerText = winner === 'T' ? "It's a Tie!" : `Player ${winner} wins!`;
        statusText.style.color = "var(--green-color)";
        playAgainButton.style.display = "block";
    } else {
        player = player === 'X' ? 'O' : 'X';
        turnStatus();
    }
});


function turnStatus() {
    if (gameOver) return;

    statusText.innerText = `Player ${player}'s turn`;
    statusText.style.color = `var(--${player === 'X' ? "red" : "blue"}-color)`;
}

function newGame() {
    playAgainButton.style.display = "none";
    statusText.innerText = `Starting The Game...`;
    statusText.style.color = "black";
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    player = 'X';
    board = Array(9).fill(null);
    gameOver = false;
    drawBoard();
    turnStatus();
}

playAgainButton.addEventListener("click", newGame);
newGame();