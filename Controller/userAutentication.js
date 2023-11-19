const jwt = require("jsonwebtoken");

const userAuthentication = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-user"];
    if (!token) {
      return res.status(400).json({ message: "Token not provided" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized access" });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    console.log("user authorization error ",error)
    return res.status(500).json({ message: "Internal server error" })
  }
};

module.exports = userAuthentication
