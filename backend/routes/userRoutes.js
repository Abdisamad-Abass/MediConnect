const express = require("express");
const {
  loginUser,
  registerUser,
  getAllUsers,
  bookAppointment,
  getAllAppointments,
  deleteAppointment,
  updateUser,
  sendMessage,
  getMessage,
} = require("../controllers/userControllers");
const protect = require("../middleware/authMiddleware")

const router = express.Router();

// @route POST /api/users/register
// @desc Register a user
// @access  Public
router.post("/register", registerUser);

// @route POST /api/users/register
// @desc Register a user
// @access  Public
router.post("/login", loginUser);

// @route GET /api/users/all-users
// @desc GET all users
router.get("/all-users", getAllUsers);

// @route PUT /api/users/all-users/:id
// @desc PUT user update
router.put("/all-users/:id", updateUser);

// @route POST /api/users/appointments
// @desc POST appointment
router.post("/appointment", bookAppointment);
// @route GET /api/users/all-appointments
// @desc GET all appointments
router.get("/all-appointments", getAllAppointments);

// @route DELETE /api/users/appointment/:id
// @desc DELETE appointments
router.delete("/all-appointments/:id", deleteAppointment);

// @route POST /api/users/send-message
// @desc POST message
router.post("/send-message-to-admin", sendMessage);

// @route GET /api/users/receive-message by direction admin receiving the users message
// @desc GET message
router.get("/receive-message-from-user", getMessage)

module.exports = router;
