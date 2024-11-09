import './style.css';
import { BEST_SCORE } from '../../constants';
import { ScoreProps } from '../../types';

export default function Score({ score, bestScore }: ScoreProps) {
    return (
        <div className="score-container">
            <div className="score">
                <h2>Score: {score}</h2>
            </div>
            <div className="best-score">
                <h2>{BEST_SCORE}{bestScore}</h2>
            </div>
        </div>
    );
}

