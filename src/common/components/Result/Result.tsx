import './style.css';
import { PLAY_AGAIN, GAME_OVER, YOUR_SCORE, BEST_SCORE } from '../../constants'
import { ResultProps } from '../../types';


export default function Result({ show, score, bestScore, onRestart }: ResultProps) {
    if (!show) {
        return null;
    }

    return (
        <div className="result">
            <div className="result-content">
                <h2>{GAME_OVER}</h2>
                <p>{YOUR_SCORE}{score}</p>
                <p>{BEST_SCORE}{bestScore}</p>
                <button onClick={onRestart}>{PLAY_AGAIN}</button>
            </div>
        </div>
    );
}
