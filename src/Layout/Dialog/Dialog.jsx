import React, { useContext, useEffect } from "react";
import Button from "../../components/Button/Button";
import MaterialIcons from "../../components/MaterialIcons";
import GlobalContext from "../../Context/GlobalContext";
import "./dialog.css";

const Dialog = ({
	title = "",
	close = () => {},
	cta = {
		text: "Save",
		icon: "save",
		color: "indigo",
		action: () => {},
	},
	children,
	color,
	bodyStyle,
}) => {
	const { theme, accentColor } = useContext(GlobalContext);
	useEffect(() => {
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") close();
		});
		return () => {
			document.removeEventListener("keydown", (e) => {
				if (e.key === "Escape") close();
			});
		};
	}, [close]);
	return (
		<section className="dialog" data-aos="fade-up">
			<div
				className="dialog-head"
				style={{
					backgroundColor: `var(--${color ? color : accentColor}-${
						theme === "light" ? "100" : "700"
					})`,
				}}
			>
				<div className="dialog-head-left">
					<button className="dialog-head-close icon" onClick={close}>
						<MaterialIcons>close</MaterialIcons>
					</button>
					{title !== "" && (
						<span className="dialog-head-title">{title}</span>
					)}
				</div>
				<div className="dialog-head-right">
					<Button
						text={cta?.text}
						onClick={cta?.action}
						color={cta?.color ? cta.color : accentColor}
						icon={cta?.icon ? cta?.icon : "save"}
					/>
				</div>
			</div>
			<div className="dialog-body" style={bodyStyle}>
				{children}
			</div>
		</section>
	);
};

export default Dialog;
