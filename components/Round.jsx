import Button from './Button';

export default function Round({ roundNum, playerWinCount, onClick, winnerMessage }) {
    const nextRoundMessage = roundNum < 5 ? `Make a selection to play round ${roundNum + 1}!!`
        : "This is the last round!!";
    
    const message = roundNum > 1 ? 
        `You\'ve won ${playerWinCount} rounds. ` +
            `The computer has won ${roundNum - 1 - playerWinCount} rounds. ` +
            `${nextRoundMessage}`
        : "";

    return (
        <div className="round">
            <h1>Round {roundNum} of Rock, Paper, Scissors!</h1>
            <h3>{winnerMessage}</h3>
            <h3>{message}</h3>
            <div>
                <Button id={"Rock"} text={"Rock"} onClick={onClick} />
                <Button id={"Paper"} text={"Paper"} onClick={onClick} />
                <Button id={"Scissors"} text={"Scissors"} onClick={onClick} />
            </div>
        </div>
    )
}
