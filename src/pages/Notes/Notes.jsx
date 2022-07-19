import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../Context/GlobalContext";
import Masonry, { MasonryBox } from "../../Layout/Masonry/Masonry";
import { notesNavLinks } from "../../navigation";
import { allNotes } from "../../resources";
import Note from "./Note";
import "./notes.css";

const Notes = () => {
	const [notes, setNotes] = useState([]);
	const { setSideBarLinks } = useContext(GlobalContext);
	useEffect(() => {
		setSideBarLinks(notesNavLinks);
		window.scrollTo(0, 0);
		setNotes(allNotes);
	}, [setSideBarLinks]);

	return (
		<main className="notes">
			<section className="notes-body">
				<Masonry>
					{notes.map(
						(note, index) =>
							!note.archived &&
							!note.trashed && (
								<MasonryBox key={index}>
									<Note
										key={index}
										title={note.title}
										color={note.color}
										content={note.content}
										trashed={note.trashed}
										archived={note.archived}
									/>
								</MasonryBox>
							)
					)}
				</Masonry>
			</section>
		</main>
	);
};

export default Notes;
