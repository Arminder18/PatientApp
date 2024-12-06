const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize the Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection URI
const mongoURI = "mongodb://192.168.2.130:27017/clinicalrecords";

// MongoDB Connection Function
const connectToDatabase = async () => {
  let retries = 0;
  const maxRetries = 5;
  while (retries < maxRetries) {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
      break;
    } catch (error) {
      retries++;
      console.error(`MongoDB connection error (Attempt ${retries}):`, error.message);
      if (retries < maxRetries) await new Promise((resolve) => setTimeout(resolve, 5000));
      else process.exit(1);
    }
  }
};

// Connect to MongoDB
connectToDatabase();

// Define the Patient Schema
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: Number, required: true },
  critical: { type: Boolean, required: true },
  diagnosis: { type: String, required: true },
  details: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  medicalHistory: { type: String, required: true },
});

// Define the Patient Model
const Patient = mongoose.model("Patient", patientSchema, "Patients");

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Clinical Records API!");
});

// Create a New Patient
app.post("/patients", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: "Error adding patient: " + error.message });
  }
});

// Get All Patients
app.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: "Error fetching patients: " + error.message });
  }
});

// Get a Single Patient by ID
app.get("/patients/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: "Error fetching patient: " + error.message });
  }
});

// Update a Patient by ID
app.put("/patients/:id", async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient);
  } catch (error) {
    res.status(400).json({ error: "Error updating patient: " + error.message });
  }
});

// Delete a Patient by ID
app.delete("/patients/:id", async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting patient: " + error.message });
  }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://192.168.2.130:${PORT}`));
