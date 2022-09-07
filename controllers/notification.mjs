import webPush from "web-push";

const subscribeForNotification = async (req, res) => {
	const subscription = req.body;
	console.log(subscription);

	const payload = JSON.stringify({
		title: "Hello!",
		body: "It works.",
	});

	webPush
		.sendNotification(subscription, payload)
		.then((result) => console.log(result))
		.catch((e) => console.log(e.stack));

	res.status(200).json({ success: true });
};

export default subscribeForNotification;
