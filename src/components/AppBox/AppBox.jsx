import React from "react";
import { Link } from "react-router-dom";
import Row, { Col } from "../../Layout/Responsive";
import routes from "../../routes";
import MaterialIcons from "../MaterialIcons";
import "./app-box.css";

const AppBox = ({ close }) => {
	return (
		<section className="app-box">
			<div className="app-box-cover" onClick={close}></div>
			<div className="app-box-container" data-aos="zoom-in">
				<Row>
					{routes.map((route, index) => (
						<Col lg={50} md={50} sm={50} key={index}>
							<Link to={route.route} className="app-box-link">
								<MaterialIcons>{route.icon}</MaterialIcons>
								<span>{route.title}</span>
							</Link>
						</Col>
					))}
				</Row>
			</div>
		</section>
	);
};

export default AppBox;
