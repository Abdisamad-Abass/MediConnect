const Admin = require("../models/adminModels");
const Message = require("../models/messageModel")
const cloudinary = require("../config/cloudinary");

//API to add doctors
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      phone,
      role,
      fees,
      education,
      about,
    } = req.body;
    const imageFile = req.file;
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !phone ||
      !role ||
      !fees ||
      !education ||
      !about
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if doctor already exists
    const doctorExists = await Admin.findOne({ email });
    if (doctorExists) {
      return res
        .status(400)
        .json({ message: "Doctor with this email already exists" });
    }
    if (!imageFile) {
      return res.status(400).json({ message: "Profile image is required" });
    }
    //upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const newDoctor = new Admin({
      name,
      email,
      password, // (we’ll hash later)
      speciality,
      phone,
      role,
      profile: imageUrl,
      fees,
      education,
      about,
    });

    const savedDoctor = await newDoctor.save();
    return res
      .status(201)
      .json({ message: "Doctor added successfully ✅", doctor: savedDoctor });
  } catch (error) {
    console.error("Error adding doctor:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

//API to get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Admin.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// API to get doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Admin.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//API for Admin replying to user
const sendMessageToUser = async (req, res) => {
  try {
    const {content, messageType} = req.body
    if (!content) {
      return res.status(400).json({ message: "Message text is required" });
    }
    const newMessage = new Message({
      content,
      messageType: messageType || "text",
      direction: "admin-to-user",
    })
    await newMessage.save()

    res.status(201).json({ message: "message sent successfully", data: newMessage})
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }   
}

// API for the user to receive message from admin
const getMessageByUser = async (req, res) => {
  try {
    const message = await Message.find({direction: "admin-to-user"});
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json({ 
      message: "Message fetched successfully", 
      data: message 
    });
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


module.exports = { addDoctor, getAllDoctors, getDoctorById, sendMessageToUser, getMessageByUser};
