import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import MaterialIcons from "../../components/MaterialIcons";
import Row, { Col } from "../../Layout/Responsive";
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
		<section className="register">
			<div className="register-container" data-aos="zoom-in">
				<div className="register-content">
					<div className="register-title">
						<span>Sign Up</span>
						<button className="icon" onClick={() => navigate("/")}>
							<MaterialIcons>close</MaterialIcons>
						</button>
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
									style={{
										width: "100%",
									}}
								/>
							</Col>
						</Row>
						<Button
							text="Sign Up"
							type="submit"
							color="brown"
							style={{ width: "40%" }}
						/>
					</form>
					<div className="register-bottom">
						<span>Already have an account?</span>
						<Link to="/login">Log In</Link>
					</div>
				</div>
				<div className="register-background">
					<div className="register-background-shape register-background-shape__4"></div>
					<div className="register-background-shape register-background-shape__3"></div>
					<div className="register-background-shape register-background-shape__2"></div>
					<div className="register-background-shape register-background-shape__1"></div>
				</div>
			</div>
		</section>
	);
};

export default Register;
