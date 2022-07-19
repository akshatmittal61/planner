import React from "react";

const MaterialIcons = ({ children, style }) => {
	return (
		<span className="material-symbols-outlined" style={style}>
			{children}
		</span>
	);
};

export default MaterialIcons;
