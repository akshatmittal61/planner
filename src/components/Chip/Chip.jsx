import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./chip.css";

const Chip = ({
	text = "Chip Text",
	size = "normal",
	color = "indigo",
	variant = "fill",
	style,
	onClick,
	icon = "",
	link,
	href = "#",
	target = "_blank",
	...rest
}) => {
	const location = useLocation();
	const navigate = useNavigate();
	let classes = "chip ";
	if (size === "small") classes += " chip-sm";
	else if (size === "large") classes += " chip-lg";
	return (
		<button
			className={classes}
			style={{
				borderColor: `var(--${color})`,
				outlineColor: `var(--${color})`,
				backgroundColor:
					variant === "fill" ? `var(--${color}-100)` : "transparent",
				...style,
			}}
			onClick={
				href !== "" && href !== "#"
					? () => window.open(href, target)
					: link !== location.pathname && link !== undefined
					? () => navigate(link)
					: onClick
			}
			{...rest}
		>
			{icon !== "" && (
				<span className="material-symbols-outlined">{icon}</span>
			)}
			{text}
		</button>
	);
};

export default Chip;
