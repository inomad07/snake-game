export type InitialDirection = { x: number, y: number }

export type DirectionMap =  {
    ArrowUp: { x: number, y: number },
    ArrowDown: { x: number, y: number },
    ArrowLeft: { x: number, y: number },
    ArrowRight: { x: number, y: number },
};

type SnakeBody = [
    { x: number, y: number },
    { x: number, y: number }
]

export type FoodProps = {
    foodPosition: InitialDirection
}

export type SnakeProps = {
    snakeBody: SnakeBody
} 

export type StartModalProps = {
    show: boolean,
    onStart: () => void
}

export type ScoreProps = {
    score: number,
    bestScore:  string | number
}


export type ResultProps = {
    show: boolean,
    score: number,
    bestScore: string | number,
    onRestart: () => void
}
