import './score.css';

export default function Score({ score, bestScore }) {
    return (
        <div className="score-container">
            <div className="score">
                <h2>Score: {score}</h2>
            </div>
            <div className="best-score">
                <h2>Best Score: {bestScore}</h2>
            </div>
        </div>
    );
}

