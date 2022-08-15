import React, { useContext, useState } from "react";
import MaterialIcons from "../../components/MaterialIcons";
import GlobalContext from "../../Context/GlobalContext";
import { copy, imageBackgroundUrl } from "../../utils";
import NotePopup from "./NotePopup";

const Note = ({ title, content, color, image, trashed, archived, ...rest }) => {
	const { theme } = useContext(GlobalContext);
	const [openNotePopup, setOpenNotePopup] = useState(false);
	const handleCopy = (e) => {
		e?.preventDefault();
		let ans = `${title} \n${content}\n`;
		if (archived) ans += " \nNote: This Note is in owner's archives";
		if (trashed) ans += " \nNote: This Note is in owner's bin";
		copy(ans);
	};
	return (
		<div
			className="note"
			style={{
				backgroundImage:
					image >= 0 && image < 24
						? `url(${imageBackgroundUrl(image)})`
						: "none",
				backgroundBlendMode: "lighten",
				backgroundColor:
					image >= 0 && image < 24
						? "rgba(255,255,255,0.65)"
						: `var(--${color}-${
								theme === "light" ? "100" : "700"
						  })`,
			}}
			onClick={() => setOpenNotePopup(true)}
		>
			<div className="note-title">
				<span>{title}</span>
			</div>
			<div className="note-content">{content}</div>
			<div className="note-buttons">
				{!trashed ? (
					<>
						<button
							className="note-button"
							title="Background Color"
						>
							<MaterialIcons>palette</MaterialIcons>
						</button>
						<button
							onClick={handleCopy}
							className="note-button"
							title="Copy Note"
						>
							<MaterialIcons>content_copy</MaterialIcons>
						</button>
						<button className="note-button" title="Add to list">
							<MaterialIcons>playlist_add</MaterialIcons>
						</button>
						<button
							className="note-button"
							title={archived ? "Unarchive Note" : "Archive Note"}
						>
							<MaterialIcons>
								{archived ? "unarchive" : "archive"}
							</MaterialIcons>
						</button>
						<button className="note-button" title="Delete Note">
							<MaterialIcons>delete</MaterialIcons>
						</button>
					</>
				) : (
					<>
						<button className="note-button" title="Restore Note">
							<MaterialIcons>restore</MaterialIcons>
						</button>
						<button className="note-button" title="Delete forever">
							<MaterialIcons>delete_forever</MaterialIcons>
						</button>
					</>
				)}
			</div>
			{openNotePopup && (
				<NotePopup
					title={title}
					content={content}
					color={color}
					image={image}
					close={() => setOpenNotePopup(false)}
					{...rest}
				/>
			)}
		</div>
	);
};

export default Note;
