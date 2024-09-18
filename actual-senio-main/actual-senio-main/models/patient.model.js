//patient.model.js

const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  BMI: {
    type: Number,
    required: true,
    default: 0,
  },
  systolic: {
    type: Number,
    required: true,
  },
  diastolic: {
    type: Number,
    required: true,
  },
  cholestrol: {
    type: Number,
    required: true,
  },
  diabetes: {
    type: Number,
    required: true,
  },
  smoked: {
    type: Number,
    required: true,
  },
  paratype: {
    type: String,
    required: true,
  },
  dseverity: {
    type: Number,
    required: true,
    default: 0,
  },
  condition: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    enum: ["red", "orange", "yellow"],
    required: true,
  },
});

patientSchema.index({ name: "text", condition: "text", severity: "text" });

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
