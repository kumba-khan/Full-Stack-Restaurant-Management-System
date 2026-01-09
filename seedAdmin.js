import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const admins = [
  {
    name: "Kumba Khan",
    email: "kumbakhan@gmail.com",
    password: "superAdmin1",
  },
  //   {
  //     name: "Co-Admin",
  //     email: "coadmin@example.com",
  //     password: "AnotherStrongPass2@",
  //   },
  //   {
  //     name: "Third Admin",
  //     email: "thirdadmin@example.com",
  //     password: "ThirdPass3#",
  //   },
];

const seedAdmins = async () => {
  for (const admin of admins) {
    const exists = await User.findOne({ email: admin.email });
    if (!exists) {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      await User.create({
        name: admin.name,
        email: admin.email,
        password: hashedPassword,
        role: "admin",
      });
      console.log(`Admin created: ${admin.email}`);
    } else {
      console.log(`Admin already exists: ${admin.email}`);
    }
  }
  process.exit();
};

seedAdmins();
