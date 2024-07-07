import "./startModal.css";

export default function StartModal({ show, onStart }) {
	if (!show) {
		return null;
	}

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h2>Snake Game</h2>
				<p>Press "Start" to begin!</p>
				<button onClick={onStart}>Start Game</button>
			</div>
		</div>
	);
}

