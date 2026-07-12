const { User } = require("../Models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const CreateUser = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const createUser = await User.create({
      name,
      email,
      phone,
      password: hashedpassword,
    });

    const token = jwt.sign(
      {
        id: createUser.id,
        email: createUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      data: {
        id: createUser.id,
        name: createUser.name,
        email: createUser.email,
        password: createUser.password,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const ListUser = async (req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json({
      success: true,
      message: "List users successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, password } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name;
    user.email = email;
    user.phone = phone;
    if (password) {
      const hashpassword = await bcrypt.hash(password, 10);
      user.password = hashpassword;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: `${name} is update successfully.`,
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    await user.destroy();

    res.status(200).json({
      success: true,
      message: `User have id (${id}) delete successfully`,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({
        message: "Password incorrect",
      });
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );


    return res.status(200).json({
      success: true,
      token : token,
      message: "login successfully."
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  CreateUser,
  ListUser,
  UpdateUser,
  DeleteUser,
  UserLogin
};
