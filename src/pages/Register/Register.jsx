import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Row, { Col } from "../../components/Layout/Responsive";
import LinkButton from "../../components/LinkButton/LinkButton";
import MaterialIcons from "../../components/MaterialIcons";
import wavesBg from "../../images/waves-bg.png";
import "./register.css";

const Register = () => {
	const navigate = useNavigate();
	const [registerUser, setRegisterUser] = useState({
		fname: "",
		lname: "",
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
		avatar: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setRegisterUser((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(registerUser);
		setRegisterUser({
			fname: "",
			lname: "",
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
			avatar: "",
		});
	};
	return (
		<main
			className="register"
			style={{ backgroundImage: `url(${wavesBg})` }}
		>
			<button className="register-back" onClick={() => navigate(-1)}>
				<MaterialIcons>arrow_back</MaterialIcons>
			</button>
			<div className="register-container">
				<div className="register-head">
					<MaterialIcons>lock</MaterialIcons>
					<h3 className="register-head__h3">Sign Up to Planner</h3>
				</div>
				<form className="register-form" onSubmit={handleSubmit}>
					<Row>
						<Col lg={50} md={50}>
							<Input
								value={registerUser.fname}
								name="fname"
								type="text"
								placeholder="First Name"
								icon="person"
								onChange={handleChange}
							/>
						</Col>
						<Col lg={50} md={50}>
							<Input
								value={registerUser.lname}
								name="lname"
								type="text"
								placeholder="Last Name"
								icon="person"
								onChange={handleChange}
							/>
						</Col>
					</Row>
					<Row>
						<Col lg={50} md={50}>
							<Input
								value={registerUser.email}
								name="email"
								type="email"
								placeholder="Email"
								icon="mail"
								onChange={handleChange}
							/>
						</Col>
						<Col lg={50} md={50}>
							<Input
								value={registerUser.username}
								name="username"
								type="text"
								placeholder="Username"
								icon="account_circle"
								onChange={handleChange}
							/>
						</Col>
					</Row>
					<Row>
						<Col lg={50} md={50}>
							<Input
								value={registerUser.password}
								name="password"
								type="password"
								placeholder="Password"
								icon="key"
								onChange={handleChange}
							/>
						</Col>
						<Col lg={50} md={50}>
							<Input
								value={registerUser.confirmPassword}
								name="confirmPassword"
								type="password"
								placeholder="Confirm Password"
								icon="lock"
								onChange={handleChange}
							/>
						</Col>
					</Row>
					<Row>
						<Col lg={100} md={100} sm={100}>
							<Input
								value={registerUser.avatar}
								name="avatar"
								type="url"
								placeholder="Avatar"
								icon="photo_camera"
								onChange={handleChange}
							/>
						</Col>
					</Row>
					<Button text="Sign Up" type="submit" />
				</form>
				<span className="register-foot">
					Already have an account?{" "}
					<LinkButton to="/login">
						<span>Log In</span>
						<MaterialIcons>north_east</MaterialIcons>
					</LinkButton>
				</span>
			</div>
		</main>
	);
};

export default Register;
