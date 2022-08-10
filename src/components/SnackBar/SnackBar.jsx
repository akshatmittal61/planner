import React, { useState, useEffect } from "react";
import "./snackbar.css";
import { X } from "react-feather";

const SnackBar = ({
	text = "Snackbar message",
	bgColor = "rgba(255, 255, 255, 0.5)",
	color = "",
	close,
}) => {
	const [move, setMove] = useState(120);
	const [clickClose, setClickClose] = useState(false);
	useEffect(() => {
		if (!clickClose) {
			if (move > 0) {
				setTimeout(() => {
					setMove(move - 1);
				}, 1);
			}
		} else {
			if (move <= 150) {
				setTimeout(() => {
					setMove(move + 1);
				}, 1);
			}
		}
	}, [clickClose, move]);
	const handleClose = () => {
		setClickClose(true);
		if (move >= 150) close();
	};
	return (
		<div
			className="snack"
			style={{
				backgroundColor: bgColor,
				color: color,
				transform: `translateX(-${move}%)`,
			}}
		>
			<span className="snack-text">{text}</span>
			<button className="snack-close" onClick={handleClose}>
				<X />
			</button>
		</div>
	);
};

export default SnackBar;
