export function generateRandomPosition(gridSize) {
    return {
        x: Math.floor(Math.random() * gridSize) + 1,
        y: Math.floor(Math.random() * gridSize) + 1
    }
}

export function outsideGrid(position, gridSize) {
    return (
        position.x < 1 || position.x > gridSize ||
        position.y < 1 || position.y > gridSize
    )
}

export function getCellType(type) {
    const cellTypes = {
        food: 'food',
        snake: 'snake'
    }

    return cellTypes[type];
}
