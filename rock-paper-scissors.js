let roundNum = 1;
let playerWinCount = 0;

const start = document.querySelector("#start");
start.addEventListener("click", game);

function game() {
    const h1 = document.querySelector("h1");
    h1.textContent = `Round ${roundNum} of Rock, Paper, Scissors!`;
    createRPSButtons();
    generateRPSClickListeners("rock", "paper", "scissors");
}

function playRound(e) {
    // Remove game info from UI if it's the first round of the first game.
    if (roundNum === 1) {
        const gameInfo = document.querySelector(".gameInfo");
        if (gameInfo) {
            const body = document.querySelector("body");
            body.removeChild(gameInfo);
        }
    }

    // Add round number information to the UI.
    const h1 = document.querySelector("h1");
    h1.textContent = `Round ${roundNum} of Rock, Paper, Scissors!`;

    // Determine appropriate message regarding win.
    const computerSelection = getComputerChoice();
    const playerSelection = e.target.id;
    const winMessage = winnerMessage(playerSelection, computerSelection);

    /* Update player win count. When the 4th element of winMessage is "w",
     * the player has won the round.
     */
    if (winMessage[4] === "w") playerWinCount++;

    // If we aren't at the end of the game, display the round info.
        // Otherwise, end the game and display the game stats.
    if (roundNum < 5) {
        displayRoundInfo(winMessage);
    }
    else endGame();
}

function displayRoundInfo(winMessage) {
    const resultsDiv = document.querySelector(".results");
    resultsDiv.textContent = winMessage;
    const currStatus = document.createElement("div");
    currStatus.textContent = `You\'ve won ${playerWinCount} rounds. \n` +
        `The computer has won ${roundNum - playerWinCount} rounds. ` +
        `Make a selection to play round ${++roundNum}!!`
    resultsDiv.appendChild(currStatus);
}

function endGame() {
    // Display message for winning or losing the game.
    h1 = document.querySelector("h1");
    if (playerWinCount >= 3) {
        h1.textContent = "Congratulations, you win!!!"
    } else {
        h1.textContent = "Sorry, it looks like the computer beat you. Better luck next time!";
    }

    // Remove no-longer-necessary UI elements.
    const results = document.querySelector(".results");
    results.textContent = "";
    const buttonContainer = document.querySelector(".buttonContainer");
    while (buttonContainer.firstChild) {
        buttonContainer.removeChild(buttonContainer.firstChild);
    }

    // Add a button for playing again.
    const playAgain = document.createElement("button");
    playAgain.id = "playAgain";
    playAgain.textContent = "Play Again";
    playAgain.addEventListener("click", game);
    const body = document.querySelector("body");
    body.appendChild(playAgain);

    // Reset player win count and round number.
    roundNum = 1;
    playerWinCount = 0;
}

function getComputerChoice() {
    const choiceNum = Math.random();
    let choice;
    if (choiceNum < 0.33) choice = "rock";
    else if (choiceNum < 0.66) choice = "paper";
    else choice = "scissors";
    return choice;
}

function winnerMessage(playerSelection, computerSelection) {
    playerSelection = playerSelection;
    const winOrder = ["rock", "paper", "scissors"];
    const playerNum = winOrder.indexOf(playerSelection);
    const computerNum = winOrder.indexOf(computerSelection);
    if (playerNum === computerNum)  {
        return `You tied! You both chose ${playerSelection}.`;
    } else if (computerNum === (playerNum + 1) % 3) {
        return `You lose! ${capitalizeFirstLetter(computerSelection)} beats ${playerSelection}.`;
    }
    return `You win! ${capitalizeFirstLetter(playerSelection)} beats ${computerSelection}.`;
}

function capitalizeFirstLetter(str) {
    const letters = str.split("");
    letters[0] = letters[0].toUpperCase();
    return letters.join("");
}

function createButton(id, text) {
    const button = document.createElement("button");
    button.id = id;
    button.textContent = text;
    return button;
}

function createRPSButtons() {
    // Generate Rock, Paper, and Scissors buttons. Add them to the UI.
    const rock = createButton("rock", "Rock");
    const paper = createButton("paper", "Paper");
    const scissors = createButton("scissors", "Scissors");
    const buttonContainer = document.querySelector(".buttonContainer");
    [rock, paper, scissors].forEach(elem => buttonContainer.appendChild(elem));

    // Remove now unnecessary buttons from the UI.
    const start = document.querySelector("#start");
    if (start) buttonContainer.removeChild(start);
    const playAgain = document.querySelector("#playAgain");
    if (playAgain) {
        const body = document.querySelector("body");
        body.removeChild(playAgain);
    }
}

function generateRPSClickListeners(...buttons) {
    buttons.forEach(button => {
        const buttonName = document.querySelector(`#${button}`);
        buttonName.addEventListener("click", playRound);
    })
}
