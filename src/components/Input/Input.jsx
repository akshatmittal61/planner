import React from "react";
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
		<label style={{top: 0, transform: 'translate(50%, 25%)'}}>
			<MaterialIcons>{icon}</MaterialIcons>
		</label>
		<textarea {...rest}></textarea>
	</div>
);

export default Input;
export { TextArea };
