import User from "../models/User.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/index.mjs";

const register = async (req, res) => {
	const { fname, lname, email, username, password } = req.body;
	if (!fname || !lname || !email || !password || !username)
		return res.status(400).json({ message: "Invalid Data" });
	if (password.length < 6)
		return res.status(400).json({
			message: "Password should be a minimum of 6 characters",
		});
	try {
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: "User already registered" });
		}
		user = new User({ fname, lname, email, password, username });
		user.password = await bcrypt.hash(password, 10);
		await user.save();
		const payload = {
			user: {
				id: user.id,
			},
		};
		jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
			if (err) throw err;
			return res.status(200).json({
				token: token,
				message: "User registered. Login to continue",
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server Error" });
	}
};

export { register };
