import React, { useContext, useEffect } from "react";
import Button from "../../components/Button/Button";
import MaterialIcons from "../../components/MaterialIcons";
import GlobalContext from "../../Context/GlobalContext";
import "./popup.css";

const PopupCTA = ({ ...rest }) => <Button className=" popup-cta" {...rest} />;

const Popup = ({
	title = "",
	close = () => {},
	children,
	width = "60%",
	height = "60%",
	breakpoints = {
		tab: ["70%", "70%"],
		mobile: ["85%", "70%"],
	},
	cta,
}) => {
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
	const { breakpoint } = useContext(GlobalContext);
	return (
		<section className="popup">
			<div
				className="popup-box"
				style={
					breakpoint("mobile")
						? {
								width: breakpoints.mobile[0],
								height: breakpoints.mobile[1],
						  }
						: breakpoint("tab")
						? {
								width: breakpoints.tab[0],
								height: breakpoints.tab[1],
						  }
						: {
								width: width,
								height: height,
						  }
				}
				data-aos="zoom-in"
			>
				<div className="popup-head">
					<div className="popup-head-left">
						<span className="popup-head__title">
							{title !== "" && title}
						</span>
					</div>
					<div className="popup-head-right">
						<button className="icon" onClick={close}>
							<MaterialIcons>close</MaterialIcons>
						</button>
					</div>
				</div>
				<div className="popup-body">{children}</div>
				<div className="popup-foot">{cta && <PopupCTA {...cta} />}</div>
			</div>
		</section>
	);
};

export default Popup;
export { PopupCTA };
