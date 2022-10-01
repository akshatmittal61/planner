# Contribution Guidelines

Loving Planner, and want to be a part of team?

Please take a moment to review this document in order to make the contribution process straightforward and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. 
In return, they should reciprocate that respect in addressing your issue or assessing patches and features.

## Submitting a Pull Request

Good pull requests, such as bug fixes, interface improvements, adding new features etc are a fantastic help.

## Directory Structure of Planner

**Frontend**: 
```
public/
  images/
  index.html
  
src/
  components/
  context/
  fonts/
  images/
  layout/
  pages/
  utils/
  index.js
  App.jsx
  routes.js
  style.scss
```

**Backend**: 
```
config/
controllers/
db/
helpers/
middleware/
models/
routes/
server.mjs
```

## Local Development

Fork the repository to your own GitHub Profile

After that, follow the steps below: 

1. Clone the forked repository
2. Enter into the directory
3. Install all the dependencies
4. Run the react dev server
5. Run the backend server

## Environment Variables:

Building the .env

- **MONGO_CONNECTION_URL:** Create a database in MongoDB cluster and paste the connection string in here
- **PORT:** Assign a PORT to run the backend server (usually `4000` or `5000`)
- **JWT_SECRET:** Assign a string for the JWT web token or request the [developers](https://github.com/akshatmittal61/Planner/blob/master/README.md#author) to provide you with the official one.
- **REACT_APP_BACKEND_URL:** Create the backend URL for which React App will send the server requests to.

Please ensure that your pull request adheres to the following guidelines:

- Search previous suggestions before making a new one, as yours may be a duplicate.
- Make sure your contribution is useful and relevant before submitting. That implies it has enough content and every item has a good succinct description.
- Make an individual pull request for each suggestion.
- The pull request and commit should be given a meaningful title.
- Ensure that you describe your pull request.

Thank you for your suggestions!
