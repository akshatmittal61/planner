/* eslint-disable no-restricted-globals */
self.addEventListener("push", (event) => {
	let eventData = event.data;
	let data = eventData.json();
	const options = {
		body: data.body,
	};
	event.waitUntil(self.registration.showNotification(data.title, options));
});
