import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import axios from "axios";

const AddPatientScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [critical, setCritical] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");
  const [temperature, setTemperature] = useState("");

  useEffect(() => {
    const assessCriticality = () => {
      const isTempCritical = temperature && (parseFloat(temperature) < 35 || parseFloat(temperature) > 40);
      const isHeartRateCritical = heartRate && (parseInt(heartRate) < 40 || parseInt(heartRate) > 120);
      const isBloodPressureCritical = bloodPressure && (() => {
        const [systolic, diastolic] = bloodPressure.split("/").map(Number);
        return systolic < 90 || systolic > 180 || diastolic < 60 || diastolic > 120;
      })();
      const isRespiratoryCritical = respiratoryRate && (parseInt(respiratoryRate) < 10 || parseInt(respiratoryRate) > 30);

      return isTempCritical || isHeartRateCritical || isBloodPressureCritical || isRespiratoryCritical;
    };

    setCritical(assessCriticality());
  }, [temperature, heartRate, bloodPressure, respiratoryRate]);

  const handleSubmit = async () => {
    const parsedAge = age ? parseInt(age) : null;
    const parsedHeartRate = heartRate ? parseInt(heartRate) : null;
    const parsedRespiratoryRate = respiratoryRate ? parseInt(respiratoryRate) : null;
    const parsedTemperature = temperature ? parseFloat(temperature) : null;
    const parsedPhone = phone || null;

    const newPatient = {
      name,
      age: parsedAge,
      phone: parsedPhone,
      critical,
      diagnosis,
      gender,
      address,
      medicalHistory,
      heart_rate: parsedHeartRate,
      blood_pressure: bloodPressure,
      respiratory_rate: parsedRespiratoryRate,
      temperature: parsedTemperature,
    };

    console.log("Submitting patient data:", newPatient);

    if (!name || !age || !phone || !diagnosis || !gender || !address || !medicalHistory || !heartRate || !bloodPressure || !respiratoryRate || !temperature) {
      Alert.alert("Error", "Please fill in all the required fields.");
      return;
    }

    try {
      const response = await axios.post("http://172.20.10.6:5000/patients", newPatient);
      console.log("Response from server:", response.data);
      Alert.alert("Success", "Patient added successfully");
      navigation.goBack();
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
        Alert.alert("Error", `Failed to add patient. Server returned status ${error.response.status}`);
      } else if (error.request) {
        console.error("Error request data:", error.request);
        Alert.alert("Error", "Failed to add patient. No response received from the server.");
      } else {
        console.error("Error message:", error.message);
        Alert.alert("Error", "An unexpected error occurred.");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Add New Patient</Text>
        <TextInputField label="Name" value={name} onChangeText={setName} />
        <TextInputField label="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
        <TextInputField label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <TextInputField label="Diagnosis" value={diagnosis} onChangeText={setDiagnosis} />
        <TextInputField label="Gender" value={gender} onChangeText={setGender} />
        <TextInputField label="Address" value={address} onChangeText={setAddress} />
        <TextInputField label="Medical History" value={medicalHistory} onChangeText={setMedicalHistory} />
        <TextInputField label="Heart Rate (BPM)" value={heartRate} onChangeText={setHeartRate} keyboardType="numeric" />
        <TextInputField label="Blood Pressure (Systolic/Diastolic)" value={bloodPressure} onChangeText={setBloodPressure} />
        <TextInputField label="Respiratory Rate (Breaths/Min)" value={respiratoryRate} onChangeText={setRespiratoryRate} keyboardType="numeric" />
        <TextInputField label="Temperature (°C)" value={temperature} onChangeText={setTemperature} keyboardType="numeric" />

        <View style={styles.criticalContainer}>
          <Text style={styles.label}>Condition: </Text>
          <Text style={critical ? styles.criticalText : styles.stableText}>{critical ? "Critical" : "Stable"}</Text>
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Add Patient</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const TextInputField = ({ label, ...props }) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} {...props} />
  </View>
);

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { padding: 20, backgroundColor: "#fafafa" },
  header: { fontSize: 28, fontWeight: "700", color: "red", marginBottom: 20 },
  label: { fontSize: 18, fontWeight: "500", color: "#0288d1", marginVertical: 6 },
  input: { fontSize: 16, padding: 10, borderWidth: 1, borderRadius: 8, borderColor: "#e0e0e0" },
  criticalContainer: { flexDirection: "row", alignItems: "center", marginTop: 20 },
  criticalText: { fontSize: 18, color: "red", fontWeight: "bold" },
  stableText: { fontSize: 18, color: "green", fontWeight: "bold" },
  submitButton: { backgroundColor: "#0288d1", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 20 },
  submitButtonText: { color: "white", fontSize: 18, fontWeight: "600" },
});

export default AddPatientScreen;
