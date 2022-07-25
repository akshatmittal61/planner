import React from "react";
import MaterialIcons from "../MaterialIcons";
import "./input.css";

const Input = ({
	name,
	placeholder,
	type,
	autoFocus,
	disabled,
	icon,
	...rest
}) => (
	<div className="form-group">
		<label>
			<MaterialIcons>{icon}</MaterialIcons>
		</label>
		<input
			name={name}
			placeholder={placeholder}
			type={type}
			autoFocus={autoFocus}
			disabled={disabled}
			{...rest}
		></input>
	</div>
);

const TextArea = ({
	name,
	placeholder,
	type,
	autoFocus,
	disabled,
	icon,
	...rest
}) => (
	<div className="form-group">
		<label style={{ top: 0, transform: "translate(50%, 25%)" }}>
			<MaterialIcons>{icon}</MaterialIcons>
		</label>
		<textarea
			name={name}
			placeholder={placeholder}
			type={type}
			autoFocus={autoFocus}
			disabled={disabled}
			{...rest}
		></textarea>
	</div>
);

const Select = ({ icon, options, selected, ...rest }) => (
	<div className="form-group">
		<label>
			<MaterialIcons>{icon}</MaterialIcons>
		</label>
		<select {...rest}>
			{options.map((option, index) => (
				<option key={index} value={option}>
					{option}
				</option>
			))}
		</select>
	</div>
);

export default Input;
export { TextArea, Select };
