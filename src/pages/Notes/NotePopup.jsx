import React, { useState } from "react";
import Popup from "../../Layout/Popup/Popup";

const NotePopup = ({ close, title, content, color, image }) => {
	const [edit, setEdit] = useState(false);
	const [currNote, setCurrNote] = useState({ title, content, color, image });
	const handleChange = (e) => {
		const { name, value } = e.target;
		setCurrNote((p) => ({ ...p, [name]: value }));
	};
	const handleSubmit = () => {
		console.log(currNote);
	};
	return (
		<Popup
			close={close}
			title={currNote.title}
			height="fit-content"
			cta={{
				text: edit ? "Save Changes" : "Edit Note",
				icon: edit ? "save" : "edit",
				onClick: () => {
					if (edit) handleSubmit();
					setEdit((p) => !p);
				},
			}}
		>
			<div className="note-popup" style={{ margin: "1rem 0" }}></div>
		</Popup>
	);
};

export default NotePopup;
