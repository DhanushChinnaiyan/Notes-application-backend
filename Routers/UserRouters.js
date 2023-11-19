const express = require("express");
const bcrypt = require("bcrypt");
const { User, genToken } = require("../Model/UserModel.js");

const router = express.Router();

// Signup router
router.post("/signup/:details", async (req, res) => {
  try {
    const { name, email, password } = JSON.parse(req.params.details);
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: "You missed to give name or email or password" });

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exist" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!newUser)
      return res.status(400).json({ message: "User failed to register" });

    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Signup error ", error);
    return res.status(500).json({ messsage: "Internal Server Error" });
  }
});

// Login router
router.post("/login/:details", async (req, res) => {
  try {
    const { email, password } = JSON.parse(req.params.details);
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "You missed to give email or password" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User email or password are wrong" });

    const hashedPassword = await bcrypt.compare(password, user.password);

    if (!hashedPassword)
      return res.status(400).json({ message: "User email or password are wrong" });

    const token = genToken(user._id);
    return res
      .status(200)
      .json({ message: "User logined successfully", token });
  } catch (error) {
    console.log("Signup error ", error);
    return res.status(500).json({ messsage: "Internal Server Error" });
  }
});

module.exports = router;
