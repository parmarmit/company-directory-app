import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    //Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and Password are required",
      });
    }

    // Check Existing Admin
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    //Hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    //create Admin
    const admin = await Admin.create({
      username,
      password: hashPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Login API
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and Password are required",
      });
    }

    // Check Admin
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Invalid Username",
      });
    }

    //Compare Password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    //Generate Token
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
