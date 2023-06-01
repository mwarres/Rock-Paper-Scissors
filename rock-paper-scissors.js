class Game {
    static newGame() {
        const currGame = new Game();
        currGame.startGame();
        return currGame;
    }

    constructor() {
        this.currRound = new Round(1);
        this.playerWinCount = 0;
        this.buttonContainer = document.querySelector(".buttonContainer");
        this.boundEndGame = this.endGame.bind(this);
        this.buttonContainer.addEventListener("gameFinished", this.boundEndGame);
    }

    startGame() {
        const h1 = document.querySelector("h1");
        h1.textContent = "Welcome to Rock, Paper, Scissors!!";
        let start = document.getElementById("start");
        if (!start) {
            start = document.createElement("button");
            start.id = "start";
            start.textContent = "Start!"
            const buttonContainer = document.querySelector(".buttonContainer");
            buttonContainer.appendChild(start);
        }
        start.addEventListener("click", this.currRound.displayRoundUI.bind(this.currRound));
    }

    endGame() {
        // Display message for winning or losing the game.
        const h1 = document.querySelector("h1");
        if (this.playerWinCount >= 3) {
            h1.textContent = "Congratulations, you win!!!"
        } else {
            h1.textContent = "Sorry, it looks like the computer beat you. " +
                "Better luck next time!";
        }

        /* Remove "gameFinished" event listener, clear UI, and add "Play Again"
         * button.
         */
        this.buttonContainer.removeEventListener("gameFinished", this.boundEndGame);
        this.clearUIAtEnd();
        this.addPlayAgainButton();
    }

    /* Clear results and remove no-longer-needed Rock, Paper, Scissors buttons
     * at the end of game.
     */
    clearUIAtEnd() {
        const results = document.querySelector(".results");
        results.textContent = "";
        const buttonContainer = document.querySelector(".buttonContainer");
        while (buttonContainer.firstChild) {
            buttonContainer.removeChild(buttonContainer.firstChild);
        }
    }

    addPlayAgainButton() {
        const playAgain = document.createElement("button");
        playAgain.id = "playAgain";
        playAgain.textContent = "Play Again";
        playAgain.addEventListener("click", this.setupNewGame.bind(this));
        const body = document.querySelector("body");
        body.appendChild(playAgain);
    }

    setupNewGame() {
        const playAgainButton = document.getElementById("playAgain");
        playAgainButton.removeEventListener("click", this.setupNewGame);
        const body = document.querySelector("body");
        body.removeChild(playAgainButton);
        currGame = Game.newGame();
    }
}

class Round {
    constructor(roundNum) {
        this.roundNum = roundNum;
    }

    // Add round number information to the UI.
    displayRoundNum() {
        const h1 = document.querySelector("h1");
        h1.textContent = `Round ${this.roundNum} of Rock, Paper, Scissors!`;
    }

    displayRoundUI() {
        this.removeGameInfo();
        this.generateRPSButtons();
        this.displayRoundNum();
    }

    playRound(e) {
        // Determine appropriate message regarding win.
        const computerSelection = this.getComputerChoice();
        const playerSelection = e.target.id;
        if (playerSelection !== "start") {
            const winMessage = this.winnerMessage(playerSelection, computerSelection);
            /* Update the game's player win count. When the 4th element of winMessage
             * is "w", the player has won the round.
             */
            if (winMessage[4] === "w") currGame.playerWinCount++;
            if (this.roundNum < 5) {
                this.displayRoundInfo(winMessage);
            }
        }

        // Remove the event listeners and buttons for this round.
        const buttons = document.querySelectorAll("button");
        buttons.forEach(button => {
                removeEventListener("click", this.playRound.bind(this));
            }
        );
        const buttonContainer = document.querySelector(".buttonContainer");
        while (buttonContainer.firstChild) buttonContainer.removeChild(buttonContainer.firstChild);


        /* If there are additional rounds left in the game, display the round
         * information in the UI. Otherwise, end the game.
         */
        if (this.roundNum < 5) {
            currGame.currRound = new Round(this.roundNum + 1);
            currGame.currRound.displayRoundUI();
        } else {
            const gameFinished = new Event("gameFinished");
            const buttonContainer = document.querySelector(".buttonContainer");
            buttonContainer.dispatchEvent(gameFinished);
        }
    }

    // Remove game info from UI if it's the first round of the first game.
    removeGameInfo() {
         const gameInfo = document.querySelector(".gameInfo");
         if (gameInfo) {
             const body = document.querySelector("body");
             body.removeChild(gameInfo);
         }
    }

    /* Generate Rock, Paper, and Scissors Buttons for the UI, clear UI of
     * pre-existing unnecessary UI elements, and create event listeners for
     * playRound on the Rock, Paper, Scissors Buttons.
     */
    generateRPSButtons() {
        const buttonContainer = document.querySelector(".buttonContainer");
        const rpsButtons = new RPSButtons(buttonContainer);
        rpsButtons.clearUI();
        const boundGenRPSClickListers = rpsButtons.generateRPSClickListeners.bind(this);
        boundGenRPSClickListers("Rock", "Paper", "Scissors");
    }

    displayRoundInfo(winMessage) {
        const resultsDiv = document.querySelector(".results");
        resultsDiv.textContent = winMessage;
        const currStatus = document.createElement("div");
        currStatus.textContent = `You\'ve won ${currGame.playerWinCount} rounds. ` +
            `The computer has won ${this.roundNum - currGame.playerWinCount} rounds. ` +
            `Make a selection to play round ${this.roundNum + 1}!!`
        resultsDiv.appendChild(currStatus);
    }

    getComputerChoice() {
        const choiceNum = Math.random();
        let choice;
        if (choiceNum < 0.33) choice = "Rock";
        else if (choiceNum < 0.66) choice = "Paper";
        else choice = "Scissors";
        return choice;
    }

    winnerMessage(playerSelection, computerSelection) {
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
}

class Button {
    constructor(id, text) {
        this.button = document.createElement("button");
        this.button.id = id;
        this.button.textContent = text;
    }
}

class RPSButtons {
    // Generate Rock, Paper, and Scissors buttons. Add them to the UI.
    constructor(buttonContainer) {
        this.rock = new Button("Rock", "Rock");
        this.paper = new Button("Paper", "Paper");
        this.scissors = new Button("Scissors", "Scissors");
        this.buttonContainer = buttonContainer;
        [this.rock.button, this.paper.button, this.scissors.button].forEach(elem => buttonContainer.appendChild(elem));
    }

    // Remove now unnecessary buttons from the UI.
    clearUI() {
        const start = document.getElementById("start");
        if (start) this.buttonContainer.removeChild(start);
        const playAgain = document.getElementById("playAgain");
        if (playAgain) {
            const body = document.querySelector("body");
            body.removeChild(playAgain);
        }
    }

    generateRPSClickListeners(...buttons) {
        buttons.forEach(button => {
            const buttonName = document.getElementById(`${button}`);
            buttonName.addEventListener("click", this.playRound.bind(this));
        })
    }
}

let currGame = Game.newGame();
