import React, { useContext, useEffect } from "react";
import Empty from "../../components/Empty/Empty";
import GlobalContext from "../../Context/GlobalContext";
import Masonry, { MasonryBox } from "../../Layout/Masonry/Masonry";
import { nullTrash } from "../../utils/images";
import { notesNavLinks } from "../../utils/navigation";
import Note from "./Note";
import "./notes.css";

const NotesTrash = () => {
	const { setSideBarLinks, notes } = useContext(GlobalContext);
	useEffect(() => {
		setSideBarLinks(notesNavLinks);
	}, [setSideBarLinks]);
	return (
		<main className="notes">
			<section className="notes-body">
				{notes.some((p) => p.trashed) ? (
					<Masonry>
						{notes.map(
							(note, index) =>
								note.trashed && (
									<MasonryBox key={index}>
										<Note {...note} />
									</MasonryBox>
								)
						)}
					</Masonry>
				) : (
					<Empty
						img={nullTrash}
						text={
							<>
								<h3
									style={{
										fontSize: "3rem",
										lineHeight: "4rem",
										margin: "0 0 1rem 0",
									}}
								>
									Bin is Empty
								</h3>
								<span
									style={{
										fontSize: "2rem",
										lineHeight: "3rem",
									}}
								>
									Items in bin will be deleted forever after
									30 days
								</span>
							</>
						}
					/>
				)}
			</section>
		</main>
	);
};

export default NotesTrash;
