import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { register } from "./serviceWorker";
import { subscribeUser } from "./subscription";

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("root")
);

register();
subscribeUser("Test Notification Title", "Test Notification Body");
