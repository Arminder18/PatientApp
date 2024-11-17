const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


app.use(bodyParser.json());
app.use(cors());


const mongoURI = "mongodb://192.168.2.130:27017/clinicalrecords";  


const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    setTimeout(connectToDatabase, 5000); 
  }
};

connectToDatabase();

// Patient Schema
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  critical: { type: Boolean, required: true },
  diagnosis: { type: String, required: true },
  dateAdmitted: { type: Date, required: true },
  details: { type: String },
});
module.exports = mongoose.model('Patient', patientSchema);

patientSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
});

const Patient = mongoose.model("Patient", patientSchema, "Patients");

// API Routes

// Add a Patient
app.post("/patients", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    console.log("Received data to be saved:", patient); // Log the incoming patient data
    await patient.save();
    res.status(201).json(patient); // Send back the saved patient data
  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(500).json({ error: "Error adding patient: " + error.message });
  }
});

// Get All Patients
app.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find().lean(); // Using `.lean()` to return plain JavaScript objects
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: "Error fetching patients: " + error.message });
  }
});

// Get a Specific Patient by ID
app.get("/patients/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).lean();
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: "Error fetching patient details: " + error.message });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://192.168.2.130:${PORT}`);
});
