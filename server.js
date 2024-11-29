const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoURI = "mongodb://192.168.2.130:27017/clinicalrecords";

const connectToDatabase = async () => {
  let retries = 0;
  const maxRetries = 5;
  while (retries < maxRetries) {
    try {
      await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
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

connectToDatabase();

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

const Patient = mongoose.model("Patient", patientSchema, "Patients");

app.post("/patients", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: "Error adding patient: " + error.message });
  }
});

app.listen(5000, () => console.log("Server running on http://192.168.2.130:5000"));
