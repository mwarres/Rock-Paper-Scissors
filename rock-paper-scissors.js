function getComputerChoice() {
    const choiceNum = Math.random();
    let choice;
    if (choiceNum < 0.33) choice = "Rock";
    else if (choiceNum < 0.66) choice = "Paper";
    else choice = "Scissors";
    return choice;
}
