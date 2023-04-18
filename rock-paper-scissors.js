function game() {
    console.log("Welcome to Rock, Paper, Scissors! There will be 5 rounds of the game! You'll be playing against the computer, a formidable opponent. Good luck!!")
    let playerWinCount = 0;
    for (let i = 0; i < 5; i++) {
        const message = playRound();
        if (message[4] === "w") playerWinCount++;
    }
    if (playerWinCount >= 3) console.log("Congrats!! You win!!");
    else console.log("Sorry, it looks like the computer beat you. Better luck next time!");
}

function playRound() {
    const computerSelection = getComputerChoice();
    const playerSelection = prompt("Enter your choice: rock, paper, or scissors!");
    const winMessage = pickWinner(playerSelection, computerSelection);
    console.log(winMessage);
    return winMessage;
}

function getComputerChoice() {
    const choiceNum = Math.random();
    let choice;
    if (choiceNum < 0.33) choice = "Rock";
    else if (choiceNum < 0.66) choice = "Paper";
    else choice = "Scissors";
    return choice;
}

function pickWinner(playerSelection, computerSelection) {
    playerSelection = formatUserInput(playerSelection);
    const winOrder = ["Rock", "Paper", "Scissors"];
    const playerNum = winOrder.indexOf(playerSelection);
    const computerNum = winOrder.indexOf(computerSelection);
    if (playerNum === computerNum)  {
        return `You tied! You both chose ${playerSelection}.`;
    } else if (computerNum === (playerNum + 1) % 3) {
        return `You lose! ${computerSelection} beats ${playerSelection}.`;
    }
    return `You win! ${playerSelection} beats ${computerSelection}.`;
}

function formatUserInput(selection) {
    selection = selection.toLowerCase();
    const letters = selection.split("");
    letters[0] = letters[0].toUpperCase();
    return letters.join("");
}
