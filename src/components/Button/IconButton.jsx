import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconMask } from "../../utils/images";
import "./button.css";

const IconButton = ({
	color = "blue",
	href = "#",
	target = "_blank",
	link,
	variant,
	className = "",
	size = "",
	icon = "",
	onClick,
	fill = "#C7DBFA",
	...rest
}) => {
	const location = useLocation();
	const navigate = useNavigate();
	let classes = "icon-btn ";
	classes += className;
	classes += ` icon-btn-${color}`;
	if (size === "small") classes += " icon-btn-sm";
	else if (size === "large") classes += " icon-btn-lg";
	if (variant === "fill" || variant === "outline")
		classes += ` icon-btn-${variant}`;
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
			<span className="material-symbols-outlined">{icon}</span>
			<IconMask fill={fill} />
		</button>
	);
};

export default IconButton;
