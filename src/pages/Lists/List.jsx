import React, { useContext } from "react";
import IconButton from "../../components/Button/IconButton";
import MaterialIcons from "../../components/MaterialIcons";
import GlobalContext from "../../Context/GlobalContext";
import { imageBackgroundUrl } from "../../utils";
import "../Notes/notes.css";

const List = ({ _id, title, description, color, poster }) => {
	const { theme } = useContext(GlobalContext);
	return (
		<div
			className="list"
			style={{
				backgroundImage:
					poster >= 0 && poster < 24
						? `url(${imageBackgroundUrl(poster)})`
						: "none",
				backgroundBlendMode: "lighten",
				backgroundColor:
					poster >= 0 && poster < 24
						? "rgba(255,255,255,0.65)"
						: `var(--${color}-${
								theme === "light" ? "100" : "700"
						  })`,
			}}
		>
			<div className="list-head">
				<span className="list-title list-head-title">{title}</span>
				<div className="list-title list-head-buttons">
					<IconButton
						className="list-header-link"
						fill={`var(--${color}-${
							theme === "light" ? "400" : "100"
						})`}
						style={{
							color: "var(--black)",
						}}
						icon="edit"
						link={`/notes/list/${_id}`}
					/>
					<IconButton
						className="list-header-link"
						fill={`var(--${color}-${
							theme === "light" ? "400" : "100"
						})`}
						style={{
							color: "var(--black)",
						}}
						icon="north_east"
						link={`/notes/list/${_id}`}
					/>
				</div>
			</div>
			{description && <div className="list-content">{description}</div>}
			<div className="list-buttons">
				<button className="list-button" title="Background Color">
					<MaterialIcons>palette</MaterialIcons>
				</button>
				<button className="list-button" title="Background Image">
					<MaterialIcons>image</MaterialIcons>
				</button>
				<button className="list-button" title="Delete List">
					<MaterialIcons>delete</MaterialIcons>
				</button>
			</div>
		</div>
	);
};

export default List;
