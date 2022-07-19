import React from "react";

const MaterialIcons = ({ children, ...rest }) => {
	return (
		<span className="material-symbols-outlined" {...rest}>
			{children}
		</span>
	);
};

export default MaterialIcons;
