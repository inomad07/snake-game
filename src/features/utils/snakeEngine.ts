import { InitialDirection } from "../../common/types";


export function hasEatenFood(head: InitialDirection, foodPosition: InitialDirection) {
    return head.x === foodPosition.x && head.y === foodPosition.y;
}

