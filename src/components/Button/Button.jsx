import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GlobalContext from "../../Context/GlobalContext";
import "./button.css";

const Button = ({
	text = "Click Me",
	color,
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
	const { accentColor } = useContext(GlobalContext);
	let classes = "btn ";
	classes += className;
	if (color) classes += ` btn-${color}`;
	else classes += ` btn-${accentColor}`;
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
					? () => window.open(href, target)
					: link !== location.pathname && link !== undefined
					? () => navigate(link)
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
