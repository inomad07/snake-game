import "./snake.css";

export default function Result({ show, score, bestScore, onRestart }) {
    if (!show) {
        return null;
    }

    return (
        <div className="result">
            <div className="result-content">
                <h2>Game Over!</h2>
                <p>Your Score: {score}</p>
                <p>Best Score: {bestScore}</p>
                <button onClick={onRestart}>Play Again</button>
            </div>
        </div>
    );
}
