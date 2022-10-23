import React, { useContext, useState } from "react";
import IconButton from "../../components/Button/IconButton";
import Chip from "../../components/Chip/Chip";
import MaterialIcons from "../../components/MaterialIcons";
import GlobalContext from "../../Context/GlobalContext";
import Popup from "../../Layout/Popup/Popup";
import { imageBackgroundUrl, min } from "../../utils";
import "../Notes/notes.css";
import EditList from "./EditList";

const List = ({ _id, title, description, color, poster, ...rest }) => {
	const { theme, deleteList } = useContext(GlobalContext);
	const [openListPopup, setOpenListPopup] = useState(false);
	const [openPopup, setOpenPopup] = useState(false);
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
						onClick={() => setOpenListPopup(true)}
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
				<button
					className="list-button"
					title="Delete List"
					onClick={() => setOpenPopup(true)}
				>
					<MaterialIcons>delete</MaterialIcons>
				</button>
			</div>
			{openListPopup && (
				<EditList
					title={title}
					description={description}
					color={color}
					poster={poster}
					close={() => setOpenListPopup(false)}
					_id={_id}
					{...rest}
				/>
			)}
			{openPopup && (
				<Popup
					width="50%"
					height="fit-content"
					breakpoints={{
						tab: ["60%", "fit-content"],
						mobile: ["90%", "fit-content"],
					}}
					cta={{
						text: "Delete forever",
						color: "red",
						icon: "delete",
						onClick: () => {
							deleteList(_id);
							setOpenPopup(false);
						},
					}}
					close={() => setOpenPopup(false)}
				>
					<span style={{ fontSize: "1.25rem", lineHeight: "1.5rem" }}>
						Delete list{" "}
						<Chip
							text={`${title?.slice(0, min(15, title.length))}${
								title.length > 15 ? "..." : ""
							}`}
							size="small"
							color={color}
						/>{" "}
						forever? This action can't be undone.
					</span>
					<span
						style={{
							fontSize: "0.875rem",
							lineHeight: "1.5rem",
							color: "var(--gray-500)",
						}}
					>
						<br />
						Note: Deleting a list does not delete the notes in it.
					</span>
				</Popup>
			)}
		</div>
	);
};

export default List;
