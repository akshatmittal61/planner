import axios from "axios";
import { useState } from "react";
import { omit } from "../utils";
import defaultNavLinks from "../utils/navigation";

export const useContextData = () => {
	// Axios Instance Configurations
	const axiosInstance = axios.create({
		baseURL: "http://localhost:5000/",
		headers: {
			"x-auth-token": localStorage.getItem("token"),
			"Content-Type": "application/json",
		},
	});

	// Network Status
	const [networkStatus, setNetworkStatus] = useState("offline");

	// Loading State
	const [isLoading, setIsLoading] = useState(false);

	// Snack Bar component
	const [snack, setSnack] = useState({
		text: "Snackbar Message",
		bgColor: "var(--indigo)",
		color: "var(--white)",
	});
	const [openSnackBar, setOpenSnackBar] = useState(false);

	// Global Authentication State
	const isLocalAuthenticated = localStorage.getItem("isAuthenticated");
	const [isAuthenticated, setIsAuthenticated] = useState(
		JSON.parse(isLocalAuthenticated) || false
	);

	// Global User State
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);
	const updateUser = (newUser) => {
		localStorage.removeItem("user");
		setUser(null);
		localStorage.setItem(
			"user",
			JSON.stringify(omit({ ...user, ...newUser }, "password"))
		);
		setUser((p) => ({ ...p, ...newUser }));
	};
	const verifyUser = async () => {
		try {
			setIsLoading(true);
			const res = await axiosInstance.get("/api/auth");
			setUser(res.data.user);
			localStorage.setItem("user", JSON.stringify(res.data.user));
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
			localStorage.removeItem("token");
			setUser(null);
			setIsAuthenticated(false);
		}
	};

	// Events
	const [events, setEvents] = useState([]);
	const getAllEvents = async () => {
		try {
			setIsLoading(true);
			const res = await axiosInstance.get("/api/events");
			setEvents(() => res.data.allEvents);
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};
	const addNewEvent = async (newEvent) => {
		try {
			setIsLoading(true);
			const res = await axiosInstance.post("/api/events/add", {
				...newEvent,
			});
			if (res.status === 200) {
				setEvents((prevEvents) => {
					return [...prevEvents, res.data.newEvent];
				});
				setSnack({
					text: res.data.message,
					bgColor: "var(--green)",
					color: "var(--white)",
				});
				setOpenSnackBar(true);
				setTimeout(() => {
					setOpenSnackBar(false);
				}, 5000);
				setIsLoading(false);
			}
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};
	const updateOneEvent = async (id, updatedEvent) => {
		try {
			setIsLoading(true);
			const resp = await axiosInstance.put(`/api/events/edit/${id}`, {
				...updatedEvent,
			});
			setEvents((prevEvents) => {
				let newEvents = prevEvents.map((singleEvent) =>
					singleEvent._id !== id
						? singleEvent
						: resp.data.updatedEvent
				);
				return newEvents;
			});
			setSnack({
				text: resp.data.message,
				bgColor: "var(--green)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};
	const moveEventToTrash = async (id) => {
		try {
			setIsLoading(true);
			const resp = await axiosInstance.put(`/api/events/trash/${id}`);
			setEvents((prevEvents) => {
				let newEvents = prevEvents.map((singleEvent) =>
					singleEvent._id !== id
						? singleEvent
						: resp.data.updatedEvent
				);
				return newEvents;
			});
			setSnack({
				text: resp.data.message,
				bgColor: "var(--green)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};
	const restoreEventFromTrash = async (id) => {
		try {
			setIsLoading(true);
			const resp = await axiosInstance.put(`/api/events/restore/${id}`);
			setEvents((prevEvents) => {
				let newEvents = prevEvents.map((singleEvent) =>
					singleEvent._id !== id
						? singleEvent
						: resp.data.updatedEvent
				);
				return newEvents;
			});
			setSnack({
				text: resp.data.message,
				bgColor: "var(--green)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};
	const deleteEvent = async (id) => {
		try {
			setIsLoading(true);
			const resp = await axiosInstance.delete(`/api/events/delete/${id}`);
			getAllEvents();
			setSnack({
				text: resp.data.message,
				bgColor: "var(--green)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};

	// Notes
	const [notes, setNotes] = useState([]);
	const getAllNotes = async () => {
		try {
			setIsLoading(true);
			const res = await axiosInstance.get("/api/notes");
			setNotes(() => res.data.allNotes);
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};
	const addNewNote = async (newNote) => {
		try {
			setIsLoading(true);
			const res = await axiosInstance.post("/api/notes/add", {
				...newNote,
			});
			if (res.status === 200) {
				setSnack({
					text: res.data.message,
					bgColor: "var(--green)",
					color: "var(--white)",
				});
				setNotes((prevNotes) => [...prevNotes, res.data.newNote]);
				setOpenSnackBar(true);
				setTimeout(() => {
					setOpenSnackBar(false);
				}, 5000);
				setIsLoading(false);
			}
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};
	const updateOneNote = async (id, updatedNote) => {
		try {
			setIsLoading(true);
			const resp = await axiosInstance.put(`/api/notes/edit/${id}`, {
				...updatedNote,
			});
			setNotes((prevNotes) => {
				let newNotes = prevNotes.map((singleNote) =>
					singleNote._id !== id ? singleNote : resp.data.updatedNote
				);
				return newNotes;
			});
			setSnack({
				text: resp.data.message,
				bgColor: "var(--green)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};
	const archiveNote = async (id) => {
		try {
			setIsLoading(true);
			const resp = await axiosInstance.put(`/api/notes/archive/${id}`);
			setNotes((prevNotes) => {
				let newNotes = prevNotes.map((singleNote) =>
					singleNote._id !== id ? singleNote : resp.data.updatedNote
				);
				return newNotes;
			});
			setSnack({
				text: resp.data.message,
				bgColor: "var(--green)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};
	const unArchiveNote = async (id) => {
		try {
			setIsLoading(true);
			const resp = await axiosInstance.put(`/api/notes/unarchive/${id}`);
			setNotes((prevNotes) => {
				let newNotes = prevNotes.map((singleNote) =>
					singleNote._id !== id ? singleNote : resp.data.updatedNote
				);
				return newNotes;
			});
			setSnack({
				text: resp.data.message,
				bgColor: "var(--green)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};
	const moveNoteToTrash = async (id) => {
		try {
			setIsLoading(true);
			const resp = await axiosInstance.put(`/api/notes/trash/${id}`);
			setNotes((prevNotes) => {
				let newNotes = prevNotes.map((singleNote) =>
					singleNote._id !== id ? singleNote : resp.data.updatedNote
				);
				return newNotes;
			});
			setSnack({
				text: resp.data.message,
				bgColor: "var(--green)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};
	const restoreNoteFromTrash = async (id) => {
		try {
			setIsLoading(true);
			const resp = await axiosInstance.put(`/api/notes/restore/${id}`);
			setNotes((prevNotes) => {
				let newNotes = prevNotes.map((singleNote) =>
					singleNote._id !== id ? singleNote : resp.data.updatedNote
				);
				return newNotes;
			});
			setSnack({
				text: resp.data.message,
				bgColor: "var(--green)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};
	const deleteNote = async (id) => {
		try {
			setIsLoading(true);
			const resp = await axiosInstance.delete(`/api/notes/delete/${id}`);
			getAllNotes();
			setSnack({
				text: resp.data.message,
				bgColor: "var(--green)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};

	// Tasks
	const [tasks, setTasks] = useState([]);
	const getAllTasks = async () => {
		try {
			setIsLoading(true);
			const res = await axiosInstance.get("/api/tasks");
			setTasks(() => res.data.allTasks);
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};
	const addNewTask = async (newTask) => {
		try {
			setIsLoading(true);
			const res = await axiosInstance.post("/api/tasks/add", {
				...newTask,
			});
			if (res.status === 200) {
				setSnack({
					text: res.data.message,
					bgColor: "var(--green)",
					color: "var(--white)",
				});
				setTasks((prevTasks) => [...prevTasks, res.data.newTask]);
				setOpenSnackBar(true);
				setTimeout(() => {
					setOpenSnackBar(false);
				}, 5000);
			}
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};
	const updateOneTask = async (id, updatedTask) => {
		try {
			setIsLoading(true);
			const resp = await axiosInstance.put(`/api/tasks/edit/${id}`, {
				...updatedTask,
			});
			setTasks((prevTasks) => {
				let newTasks = prevTasks.map((singleTask) =>
					singleTask._id !== id ? singleTask : resp.data.updatedTask
				);
				return newTasks;
			});
			setSnack({
				text: resp.data.message,
				bgColor: "var(--green)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};
	const markTaskAsDone = async (id) => {
		try {
			setIsLoading(true);
			const resp = await axiosInstance.put(
				`/api/tasks/mark-as-done/${id}`
			);
			setTasks((prevTasks) => {
				let newTasks = prevTasks.map((singleTask) =>
					singleTask._id !== id ? singleTask : resp.data.updatedTask
				);
				return newTasks;
			});
			setSnack({
				text: resp?.data?.message,
				bgColor: "var(--green)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};
	const markTaskAsNotDone = async (id) => {
		try {
			setIsLoading(true);
			const resp = await axiosInstance.put(
				`/api/tasks/mark-as-not-done/${id}`
			);
			setTasks((prevTasks) => {
				let newTasks = prevTasks.map((singleTask) =>
					singleTask._id !== id ? singleTask : resp.data.updatedTask
				);
				return newTasks;
			});
			setSnack({
				text: resp?.data?.message,
				bgColor: "var(--green)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};
	const moveTaskToTrash = async (id) => {
		try {
			setIsLoading(true);
			const resp = await axiosInstance.put(`/api/tasks/trash/${id}`);
			setTasks((prevTasks) => {
				let newTasks = prevTasks.map((singleTask) =>
					singleTask._id !== id ? singleTask : resp.data.updatedTask
				);
				return newTasks;
			});
			setSnack({
				text: resp.data.message,
				bgColor: "var(--green)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};

	// Side Bar
	const [openSideBar, setOpenSideBar] = useState(false);
	const [sideBarLinks, setSideBarLinks] = useState(defaultNavLinks);
	const toggleSideBar = () => {
		setOpenSideBar((p) => !p);
	};

	// Theme: light || dark
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "light"
	);
	const toggleTheme = () => {
		document.body.classList = theme === "light" ? "dark" : "light";
		localStorage.setItem("theme", theme === "light" ? "dark" : "light");
		setTheme((p) => (p === "light" ? "dark" : "light"));
	};

	// Accent Color (Featured Update)
	const [accentColor, setAccentColor] = useState("indigo");
	const handleAccentColor = (color) => {
		setAccentColor(color);
	};

	// Media Breakpoints
	const mediaQuerySm = window.matchMedia("(max-width: 672px)");
	const mediaQueryMd = window.matchMedia("(max-width: 880px)");
	const mediaQueryLg = window.matchMedia("(min-width: 880px)");
	const breakpoint = (device) => {
		if (device === "mobile") return mediaQuerySm.matches;
		else if (device === "tab") return mediaQueryMd.matches;
		else return mediaQueryLg.matches;
	};
	mediaQuerySm.addListener(breakpoint);
	mediaQueryMd.addListener(breakpoint);
	mediaQueryLg.addListener(breakpoint);

	return {
		theme,
		setTheme,
		toggleTheme,
		accentColor,
		setAccentColor,
		handleAccentColor,
		breakpoint,
		networkStatus,
		setNetworkStatus,
		isLoading,
		setIsLoading,
		snack,
		setSnack,
		openSnackBar,
		setOpenSnackBar,
		isAuthenticated,
		setIsAuthenticated,
		user,
		setUser,
		verifyUser,
		updateUser,
		openSideBar,
		setOpenSideBar,
		toggleSideBar,
		sideBarLinks,
		setSideBarLinks,
		axiosInstance,
		events,
		setEvents,
		getAllEvents,
		addNewEvent,
		updateOneEvent,
		moveEventToTrash,
		restoreEventFromTrash,
		deleteEvent,
		notes,
		setNotes,
		getAllNotes,
		addNewNote,
		updateOneNote,
		archiveNote,
		unArchiveNote,
		moveNoteToTrash,
		restoreNoteFromTrash,
		deleteNote,
		tasks,
		setTasks,
		getAllTasks,
		addNewTask,
		updateOneTask,
		markTaskAsDone,
		markTaskAsNotDone,
		moveTaskToTrash,
	};
};
