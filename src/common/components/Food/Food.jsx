import './food.css'

export default function Food({ foodPosition }) {
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
