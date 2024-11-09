import { DirectionMap } from "../../common/types";

export function getInputDirection(key: string) {
    const directionMap = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
    };

    return directionMap[key as keyof DirectionMap] || null;
}

