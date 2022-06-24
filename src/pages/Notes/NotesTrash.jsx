import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../Context/GlobalContext";
import Masonry, { MasonryBox } from "../../Layout/Masonry/Masonry";
import Note from "./Note";
import { notesNavLinks } from "./Notes";

const NotesTrash = () => {
	const [notes, setNotes] = useState([
		{
			title: "Google I/O",
			content:
				"Google I/O is back May 18-20, online, and free for everyone. Join us live.  I/O is live keynotes, hands-on learning with Google experts, and a first look at the latest developer products.  Make sure to check back for more updates! ",
			linkURL: "https://g.co/io",
			linkText: "Google I/O keynote",
			color: "blue",
			trashed: false,
			archived: false,
		},
		{
			title: "SVG illustrations",
			content: "Free SVGs illustrations for lot of purposes ",
			linkURL: "https://undraw.co",
			linkText: "",
			color: "purple",
			trashed: false,
			archived: false,
		},
		{
			title: "Ian #brothersbondbourbon",
			content:
				"Ian Somerhalder's video with brotherbonbourbon.' I know you're obsessed with me ",
			linkURL: "https://www.youtube.com/watch?v=w0l9gvzwCAE",
			linkText: "YTube I know you're obsessed with me",
			color: "green",
			trashed: false,
			archived: false,
		},
		{
			title: "Bugs",
			content:
				"Notes: You can't multiple lines in a note yet For multiple lines in note.content, array of strings has been used But through direct 'Add a note' dialog box, you can't add multiple lines yet ",
			linkURL: "",
			linkText: "",
			color: "indigo",
			trashed: false,
			archived: true,
		},
		{
			title: "Elijah",
			content: "Family is Power, Niklaus. ",
			linkURL: "https://www.netflix.com/in/title/70283261",
			linkText: "The Originals",
			color: "dark-purple",
			trashed: false,
			archived: false,
		},
		{
			title: "Klaus",
			content: "Read the poem The Poison Apple. ",
			linkURL: "https://www.netflix.com/in/title/70283261",
			linkText: "The Originals",
			color: "dark-purple",
			trashed: false,
			archived: false,
		},
		{
			title: "Delegation",
			content:
				"Q. How many programmers does it take to change a light bulb?  A. None – It’s a hardware problem ",
			linkURL: "",
			linkText: "",
			color: "",
			trashed: true,
			archived: false,
		},
		{
			title: "The Originals",
			content:
				"I was never naive enough to think that I was your light, but there is light in you. All that anger, the cycle of abuse that Mikael began, you can end it. You have to, so you can be the light for your little girl. For Hope. — Cami to Klaus in No More Heartbreaks ",
			linkURL:
				"https://vampirediaries.fandom.com/wiki/Camille_O%27Connell",
			linkText: "Camille O' Connell",
			color: "pink",
			trashed: false,
			archived: false,
		},
		{
			title: "Rise of Flutter",
			content:
				"Is flutter going to kill Native Android? It already is known fact, flutter can be used for cross platform app development Meanwhile Google has came up with the solution of independence from JVMs. ",
			linkURL: "https://www.instagram.com/p/CUB3uVNFczN/",
			linkText: "The Flutter Way",
			color: "blue",
			trashed: false,
			archived: false,
		},
		{
			title: "Loops",
			content:
				"How to keep a programmer in the shower forever.  Show him the shampoo bottle instructions: Lather. Rinse. Repeat. ",
			linkURL: "",
			linkText: "",
			color: "light-green",
			trashed: true,
			archived: false,
		},
		{
			title: "Klaus",
			content: "You've heard of me.  Fantastic! ",
			linkURL: "https://www.netflix.com/in/title/70283261",
			linkText: "The Originals",
			color: "dark-purple",
			trashed: false,
			archived: false,
		},
		{
			title: "Arrays",
			content:
				"Q. Why did the programmer quit his job?  A. Because he didn't get arrays. ",
			linkURL: "",
			linkText: "",
			color: "",
			trashed: true,
			archived: false,
		},
		{
			title: "'Coz I kept quiet that day",
			content:
				"From the glimpses of the past By the glitters of today For the glimmers of tomorrow People come n go n stay  But it opened my eyes When I remembered that day That's why I kept quiet I kept quiet today ",
			linkURL: "https://youtu.be/BIeayNW3Or8",
			linkText: "Listen to one of my poems",
			color: "pink",
			trashed: true,
			archived: false,
		},
		{
			title: "Hardware vs. Software",
			content:
				"What's the difference between hardware and software?  You can hit your hardware with a hammer, but you can only curse at your software. ",
			linkURL: "",
			linkText: "",
			color: "",
			trashed: true,
			archived: false,
		},
		{
			title: "Stefan",
			content: "Whenever you are ready for me, I'll be ready for you ",
			linkURL: "https://www.netflix.com/in/title/70143860",
			linkText: "The Vampire Diaries",
			color: "red",
			trashed: false,
			archived: false,
		},
		{
			title: "Tic Tac Toe by react",
			content:
				"I completed a game of Tic Tac Toe in React. Click below to play the game. ",
			linkURL: "https://akshatmittal61.github.io/tic-tac-toe",
			linkText: "Tic Tac Toe",
			color: "indigo",
			trashed: true,
			archived: false,
		},
		{
			title: "Damon",
			content:
				"If your are gonna be bad, be bad with purpose.  Otherwise you're not just forgiving. ",
			linkURL: "https://www.netflix.com/in/title/70143860",
			linkText: "The Vampire Diaries",
			color: "cyan",
			trashed: false,
			archived: false,
		},
		{
			title: "Modern Portfolio",
			content:
				"I finished a simple HTML + CSS (SASS) project: Modern Portfolio. It was a simple project series at Brad Traversery on youtube. Might delete later ",
			linkURL: "https://akshatmittal61.github.io/modern_portfolio",
			linkText: "",
			color: "brown",
			trashed: true,
			archived: false,
		},
		{
			title: "Ross & Rachel",
			content:
				"Rachel: Do you think it's easy for me to see you with somebody else?  Ross: Hey you were the one who ended it, remember ?  Rachel: Yes because I was mad at you. Not because I stopped loving you. ",
			linkURL: "https://www.netflix.com/in/title/70153404",
			linkText: "FRIENDS",
			color: "pink",
			trashed: false,
			archived: false,
		},
		{
			title: "Whack A Mole",
			content: "I have completed my Whack A Mole game ",
			linkURL: "https://akshatmittal61.github.io/Whack-A-Mole",
			linkText: "Whack A Mole",
			color: "orange",
			trashed: false,
			archived: true,
		},
		{
			title: "Random lorem ipsum for long note test",
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit.  Deserunt fugiat neque non esse minus quis ab recusandae, ratione culpa nemo veniam aperiam enim alias! Eligendi laboriosam nemo labore atque deserunt! Voluptas ipsam molestias autem modi obcaecati vel quaerat possimus ipsa ipsum eligendi! Numquam similique, dolorum hic, provident dolorem sit cum veniam pariatur iusto aspernatur sunt perferendis nisi, totam minus aperiam? Rem natus, explicabo aut nesciunt enim adipisci debitis unde.  Quasi, reiciendis provident aut, ullam neque ea obcaecati, soluta corporis error iure placeat quos? Reprehenderit harum aspernatur ullam error similique impedit! Quod quisquam quidem explicabo, porro similique cupiditate vero amet tempora dolore.  Labore voluptate quibusdam, commodi fugiat hic perferendis laboriosam, vero quis cum blanditiis ab dolor consectetur excepturi necessitatibus magnam deserunt! Distinctio iste delectus, repellat vel libero, ut sapiente pariatur tempora dolore modi sunt? Dolore asperiores quam soluta laudantium at, eligendi, quas repudiandae aliquam veritatis tempore nobis iste? Vel, odio distinctio.  Nobis ipsam qui corrupti excepturi saepe maxime labore magnam sapiente nisi reprehenderit, similique architecto corporis laudantium ipsa expedita voluptate dolorem accusamus, quasi ut nemo neque error odio.  Modi, voluptatum magnam? Repellendus earum nostrum voluptatibus optio explicabo molestias cupiditate repudiandae magnam iure tenetur asperiores sit cumque ad eum voluptates quo nemo quidem natus doloribus consequatur temporibus, tempore distinctio pariatur.  Ipsam, corrupti.  Voluptatibus voluptates quae architecto? Omnis consequatur laboriosam deleniti doloremque fugit eos, cum hic ipsam eveniet est dolore, et eaque ea debitis.  Nisi asperiores ab nostrum voluptatum eveniet mollitia a ipsum! Nulla ad at praesentium quam amet quasi voluptates iste quia laborum, aliquid totam repellat exercitationem eligendi, neque incidunt numquam! Et nobis tempora architecto doloribus neque.  Ipsum ab laboriosam illum expedita.  Dicta reprehenderit, sed dolorum nisi illo, magnam suscipit nobis autem quia officia minima ratione quod quo modi recusandae? Iste nihil quam ut unde doloremque minima laboriosam est quis, enim quisquam? ",
			linkURL: "",
			linkText: "",
			color: "",
			trashed: false,
			archived: false,
		},
		{
			title: "Color 1",
			content: "Color Test 1 ",
			linkURL:
				"https://mui.com/customization/palette/#heading-palette-colors",
			linkText: "Material Colors",
			color: "bgcolor",
			trashed: true,
			archived: false,
		},
		{
			title: "Eva",
			content:
				"Isn't it funny ? The people who we despise the most,  Are the people who are most like us ",
			linkURL: "https://www.netflix.com/in/title/80100172",
			linkText: "Dark | Netflix",
			color: "dark-purple",
			trashed: false,
			archived: false,
		},
	]);
	const { setSideBarLinks } = useContext(GlobalContext);
	useEffect(() => {
		setSideBarLinks(notesNavLinks);
	}, []);
	return (
		<main className="notes">
			<section className="notes-body">
				<Masonry>
					{notes.map(
						(note, index) =>
							note.trashed && (
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

export default NotesTrash;
