import React, { useContext, useEffect } from "react";
import Button from "../../components/Button/Button";
import MaterialIcons from "../../components/MaterialIcons";
import GlobalContext from "../../Context/GlobalContext";
import "./dialog.css";

const Dialog = ({
	title = "",
	close = () => console.log("close dialog box"),
	cta = { text: "Save", color: "indigo", action: () => console.log() },
	children,
	color = "indigo",
}) => {
	const { theme } = useContext(GlobalContext);
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
					backgroundColor: `var(--${color}-${
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
						onClick={cta?.action ? cta.action : () => console.log()}
						color={cta?.color ? cta.color : "indigo"}
					/>
				</div>
			</div>
			<div className="dialog-body">{children}</div>
		</section>
	);
};

export default Dialog;
