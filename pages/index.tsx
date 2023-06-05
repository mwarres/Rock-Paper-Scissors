import Link from 'next/link';

import Button from '../components/Button';
import Game from './Game';

export default function RPSHomePage() {
    return (
        <div className="game">
            <h1>Welcome to Rock, Paper, Scissors!!</h1>
            <h3>
                There will be five rounds! Beat the computer in 3 out of 5
                rounds to win.
            </h3>
            <Link href="/Game">
                <Button id="start" text="Start!" />
            </Link>
        </div>
    );
}
