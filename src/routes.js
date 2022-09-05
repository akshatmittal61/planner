import {
	calendarPoster,
	eventsPoster,
	notesPoster,
	tasksPoster,
} from "./utils/images";

const routes = [
	{
		title: "Calendar",
		about: "Switch to any month and year seamlessly. View all your events and tasks on calendar for easy access.",
		route: "/calendar",
		poster: calendarPoster,
		color: "blue",
		navTitle: "View your calendar",
		icon: "calendar_month",
	},
	{
		title: "Events",
		about: "Never miss out on all your events, birthdays, meetings and festivals with Planner events.",
		route: "/events",
		poster: eventsPoster,
		color: "orange",
		navTitle: "View your events",
		icon: "event",
	},
	{
		title: "Notes",
		about: "Create, edit, share your everyday thoughts with planner notes.",
		route: "/notes",
		poster: notesPoster,
		color: "green",
		navTitle: "View your notes",
		icon: "note",
	},
	{
		title: "Tasks",
		about: "Manage all your tasks and keep yourself updated and productive throughout the day with planner.",
		route: "/tasks",
		poster: tasksPoster,
		color: "indigo",
		navTitle: "View your tasks",
		icon: "task_alt",
	},
];

export default routes;
