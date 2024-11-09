import { InitialDirection } from "../../common/types";


export function generateRandomPosition(gridSize: number) {
    return {
        x: Math.floor(Math.random() * gridSize) + 1,
        y: Math.floor(Math.random() * gridSize) + 1
    }
}

export function outsideGrid(position: InitialDirection, gridSize: number) {
    return (
        position.x < 1 || position.x > gridSize ||
        position.y < 1 || position.y > gridSize
    )
}
