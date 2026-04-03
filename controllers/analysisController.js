const Analysis = require("../models/Analysis");
const User = require("../models/User");

// fake AI
function analyzeSkin() {
  const results = [
    "Acne detected",
    "Healthy skin",
    "Mild irritation",
    "Dark spots detected"
  ];

  return results[Math.floor(Math.random() * results.length)];
}

// ================= CREATE ANALYSIS =================
exports.createAnalysis = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // نتأكد إن المريض موجود
    const patient = await User.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // تحليل AI
    const aiResult = analyzeSkin();

    // إنشاء التحليل داخل ملف المريض
    const analysis = await Analysis.create({
      doctor: req.user.id,
      patient: patientId,
      imageUrl: req.file.path,
      result: aiResult
    });

    res.status(201).json({
      message: "Analysis added to patient file",
      analysis
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET PATIENT ANALYSES =================
exports.getPatientAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.find({
      patient: req.params.patientId
    });

    res.json(analyses);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};