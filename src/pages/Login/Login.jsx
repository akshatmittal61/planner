import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import MaterialIcons from "../../components/MaterialIcons";
import "./login.css";

const Login = () => {
	const navigate = useNavigate();
	const [loginUser, setLoginUser] = useState({
		username: "",
		password: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginUser((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(loginUser);
		setLoginUser({
			username: "",
			password: "",
		});
	};
	return (
		<main className="login">
			<button className="login-back" onClick={() => navigate(-1)}>
				<MaterialIcons>arrow_back</MaterialIcons>
			</button>
			<div className="login-container">
				<div className="login-head">
					<MaterialIcons>lock</MaterialIcons>
					<h3 className="login-head__h3">Login to your account</h3>
				</div>
				<form className="login-form" onSubmit={handleSubmit}>
					<Input
						value={loginUser.username}
						name="username"
						placeholder="Username"
						icon="account_circle"
						onChange={handleChange}
					/>
					<Input
						value={loginUser.password}
						name="password"
						placeholder="Password"
						icon="key"
						onChange={handleChange}
					/>
					<Button text="Login" type="submit" />
				</form>
			</div>
		</main>
	);
};

export default Login;
