const Admin = require("../models/Admin");
const { comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await comparePassword(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken({
    id: admin._id,
    email: admin.email,
  });

  res.json({
    token,
    admin: {
      id: admin._id,
      email: admin.email,
      name: admin.name,
    },
  });
};
