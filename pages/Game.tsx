import { useState } from 'react';
import Link from 'next/link';

import Button from '../components/Button';
import Round from '../components/Round';

export default function Game() {
    const [roundNum, setRoundNum] = useState(1);
    const [playerWinCount, setPlayerWinCount] = useState(0);
    const [winnerMessage, setWinnerMessage] = useState("");
    
    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        const computerSelection = getComputerChoice();
        const playerSelection = e.currentTarget.id;
        setRoundNum(roundNum + 1);
        const winMessage = generateWinnerMessage(playerSelection, computerSelection);
        /* Update the game's player win count. When the 4th element of winMessage
            * is "w", the player has won the round.
            */
        if (winMessage[4] === "w") setPlayerWinCount(playerWinCount + 1);
        setWinnerMessage(winMessage);
    }

    function getComputerChoice(): string {
        const choiceNum = Math.random();
        let choice: string;
        if (choiceNum < 0.33) choice = "Rock";
        else if (choiceNum < 0.66) choice = "Paper";
        else choice = "Scissors";
        return choice;
    }

    function generateWinnerMessage(playerSelection: string, computerSelection: string): string {
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

    return (
        <div className="game">
            { roundNum <= 5 ? 
                <Round
                    roundNum={roundNum}
                    playerWinCount={playerWinCount}
                    onClick={handleClick}
                    winnerMessage={winnerMessage}
                /> :
                <div className="endGame">
                    <h1>
                        {playerWinCount >= 3 ?
                        "Congratulations, you win!!!" : 
                        "Sorry, it looks like the computer beat you. " +
                            "Better luck next time!"}
                    </h1> 
                    <Link href="/">
                        <Button id="playAgain" text="Play Again!" />
                    </Link>
                </div>
            }   
        </div>
    )
}
