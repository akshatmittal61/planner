import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import MaterialIcons from "../../components/MaterialIcons";
import GlobalContext from "../../Context/GlobalContext";
import Row, { Col } from "../../Layout/Responsive";
import "./register.css";

const Register = () => {
	const { setSnack, setOpenSnackBar, setIsLoading, axiosInstance } =
		useContext(GlobalContext);
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
	const handleSubmit = async (e) => {
		e?.preventDefault();
		if (registerUser.password !== registerUser.confirmPassword) {
			setSnack({
				text: "Passwords do not match",
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
		} else {
			try {
				setIsLoading(true);
				const res = await axiosInstance.post("/api/auth/register", {
					...registerUser,
				});
				if (res.status === 200) {
					setSnack({
						text: res.data.message,
						bgColor: "var(--green)",
						color: "var(--white)",
					});
					setOpenSnackBar(true);
					setTimeout(() => {
						setOpenSnackBar(false);
					}, 5000);
					setIsLoading(false);
					navigate("/profile");
				}
			} catch (error) {
				setSnack({
					text: error.response.data.message,
					bgColor: "var(--red)",
					color: "var(--white)",
				});
				setOpenSnackBar(true);
				setTimeout(() => {
					setOpenSnackBar(false);
				}, 5000);
				setIsLoading(false);
			}
		}
	};
	return (
		<main className="register">
			<div className="register-mac" data-aos="zoom-in">
				<div className="register-mac-head">
					<div className="register-mac-head-buttons">
						<button className="register-mac-head__button">
							<Link to="/">
								<MaterialIcons>close</MaterialIcons>
							</Link>
						</button>
						<button className="register-mac-head__button">
							<Link to={-1}>
								<MaterialIcons>remove</MaterialIcons>
							</Link>
						</button>
						<button className="register-mac-head__button">
							<MaterialIcons>apps</MaterialIcons>
						</button>
					</div>
					<div className="register-mac-head-title">
						<span className="register-mac-head-title__text">
							Sign Up
						</span>
					</div>
					<div className="register-mac-head-switch"></div>
				</div>
				<div className="register-mac-body">
					<div className="register-mac-body-container">
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
										required
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
										required
									/>
								</Col>
								<Col lg={50} md={50}>
									<Input
										value={registerUser.email}
										name="email"
										type="email"
										placeholder="Email"
										icon="mail"
										onChange={handleChange}
										required
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
										required
									/>
								</Col>
								<Col lg={50} md={50}>
									<Input
										value={registerUser.password}
										name="password"
										type="password"
										placeholder="Password"
										icon="key"
										onChange={handleChange}
										required
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
										required
									/>
								</Col>
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
							<div className="register-form-group">
								<div className="register-form-group-signin">
									<span>Already have an account? </span>
									<Link to="/login"> Log In</Link>
								</div>
								<Button
									text="Sign Up"
									type="submit"
									color="green"
									size="large"
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Register;
