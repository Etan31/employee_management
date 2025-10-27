// middleware/verifyAdmin.js
import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only." });
    }

    req.user = decoded; // attach user data for downstream use
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
