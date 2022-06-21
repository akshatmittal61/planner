import React from "react";
import { Link } from "react-router-dom";
import "./button.css";

const LinkButton = ({ to, children }) => {
	return (
		<Link className="link-button" to={to}>
			{children}
		</Link>
	);
};

export default LinkButton;
