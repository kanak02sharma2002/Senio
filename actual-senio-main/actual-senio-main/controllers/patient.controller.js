//patient.controller.js

const Patient = require("../models/patient.model");

exports.addPatient = async (req, res, next) => {
  try {
    const {
      name,
      age,
      gender,
      condition,
      severity,
      BMI,
      systolic,
      diastolic,
      cholestrol,
      diabetes,
      smoked,
      paratype,
      dseverity,
    } = req.body;
    const patient = new Patient({
      name,
      age,
      gender,
      condition,
      severity,
      BMI,
      systolic,
      diastolic,
      cholestrol,
      diabetes,
      smoked,
      paratype,
      dseverity,
    });
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    next(error);
  }
};

// Get top 10 patients based on ranking score (severity and age)
exports.getTopPatients = async (req, res, next) => {
  try {
    console.log("Fetching top patients...");
    // Fetch all patients
    const patients = await Patient.find();
    console.log("Fetched patients:", patients);

    // Calculate ranking score for each patient
    const rankedPatients = patients.map((patient) => ({
      ...patient.toObject(),
      rankingScore: calculateRankingScore(patient),
    }));

    // Sort patients by ranking score in descending order
    rankedPatients.sort((a, b) => b.rankingScore - a.rankingScore);

    // Get top 10 patients
    const topPatients = rankedPatients.slice(0, 10);

    res.status(200).json(topPatients);
  } catch (error) {
    console.error("Error fetching top patients:", error);
    next(error);
  }
};
// Function to calculate ranking score based on severity and age
function calculateRankingScore(patient) {
  // Assign score based on severity level (Red > Orange > Yellow)
  let severityScore;
  switch (patient.severity) {
    case "red":
      severityScore = 3;
      break;
    case "orange":
      severityScore = 2;
      break;
    case "yellow":
      severityScore = 1;
      break;
    default:
      severityScore = 0;
  }

  // Calculate ranking score based on severity and age
  return severityScore * 1000 + patient.age;
}

// Get top 10 patients based on ranking score (severity and age)
exports.getTopPatients = async (req, res, next) => {
  try {
    // Fetch all patients
    const patients = await Patient.find();

    // Calculate ranking score for each patient
    const rankedPatients = patients.map((patient) => ({
      ...patient.toObject(),
      rankingScore: calculateRankingScore(patient),
    }));

    // Sort patients by ranking score in descending order
    rankedPatients.sort((a, b) => b.rankingScore - a.rankingScore);

    // Get top 10 patients
    const topPatients = rankedPatients.slice(0, 10);

    res.status(200).json(topPatients);
  } catch (error) {
    next(error);
  }
};
// Get a single patient by ID
exports.getPatientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    if (!patient) {
      throw new Error("Patient not found");
    }
    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
};

// Get all patients
exports.getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};

// Search for patients
exports.searchPatients = async (req, res, next) => {
  try {
    const { query } = req.query;
    const patients = await Patient.find({ $text: { $search: query } });
    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};

// Filter patients
exports.filterPatients = async (req, res, next) => {
  try {
    const { property, value } = req.query;
    const filter = {};
    filter[property] = value;
    const patients = await Patient.find(filter);
    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};

// Update patient
exports.updatePatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedPatient = req.body;
    const patient = await Patient.findByIdAndUpdate(id, updatedPatient, {
      new: true,
    });
    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
};

// Delete patient
exports.deletePatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Patient.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Delete multiple patients
exports.deleteMultiplePatients = async (req, res, next) => {
  try {
    const { ids } = req.body;
    await Patient.deleteMany({ _id: { $in: ids } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
