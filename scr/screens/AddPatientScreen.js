import React, { useState } from "react";
import { View, TextInput, Text, Switch, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import axios from "axios";

const AddPatientScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [critical, setCritical] = useState(false);
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [allergies, setAllergies] = useState("");
  const [gender, setGender] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [medications, setMedications] = useState("");
  const [admittedDate, setAdmittedDate] = useState(new Date().toISOString()); 
  const addPatient = () => {
    if (!name || !age || !diagnosis) {
      alert("Please fill all fields");
      return;
    }

    const newPatient = {
      name,
      age: Number(age),
      diagnosis,
      critical,
      details,
      contact_info: { phone, email, address },
      emergency_contact: { name: emergencyName, phone: emergencyPhone },
      vitals: { admission_date: admittedDate }, 
      allergies: allergies.split(","),
      gender,
      medical_history: medicalHistory.split(","),
      medications: medications.split(","),
      dateAdmitted: admittedDate, 
    };

    // Show loading alert
    alert("Adding patient...");

    axios
      .post("http://192.168.2.130:5000/patients", newPatient)
      .then(response => {
        console.log("Patient added:", response.data);
        navigation.navigate("HomeScreen");
      })
      .catch(error => {
        console.log("Error adding patient:", error.response ? error.response.data : error.message);
        alert("Error adding patient");
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Add New Patient</Text>

      {/* Patient Info */}
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Enter patient's name"
        value={name}
        onChangeText={setName}
        style={styles.inputField}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        placeholder="Enter patient's age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.inputField}
      />

      <Text style={styles.label}>Diagnosis</Text>
      <TextInput
        placeholder="Enter diagnosis"
        value={diagnosis}
        onChangeText={setDiagnosis}
        style={styles.inputField}
      />

      <Text style={styles.label}>Details</Text>
      <TextInput
        placeholder="Enter patient details"
        value={details}
        onChangeText={setDetails}
        style={styles.inputField}
      />

      {/* Contact Info */}
      <Text style={styles.label}>Phone</Text>
      <TextInput
        placeholder="Enter phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.inputField}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Enter email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.inputField}
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        placeholder="Enter address"
        value={address}
        onChangeText={setAddress}
        style={styles.inputField}
      />

      {/* Emergency Contact */}
      <Text style={styles.label}>Emergency Contact Name</Text>
      <TextInput
        placeholder="Enter emergency contact name"
        value={emergencyName}
        onChangeText={setEmergencyName}
        style={styles.inputField}
      />

      <Text style={styles.label}>Emergency Contact Phone</Text>
      <TextInput
        placeholder="Enter emergency contact phone"
        value={emergencyPhone}
        onChangeText={setEmergencyPhone}
        keyboardType="phone-pad"
        style={styles.inputField}
      />

      {/* Allergies, Gender, Medical History, Medications */}
      <Text style={styles.label}>Allergies</Text>
      <TextInput
        placeholder="Enter allergies"
        value={allergies}
        onChangeText={setAllergies}
        style={styles.inputField}
      />

      <Text style={styles.label}>Gender</Text>
      <TextInput
        placeholder="Enter gender"
        value={gender}
        onChangeText={setGender}
        style={styles.inputField}
      />

      <Text style={styles.label}>Medical History</Text>
      <TextInput
        placeholder="Enter medical history"
        value={medicalHistory}
        onChangeText={setMedicalHistory}
        style={styles.inputField}
      />

      <Text style={styles.label}>Medications</Text>
      <TextInput
        placeholder="Enter medications"
        value={medications}
        onChangeText={setMedications}
        style={styles.inputField}
      />

      {/* Date Admitted */}
      <Text style={styles.label}>Date Admitted</Text>
      <Text style={styles.inputField}>{new Date(admittedDate).toLocaleDateString()}</Text>

      {/* Critical toggle */}
      <Text style={styles.label}>Critical</Text>
      <Switch
        value={critical}
        onValueChange={setCritical}
        style={styles.switch}
      />

      {/* Add Patient Button */}
      <TouchableOpacity onPress={addPatient} style={styles.button}>
        <Text style={styles.buttonText}>Add Patient</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f8ff",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "Arial",
  },
  label: {
    fontSize: 15,
    color: "#34495e",
    marginBottom: 10,
    fontFamily: "Arial",
  },
  inputField: {
    height: 50,
    borderColor: "#7f8c8d",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: "#ecf0f1",
    fontFamily: "Arial",
  },
  switch: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#27ae60",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    marginBottom:30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AddPatientScreen;
