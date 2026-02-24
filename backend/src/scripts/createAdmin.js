const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("../models/Admin");
const { hashPassword } = require("../utils/password");

dotenv.config();

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const password = await hashPassword("Roman@Brenda$111");

  await Admin.create({
    name: "Brenda Admin",
    email: "admin@romanbrendaviola.com",
    password,
  });

  console.log("Admin created");
  process.exit();
})();
