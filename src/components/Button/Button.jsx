import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./button.css";

const Button = ({
	text = "Click Me",
	color = "indigo",
	href = "#",
	target = "_blank",
	link,
	variant,
	className = "",
	size = "",
	icon = "",
	onClick,
	...rest
}) => {
	const location = useLocation();
	const navigate = useNavigate();
	let classes = "btn";
	classes += className;
	classes += ` btn-${color}`;
	if (size === "small") classes += " btn-sm";
	else if (size === "large") classes += " btn-lg";
	if (variant === "fill" || variant === "outline")
		classes += ` btn-${variant}`;
	return (
		<button
			className={classes}
			{...rest}
			onClick={
				href !== "" && href !== "#"
					? () => {
							window.open(href, target);
					  }
					: link !== location.pathname && link !== undefined
					? () => {
							navigate(link);
					  }
					: onClick
			}
		>
			{icon !== "" && (
				<span className="material-symbols-outlined">{icon}</span>
			)}
			{text}
		</button>
	);
};

export default Button;
