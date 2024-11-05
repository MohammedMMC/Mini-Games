const buttons = [...document.querySelectorAll("div#options button").values()];
const statusText = document.getElementById("status");

/**
 * changeButtonsDisabledState
 * @param {Boolean} newState 
 */
function CBDS(newState) {
    buttons.forEach(b => b.disabled = newState);
}

function play(move) {
    statusText.style.color = "unset";
    statusText.innerText = "Your pc is choosing";
    CBDS(true);
    const myInterval = setInterval(() => {
        statusText.innerText += ".";
    }, 250);
    setTimeout(() => {
        clearInterval(myInterval);
        CBDS(false);
        const PC_MOVE = "RPS".split("")[Math.floor(Math.random() * 3)];
        if (move === PC_MOVE) {
            statusText.innerText = "It's a DRAW!";
            statusText.style.color = "grey";
        } else if (
            (move === "R" && PC_MOVE === "S") ||
            (move === "P" && PC_MOVE === "R") ||
            (move === "S" && PC_MOVE === "P")
        ) {
            statusText.innerText = `You WON!`;
            statusText.style.color = "lime";
        } else {
            statusText.innerText = `You LOST!`;
            statusText.style.color = "red";
        }
    }, 1000);
}
// statusText.innerText;