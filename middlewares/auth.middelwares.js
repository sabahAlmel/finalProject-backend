import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(403).send("Forbidden");
    } else {
      const decoded = jwt.verify(token, process.env.TOKEN);
      req.user = decoded;
      next();
    }
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ success: false, message: message });
  }
};

export { authenticate };
