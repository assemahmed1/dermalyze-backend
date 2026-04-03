const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");

const doctorController = require("../controllers/doctorController");

router.post("/link-doctor", auth, doctorController.linkDoctor);

router.get("/doctor/patients", auth, doctorController.getPatients);

router.get("/doctor/patient/:id/analyses", auth, doctorController.getPatientAnalyses);

module.exports = router;