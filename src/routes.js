import calendarPoster from "./images/posters/calendar-poster.jpg";
import eventsPoster from "./images/posters/events-poster.jpg";
import notesPoster from "./images/posters/notes-poster.jpg";
import tasksPoster from "./images/posters/tasks-poster.webp";

const routes = [
	{
		title: "Calendar",
		about: "Switch to any month and year seamlessly. View all your events and tasks on calendar for easy access.",
		route: "/calendar",
		poster: calendarPoster,
		color: "var(--blue-100)",
		navTitle: "View your calendar",
	},
	{
		title: "Events",
		about: "Never miss out on all your events, birthdays, meetings and festivals with Planner events.",
		route: "/events",
		poster: eventsPoster,
		color: "var(--orange-100)",
		navTitle: "View your events",
	},
	{
		title: "Notes",
		about: "Create, edit, share your everyday thoughts with planner notes.",
		route: "/notes",
		poster: notesPoster,
		color: "var(--green-100)",
		navTitle: "View your notes",
	},
	{
		title: "Tasks",
		about: "Manage all your tasks and keep yourself updated and productive throughout the day with planner.",
		route: "/tasks",
		poster: tasksPoster,
		color: "var(--indigo-100)",
		navTitle: "View your tasks",
	},
];

export default routes;
