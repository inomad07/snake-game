import "./style.css";
import { SNAKE_GAME, PRESS_START, START_GAME } from '../../constants';
import { StartModalProps } from "../../types";

export default function StartModal({ show, onStart }: StartModalProps) {
	if (!show) {
		return null;
	}

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h2>{SNAKE_GAME}</h2>
				<p>{PRESS_START}</p>
				<button onClick={onStart}>{START_GAME}</button>
			</div>
		</div>
	);
}

