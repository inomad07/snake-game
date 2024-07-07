import GameBoard from "../features/components/GameBoard";
import { SNAKE_GAME } from "../common/constants";
import "./App.css";

export default function App() {
    return (
        <>
            <h1>{SNAKE_GAME}</h1>
            <GameBoard />
        </>
    );
}
