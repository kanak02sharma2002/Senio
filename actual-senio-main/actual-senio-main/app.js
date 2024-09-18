// app.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
dotenv.config();
const patientRoutes = require("./routes/patient.routes");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files for all three webpages
app.use(express.static(path.join(__dirname, "public")));

// Routes for the first webpage
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "patient-creation", "index.html")
  );
});

// Routes for the second webpage
app.get("/patient-details", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "patient-mod", "patient-details.html")
  );
});

// Routes for the third webpage
app.get("/pps", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "patient-priority", "pps.html"));
});

// API routes
app.use("/api/patients", patientRoutes);

// 404 Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

mongoose
  .connect(
    "mongodb+srv://nevdev:klsN3It9JVJHHIOp@cluster1.cj5oewz.mongodb.net/seniot?retryWrites=true&w=majority&appName=cluster1",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports = app;
