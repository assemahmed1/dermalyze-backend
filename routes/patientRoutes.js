const express = require("express");
const router = express.Router();

const {
  createPatient,
  getPatients,
  getPatientById,
  updatePatientStatus,
} = require("../controllers/patientController");

// ✅ هنا الحل
const protect = require("../middlewares/authMiddleware");

// routes
router.post("/patients", protect, createPatient);
router.get("/patients", protect, getPatients);
router.get("/patients/:id", protect, getPatientById);
router.put("/patients/:id/status", protect, updatePatientStatus);

module.exports = router;