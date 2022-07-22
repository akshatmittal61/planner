import React, { useState } from "react";
import MaterialIcons from "../MaterialIcons";
import "./input.css";

const Input = ({ icon, ...rest }) => (
	<div className="form-group">
		<label>
			<MaterialIcons>{icon}</MaterialIcons>
		</label>
		<input {...rest}></input>
	</div>
);

const TextArea = ({ icon, ...rest }) => (
	<div className="form-group">
		<label style={{ top: 0, transform: "translate(50%, 25%)" }}>
			<MaterialIcons>{icon}</MaterialIcons>
		</label>
		<textarea {...rest}></textarea>
	</div>
);

const Select = ({ icon, options, selected, ...rest }) => {
	const [showOptionsList, setShowOptionsList] = useState(false);
	return (
		<div className="form-group">
			<label>
				<MaterialIcons>{icon}</MaterialIcons>
			</label>
			<select {...rest}>
				{showOptionsList && (
					<OptionsList
						options={options}
						handle={(a) => selected(a)}
					/>
				)}
			</select>
		</div>
	);
};

const OptionsList = ({ options, handle }) => {
	return (
		<ul>
			{options.map((option, index) => (
				<li onClick={() => handle(option)} key={index}>
					{option}
				</li>
			))}
		</ul>
	);
};

export default Input;
export { TextArea, Select };
