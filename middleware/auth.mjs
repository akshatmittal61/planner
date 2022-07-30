import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/index.mjs";

const auth = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token)
		return res
			.status(401)
			.json({ message: "No Token. Authorization denied" });
	try {
		const decoded = jwt.verify(token, jwtSecret);
		req.user = decoded.user;
		next();
	} catch (err) {
		console.log(err);
		res.status(401).json({ message: "Token is not valid" });
	}
};

export default auth;
