const express = require("express");
const router = express.Router();

const { createAnalysis, getPatientAnalyses } = require("../controllers/analysisController");
const protect = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// 👨‍⚕️ الدكتور يرفع تحليل لمريض معين
router.post("/analysis/:patientId", protect, upload.single("image"), createAnalysis);

// 👤 جلب تحاليل مريض
router.get("/patient/:patientId/analyses", protect, getPatientAnalyses);

module.exports = router;