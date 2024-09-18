//patient.routes.js
const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient.controller");
const app = express(); // Define app here;

router.post("/", patientController.addPatient);
router.get("/top-patients", patientController.getTopPatients);
router.get("/search", patientController.searchPatients);
router.get("/filter", patientController.filterPatients);
// Add this route for fetching a single patient by ID
router.get("/:id", patientController.getPatientById);
router.get("/", patientController.getAllPatients);
router.put("/:id", patientController.updatePatient);
router.delete("/:id", patientController.deletePatient);
module.exports = router;
