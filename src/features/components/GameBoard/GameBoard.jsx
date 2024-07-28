import { useEffect, useRef, useState } from "react";
import Snake from "../../../common/components/Snake";
import Food from "../../../common/components/Food";
import Result from "../../../common/components/Result";
import StartModal from "../../../common/components/StartModal";
import Score from "../../../common/components/Score";
import { getInputDirection } from "../../utils/keyControls";
import { generateRandomPosition, outsideGrid } from "../../utils/gridEngine";
import { hasEatenFood } from "../../utils/snakeEngine";
import {
    SNAKE_SPEED,
    SNAKE_BODY,
    GRID_SIZE,
    INITIAL_DIRECTION
} from "../../../common/constants";
import "./gameBoard.css";

const GameBoard = () => {
    const [snakeBody, setSnakeBody] = useState(SNAKE_BODY);
    const [foodPosition, setFoodPosition] = useState(
        generateRandomPosition(GRID_SIZE)
    );
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(
        localStorage.getItem("bestScore") || 0
    );
    const [showStartModal, setShowStartModal] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);
    const [direction, setDirection] = useState(INITIAL_DIRECTION);

    const gameBoardRef = useRef(null);
    const requestRef = useRef();
    const lastRenderTimeRef = useRef(0);

    useEffect(() => {
        if (gameBoardRef.current) {
            gameBoardRef.current.focus();
        }
    }, [gameStarted, gameOver]);

    useEffect(() => {
        if (gameStarted && !gameOver) {
            requestRef.current = requestAnimationFrame(gameLoop);
            return () => cancelAnimationFrame(requestRef.current);
        }
    }, [snakeBody, gameOver, gameStarted]);

    const gameLoop = (currentTime) => {
        const deltaTime = currentTime - lastRenderTimeRef.current;

        if (deltaTime < SNAKE_SPEED) {
            requestRef.current = requestAnimationFrame(gameLoop);
            return;
        }

        lastRenderTimeRef.current = currentTime;
        updateSnakeBody();
        checkCollision();

        requestRef.current = requestAnimationFrame(gameLoop);
    };

    const handleKeyDown = (event) => {
        const newDirection = getInputDirection(event.key);
        if (newDirection) {
            setDirection(newDirection);
        }
    };

    const updateSnakeBody = () => {
        const { x: headX, y: headY } = snakeBody[snakeBody.length - 1];
        const newHead = {
            x: headX + direction.x,
            y: headY + direction.y,
        };

        const newSnakeBody = updateSnakeSegments(newHead);

        setSnakeBody(newSnakeBody);
    };

    const updateSnakeSegments = (newHead) => {
        return hasEatenFood(newHead, foodPosition)
            ? updateFoodScore(newHead)
            : [...snakeBody.slice(1), newHead];
    };

    const updateFoodScore = (newHead) => {
        setFoodPosition(generateRandomPosition(GRID_SIZE));
        setScore((prevScore) => prevScore + 1);
        return [...snakeBody, newHead];
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
        setFoodPosition(generateRandomPosition(GRID_SIZE));
        setScore(0);
        setGameOver(false);
        setGameStarted(true);
        setShowStartModal(false);
        setDirection(INITIAL_DIRECTION);
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
                    onKeyDown={handleKeyDown}
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
