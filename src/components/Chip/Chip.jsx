import React from "react";
import "./chip.css";

const Chip = ({
	text = "Chip Text",
	size = "normal",
	color = "indigo",
	variant = "fill",
	style,
	...rest
}) => {
	return (
		<button
			className={`chip 
			${size === "large" && "chip-lg"} 
			${size === "small" && "chip-sm"}`}
			style={{
				borderColor: `var(--${color})`,
				outlineColor: `var(--${color})`,
				backgroundColor:
					variant === "fill" ? `var(--${color}-100)` : "transparent",
				...style,
			}}
			{...rest}
		>
			{text}
		</button>
	);
};

export default Chip;
