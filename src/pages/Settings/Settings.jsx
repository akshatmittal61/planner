import React, { useContext } from "react";
import GlobalContext from "../../Context/GlobalContext";
import "./settings.css";

const Settings = () => {
	const accentColors = [
		"indigo",
		"blue",
		"red",
		"green",
		"pink",
		"brown",
		"orange",
	];
	const { accentColor, handleAccentColor } = useContext(GlobalContext);
	return (
		<main className="settings">
			<section className="settings-head">
				<h1>Settings</h1>
			</section>
			<section className="settings-body">
				<div className="settings-body-theme">
					<h3>Theme</h3>
					<div className="settings-body-theme-colors row">
						{accentColors.map((color, id) => (
							<button
								key={id}
								style={{
									backgroundColor: `var(--${color})`,
									outline: `6px solid var(--${
										accentColor === color
											? color + "-100"
											: "transparent"
									})`,
								}}
								onClick={(e) => {
									e?.preventDefault();
									handleAccentColor(color);
								}}
							></button>
						))}
					</div>
				</div>
			</section>
		</main>
	);
};

export default Settings;
