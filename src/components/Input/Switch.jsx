import React, { useEffect, useState } from "react";
import "./switch.css";

const Switch = ({ className, onClick, size = "16px", ...rest }) => {
	const [on, setOn] = useState(false);
	useEffect(() => {
		document.querySelector("body").style.setProperty("--switch-size", size);
	}, [size]);

	return (
		<button
			className={`switch ${on && "on"} ${className}`}
			role="switch"
			aria-checked="false"
			{...rest}
			onClick={(e) => {
				e?.preventDefault();
				setOn((p) => !p);
				onClick && onClick();
			}}
		></button>
	);
};

export default Switch;
