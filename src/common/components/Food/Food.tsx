import { FoodProps } from '../../types';
import './style.css'

export default function Food({ foodPosition }: FoodProps ) {
    return (
        <div
            style={{
                gridRowStart: foodPosition.y,
                gridColumnStart: foodPosition.x,
            }}
            className="food"
        />
    );
}
