import webPush from "web-push";

const subscribeForNotification = async (req, res) => {
	const { subscription, title, body } = req.body;
	const payload = JSON.stringify({
		title: title,
		body: body,
	});

	webPush
		.sendNotification(subscription, payload)
		.then(() => {})
		.catch((e) => console.log(e.stack));

	res.status(200).json({ success: true });
};

export default subscribeForNotification;
