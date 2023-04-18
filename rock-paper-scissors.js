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
