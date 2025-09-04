const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Appointment = require("../models/appointmentModel");
const Message = require("../models/messageModel")

//API to register user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    // Check if user already exists
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(201).json({
      message: "User registered successfully!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//API to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
//API to Update User
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
//API to book Appointemnt
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, doctorName, date, time } = req.body;

    if (!doctorId || !doctorName || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if doctor is already booked for the same date and time
    const existingAppointment = await Appointment.findOne({
      doctorId,
      time,
      date,
    });
    if (existingAppointment) {
      return res
        .status(400)
        .json({ message: "Doctor is already booked for this time slot" });
    }
    //save to database
    const newAppointment = new Appointment({
      doctorId,
      doctorName,
      time,
      date,
      status: "pending",
    });
    await newAppointment.save();
    res
      .status(200)
      .json({ message: "Appointment booked Successfully", newAppointment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server errorr" });
  }
};
//Api to get appointments booked
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
//API to delete appointment
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res
      .status(200)
      .json({ message: "Appointment Deleted Successfully ", appointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//API for user sending message to admin
const sendMessage = async (req, res) => {
  try {
    const {content, messageType} = req.body
    if (!content) {
      return res.status(400).json({ message: "Message content is required" });
    }
    const newMessage = new Message({
      content: content,
      messageType: messageType || "text",
      direction: "user-to-admin"
    })
    await newMessage.save()

    res.status(201).json({ message: "message sent successfully", data: newMessage})
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
    
}

//API for admin receiving the users message
const getMessage = async (req, res) => {
  try {
    const message = await Message.find({direction: "user-to-admin"})
    if(!message) {
      return res.status(404).json({ message: "No Messages found"})
    }
    res.status(200).json({ message: "Message fetched successfully", data: message });
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  bookAppointment,
  getAllAppointments,
  deleteAppointment,
  updateUser,
  sendMessage,
  getMessage
};
