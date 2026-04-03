const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, doctorCode } = req.body;

    let user;

    // 👨‍⚕️ Doctor
    if (role === "doctor") {
      user = await User.create({
        name,
        email,
        password,
        role: "doctor"
      });
    }

    // 👤 Patient
    else {
      let doctor = null;

      // لو فيه كود دكتور
      if (doctorCode) {
        doctor = await User.findOne({ doctorCode });

        if (!doctor) {
          return res.status(400).json({
            message: "Invalid doctor code"
          });
        }
      }

      user = await User.create({
        name,
        email,
        password,
        role: "patient",
        doctor: doctor ? doctor._id : null
      });
    }

    const token = generateToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // مقارنة الباسورد (بسيطة حالياً)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};