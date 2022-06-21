import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import LinkButton from "../../components/Button/LinkButton";
import MaterialIcons from "../../components/MaterialIcons";
import wavesBg from "../../images/waves-bg.png";
import "./login.css";
import IconButton from "../../components/Button/IconButton";
import GlobalContext from "../../Context/GlobalContext";

const Login = () => {
	const navigate = useNavigate();
	const { setUser, setIsAuthenticated } = useContext(GlobalContext);
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
		setIsAuthenticated(true);
		localStorage.setItem("isAuthenticated", true);
		const loggedInUser = {
			name: "Akshat Mittal",
			status: "Developing",
			email: "akshatmittal2506@gmail.com",
			phone: 9456849466,
			username: "akshatmittal61",
			bio: "MERN Stack developer",
			dob: "2002-06-25",
			gender: "Male",
			avatar: "https://avatars.githubusercontent.com/u/84612609",
		};
		localStorage.setItem("user", JSON.stringify(loggedInUser));
		setUser(loggedInUser);
		navigate("/");
	};
	return (
		<main className="login" style={{ backgroundImage: `url(${wavesBg})` }}>
			<IconButton className="register-back" icon="arrow_back" link={-1} />
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
				<span className="login-foot">
					Don't have an account?{" "}
					<LinkButton to="/register">
						<span>Sign Up</span>
						<MaterialIcons>north_east</MaterialIcons>
					</LinkButton>
				</span>
			</div>
		</main>
	);
};

export default Login;
