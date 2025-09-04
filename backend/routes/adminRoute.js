const express = require("express");
const {
  addDoctor,
  getAllDoctors,
  getDoctorById,
  sendMessageToUser,
  getMessageByUser,
} = require("../controllers/adminController");
const upload = require("../middleware/multer");
const { sendMessage } = require("../controllers/userControllers");
const router = express.Router();

// @route to add doctor /api/admin/add-doctor
router.post("/add-doctor", upload.single("profile"), addDoctor);

// @route to get all doctors /api/admin/doctors
router.get("/doctors", getAllDoctors);
// @route to get one doctors /api/admin/doctors/:id by id
router.get("/doctors/:id", getDoctorById);

// @route POST /api/admin/send-message
// @desc POST message
router.post("/send-message-to-user", sendMessageToUser);

// @route GET /api/admin/sent-message/:id
// @desc GET message
router.get("/receive-message-from-admin", getMessageByUser)
module.exports = router;
