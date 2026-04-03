const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Expect: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN LENGTH:", token?.length);
    console.log("TOKEN START:", token?.slice(0, 20));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, role, iat, exp }
    return next();
  } catch (error) {
    console.log("JWT VERIFY ERROR:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;