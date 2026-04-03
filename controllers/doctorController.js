const User = require("../models/User");
const Analysis = require("../models/Analysis");


// ربط المريض بالدكتور
exports.linkDoctor = async (req, res) => {
  try {

    const { doctorCode } = req.body;

    const doctor = await User.findOne({
      doctorCode,
      role: "doctor"
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found"
      });
    }

    const patient = await User.findByIdAndUpdate(
      req.user.id,
      { doctor: doctor._id },
      { new: true }
    );

    res.json({
      message: "Doctor linked successfully",
      doctor: doctor.name
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// الدكتور يشوف المرضى
exports.getPatients = async (req, res) => {

  try {

    const patients = await User.find({
      doctor: req.user.id,
      role: "patient"
    }).select("name email");

    res.json(patients);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// الدكتور يشوف تحاليل المريض
exports.getPatientAnalyses = async (req, res) => {

  try {

    const { id } = req.params;

    const analyses = await Analysis.find({
      user: id
    }).sort({ createdAt: -1 });

    res.json(analyses);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};