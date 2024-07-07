import { useEffect, useRef, useState } from "react";
import Snake from "../../../common/components/Snake";
import Food from "../../../common/components/Food";
import Result from "../../../common/components/Result";
import StartModal from "../../../common/components/StartModal";
import Score from "../../../common/components/Score";
import { getInputDirection } from "../../utils/keyControls";
import { generateRandomPosition, outsideGrid } from "../../utils/gridEngine";
import { hasEatenFood } from '../../utils/snakeEngine';
import { SNAKE_SPEED, SNAKE_BODY, GRID_SIZE } from "../../../common/constants";
import "./gameBoard.css";

const GameBoard = () => {
    const [snakeBody, setSnakeBody] = useState(SNAKE_BODY);
    const [foodPosition, setFoodPosition] = useState(generateRandomPosition(GRID_SIZE));
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(
        localStorage.getItem("bestScore") || 0
    );
    const [showStartModal, setShowStartModal] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);
    const [direction, setDirection] = useState({ x: 1, y: 0 }); // Initial direction

    const gameBoardRef = useRef(null);

    const handleKeyDown = (event) => {
        const newDirection = getInputDirection(event.key);
        if (newDirection) {
            setDirection(newDirection);
        }
    };

    useEffect(() => {
        if (gameBoardRef.current) {
            gameBoardRef.current.focus();
        }
    }, [gameStarted, gameOver]);

    useEffect(() => {
        if (gameStarted && !gameOver) {
            const interval = setInterval(() => {
                updateSnake();
                checkCollision();
            }, SNAKE_SPEED);

            return () => clearInterval(interval);
        }
    }, [snakeBody, gameOver, gameStarted]);

    const updateSnake = () => {
        const { x: headX, y: headY } = snakeBody[snakeBody.length - 1];
        const newHead = {
            x: headX + direction.x,
            y: headY + direction.y,
        };

        const newSnake = [...snakeBody];
        newSnake.push(newHead);

        if (hasEatenFood(newHead, foodPosition)) {
            setFoodPosition(generateRandomPosition(GRID_SIZE));
            setScore((prevScore) => prevScore + 1);
        } else {
            newSnake.shift();
        }

        setSnakeBody(newSnake);
    };

    const checkCollision = () => {
        const head = snakeBody[snakeBody.length - 1];

        if (outsideGrid(head, GRID_SIZE) || snakeIntersection()) {
            endGame();
        }
    };

    const snakeIntersection = () => {
        const head = snakeBody[snakeBody.length - 1];
        return snakeBody.slice(0, -1).some((segment) => {
            return segment.x === head.x && segment.y === head.y;
        });
    };

    const endGame = () => {
        setGameOver(true);
        updateBestScore();
    };

    const updateBestScore = () => {
        if (score > bestScore) {
            setBestScore(score);
            localStorage.setItem("bestScore", score);
        }
    };

    const restartGame = () => {
        setSnakeBody(SNAKE_BODY);
        setFoodPosition(generateRandomPosition(GRID_SIZE)); // Ensure foodPosition is updated immediately
        setScore(0);
        setGameOver(false);
        setGameStarted(true);
        setShowStartModal(false);
        setDirection({ x: 1, y: 0 }); // Reset initial direction
    };

    const startGame = () => {
        setShowStartModal(false);
        setGameStarted(true);
        setGameOver(false);
    };

    return (
        <>
            <Score score={score} bestScore={bestScore} />
            <div className="grid-container">
                <div
                    id="game-board"
                    ref={gameBoardRef}
                    className={gameOver ? "game-over" : ""}
                    tabIndex={0}
                    onKeyDown={handleKeyDown} // Attach keydown event listener to the game board div
                >
                    {gameStarted && <Snake snakeBody={snakeBody} />}
                    {gameStarted && <Food foodPosition={foodPosition} />}
                </div>
                <Result
                    show={gameOver}
                    score={score}
                    bestScore={bestScore}
                    onRestart={restartGame}
                />
                {!gameStarted && (
                    <StartModal show={showStartModal} onStart={startGame} />
                )}
            </div>
        </>
    );
};

export default GameBoard;
