import './snake.css'

export default function Snake({ snakeBody }) {
    return (
        <>
            {snakeBody.map((segment, index) => (
                <div
                    key={index}
                    style={{
                        gridRowStart: segment.y,
                        gridColumnStart: segment.x,
                    }}
                    className="snake"
                />
            ))}
        </>
    );
}

