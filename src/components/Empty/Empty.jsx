import React from "react";
import { omit } from "../../utils";
import Button from "../Button/Button";
import "./empty.css";

const Empty = ({
	img,
	text,
	cta = { text: "", icon: "", color: "indigo", action: () => {} },
}) => {
	return (
		<main className="empty">
			<div className="empty-img">
				<img src={img} alt="Empty" />
			</div>
			<div className="empty-text">{text}</div>
			{cta.text !== "" && (
				<div className="empty-btn">
					<Button
						size="large"
						onClick={cta.action}
						{...omit(cta, "action")}
					/>
				</div>
			)}
		</main>
	);
};

export default Empty;
