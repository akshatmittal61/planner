<p align="center">
<img src="./images/favicon-192.png" alt="Planner Home Screen" />
</p>
<h1 align="center">Planner</h1>
<p align="center">
Get more done with Planner.
Manage, capture and edit your daily events, notes and tasks.
</p>

	
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mui/material-ui/blob/HEAD/LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/5886829b-1f1f-4ddb-9e2e-991cf1f5ec07/deploy-status)](https://app.netlify.com/sites/planner/deploys)


# Introduction

Planner is a full stack web application built using MERN stack to keep a track of your activity. You can track it for every month, day, or even an hour.

-   **Runtime used for whole application** - [Node.js](https://nodejs.org/)
-   **Frontend framework** - [React JS](https://reactjs.org/)
-   **CSS preprocessor** - [SASS](https://sass-lang.com/)
-   **Backend framework** - [Express](https://expressjs.com/)
-   **Database** - [MongoDB](https://www.mongodb.com/)

# Navigation

-   **Home Page** - Planner's Home page contains links for different pages of the web app.

-   **Calendar** - Planner contains a calendar which helps us visualize the days of any month of any year, withour any year limit. Unlike other calendars, our Planner works on an algorithm.
<p align="center">
<img src="./src/images/help/0/0.png" alt="Calendar" style="width: 75%" />
</p>

-   **Events** - In the events section of this Planner, you can create, edit and delete an event. For e.g: Create an event for your best friend's birthday and keep yourself reminded on the big day.
<p align="center">
<img src="./src/images/help/1/0.png" alt="Events" style="width: 75%" />
</p>

-   **Notes** - Use Planner's notes section to record every thought that you want to track. Whether it is an article you came across on the internet or a blog that you want to save for later or a short poem that you just wrote.
<p align="center">
<img src="./src/images/help/2/0.png" alt="Noets" style="width: 75%" />
</p>

-   **Tasks** - Use Planner's tasks section to keep track of your day-to-day activities. Create a task that would remind you to buy groceries, or a task that would prepare for an early test and schedule a meeting with your colleagues.
<p align="center">
<img src="./src/images/help/3/0.png" alt="Noets" style="width: 75%" />
</p>

-   **Help** - There is a help section available in the sidebar. Visit this section to understand more about Planner.

-   **Feedback** - Any appreciation of work or a bug report or any other kind of feedback is welcome. To drop a feedback for our developers, click on the feedback/report-a-bug button in the sidebar of the app. Please be polite in any kind of feedback. 

# Themes

Planner's color palette has been synchronized and carefully chosen to provide the best user experience.

The app will switch to dark mode automatically after 8:00 PM and will switch back to light mode at 8:00 AM.

Nevertheless, the user could override this option by switching between different modes as per their convenience.

To switch between different modes, click on theme icon in the header.

-   **Light Mode**

<img src="./src/images/PlannerNav/2b.png" alt="Dark Mode" style="margin: 2rem 7rem" />

-   **Dark Mode**

<img src="./src/images/PlannerNav/2a.png" alt="Light Mode" style="margin: 2rem 7rem" />

# Local Development

- To clone copy the following command in your terminal and start development.

```sh
git clone https://github.com/akshatmittal61/planner.git
```

OR

- Fork the repo to your github account and then,

```sh
git clone https://github.com/<your-username>/planner.git
```

- cd into the directory

```sh
cd planner
```

- Install all the dependencies
```sh
npm i
```

- Run the project in development mode

```sh
npm run react
```

- Run the backend server

```sh
npm run server
```
This will run the server on port [$PORT](http://localhost:5000) locally with nodemon to continuously watch every change.

- If you don't have nodemon on your system, run
```sh
npm i nodemon -g
```

Open [localhost:3000](http://localhost:3000) or [localhost:5001](http://localhost:5001) to view it in the browser.

## Environment Variables:
Building the .env
- **MONGO_CONNECTION_URL:** Create a database in MongoDB cluster and paste the connection string in here

- **PORT:** Assign a PORT to run the backend server (usually `4000` or `5000`)
- **JWT_SECRET:** Assign a string for the JWT web token or request the [developers](#author) to provide you with the official one.
- **REACT_APP_BACKEND_URL:** Create the backend URL for which React App will send the server requests to. (depends on **PORT**) -> `http://localhost:${PORT}`

For EmailJS integration

- **REACT_APP_SERVICE:** Service ID provided by EmailJS
- **REACT_APP_TEMPLATE:** Template ID provided by EmailJS
- **REACT_APP_USER:** Public Access Token provided by EmailJS

# Contributing

Read the [contributing guide](https://github.com/akshatmittal61/Planner/blob/master/.github/CONTRIBUTING.md) to learn about our development process, how to propose bug fixes and improvements, and how to create an issue and/or raise a PR.

# License

This project is licensed under the terms of the [MIT License](https://github.com/akshatmittal61/Planner/blob/master/LICENSE)

# Author

-   [Akshat Mittal](https://akshatmittal61.vercel.app/)
-   [Sneha Sharma](https://snehasharma1111.github.io/)

## References and Libraries Used

-   [Material 3 Designs](https://m3.material.io/)
-   [Google Keep](https://keep.google.com)
-   [AOS](https://github.com/michalsnik/aos)
-   [Axios](https://axios-http.com/)
-   [Moment](https://momentjs.com/)
-   [EmailJS](https://www.emailjs.com/)
