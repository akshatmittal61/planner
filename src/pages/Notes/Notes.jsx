import React, { useState } from "react";
import IconButton from "../../components/Button/IconButton";
import MaterialIcons from "../../components/MaterialIcons";
import Note from "./Note";
import "./notes.css";

const Notes = () => {
	const [notes, setNotes] = useState([]);
	return (
		<main className="notes">
			<section className="notes-body">
				{notes.map((note, index) => (
					<Note
						key={index}
						title={note.title}
						content={note.content}
                        trashed={note.trashed}
                        arhcived={note.arhcived}
					/>
				))}
			</section>
		</main>
	);
};

export default Notes;
