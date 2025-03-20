const jwt = require("jsonwebtoken");

// Middleware to restrict access based on role

exports.verifyRole = (roles) => {
  return async (req, res, next) => {
    try {
      const userId = req.person.user.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!roles.includes(req.person.user.role)) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient privileges" });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Internal server-error" });
    }
  };
};

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send("Forbidden");
    }
    req.person = decoded;

    next();
  });
};
