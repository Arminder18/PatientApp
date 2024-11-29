import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch, ScrollView } from "react-native";
import axios from "axios";

const AddPatientScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [critical, setCritical] = useState(false);

  const handleSubmit = () => {
    const newPatient = {
      name,
      age: parseInt(age),
      number: parseInt(phone),
      critical,
      diagnosis,
      details,
      gender,
      address,
      medicalHistory,
    };

    axios
      .post("http://192.168.2.130:5000/patients", newPatient)
      .then(() => {
        Alert.alert("Success", "Patient added successfully");
        navigation.goBack();
      })
      .catch(() => {
        Alert.alert("Error", "Failed to add patient");
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Add New Patient</Text>
        <TextInputField label="Name" value={name} onChangeText={setName} placeholder="Enter name" />
        <TextInputField label="Age" value={age} onChangeText={setAge} placeholder="Enter age" keyboardType="numeric" />
        <TextInputField label="Diagnosis" value={diagnosis} onChangeText={setDiagnosis} placeholder="Enter diagnosis" />
        <TextInputField label="Gender" value={gender} onChangeText={setGender} placeholder="Enter gender" />
        <TextInputField label="Phone" value={phone} onChangeText={setPhone} placeholder="Enter phone number" keyboardType="phone-pad" />
        <TextInputField label="Address" value={address} onChangeText={setAddress} placeholder="Enter address" />
        <TextInputField label="Details" value={details} onChangeText={setDetails} placeholder="Enter additional details" />
        <TextInputField label="Medical History" value={medicalHistory} onChangeText={setMedicalHistory} placeholder="Enter medical history" />
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Critical Condition</Text>
          <Switch value={critical} onValueChange={setCritical} />
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Add Patient</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const TextInputField = ({ label, placeholder, ...props }) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} placeholder={placeholder} {...props} />
  </>
);

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { padding: 20, backgroundColor: "#fafafa" },
  header: { fontSize: 28, fontWeight: "700", color: "red", marginBottom: 20 },
  label: { fontSize: 18, fontWeight: "500", color: "#0288d1", marginVertical: 6 },
  input: { fontSize: 16, padding: 10, borderWidth: 1, borderRadius: 8, borderColor: "#e0e0e0", marginBottom: 12 },
  switchContainer: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
  submitButton: { backgroundColor: "#0288d1", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 20 },
  submitButtonText: { color: "white", fontSize: 18, fontWeight: "600" },
});

export default AddPatientScreen;
