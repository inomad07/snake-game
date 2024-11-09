import GameBoard from '../features/components/GameBoard';
import { SNAKE_GAME } from '../common/constants';
import "./style.css";

export default function App() {
    return (
        <>
            <h1>{SNAKE_GAME}</h1>
            <GameBoard />
        </>
    );
}
