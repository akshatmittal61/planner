import React, { useContext } from "react";
import GlobalContext from "../../Context/GlobalContext";
import MaterialIcons from "../MaterialIcons";
import "./button.css";

const Fab = ({ onClick, icon, text = "", className, size = "" }) => {
	const { theme, accentColor } = useContext(GlobalContext);
	let classes = "fab";
	if (size === "small") classes += " fab-sm";
	else if (size === "large") classes += " fab-lg";
	return (
		<button
			onClick={onClick}
			style={{
				backgroundColor: `var(--${accentColor}-${
					theme === "light" ? "100" : "700"
				})`,
			}}
			className={`${classes} ${className}`}
		>
			<MaterialIcons>{icon}</MaterialIcons>
			{text !== "" && <span>{text}</span>}
		</button>
	);
};

export default Fab;
