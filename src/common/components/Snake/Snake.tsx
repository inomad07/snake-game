import { SnakeProps } from '../../types';
import './style.css'

export default function Snake({ snakeBody }: SnakeProps) {
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

