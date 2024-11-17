import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

const ViewPatientRecordScreen = () => {
  const { patient } = useRoute().params;

  const safeGet = (data, fallback = "N/A") => (data ? data : fallback);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{safeGet(patient.name)}'s Record</Text>

      <Text style={styles.detail}>Age: {safeGet(patient.age)}</Text>
      <Text style={styles.detail}>Diagnosis: {safeGet(patient.diagnosis)}</Text>
      <Text style={styles.detail}>Status: {safeGet(patient.critical ? "Critical" : "Stable")}</Text>
      <Text style={styles.detail}>
        Admitted On: {safeGet(new Date(patient.dateAdmitted).toLocaleDateString())}
      </Text>
      <Text style={styles.detail}>Details: {safeGet(patient.details)}</Text>

      <Text style={styles.subHeader}>Emergency Contact</Text>
      <Text style={styles.detail}>Name: {safeGet(patient.emergency_contact?.name)}</Text>
      <Text style={styles.detail}>Phone: {safeGet(patient.emergency_contact?.phone)}</Text>

      <Text style={styles.subHeader}>Contact Info</Text>
      <Text style={styles.detail}>Phone: {safeGet(patient.contact_info?.phone)}</Text>
      <Text style={styles.detail}>Email: {safeGet(patient.contact_info?.email)}</Text>
      <Text style={styles.detail}>Address: {safeGet(patient.contact_info?.address)}</Text>

      <Text style={styles.subHeader}>Vitals</Text>
      <Text style={styles.detail}>Blood Pressure: {safeGet(patient.vitals?.blood_pressure)}</Text>
      <Text style={styles.detail}>Heart Rate: {safeGet(patient.vitals?.heart_rate)}</Text>
      <Text style={styles.detail}>Temperature: {safeGet(patient.vitals?.temperature)}</Text>
      <Text style={styles.detail}>Weight: {safeGet(patient.vitals?.weight)}</Text>
      <Text style={styles.detail}>Height: {safeGet(patient.vitals?.height)}</Text>

      <Text style={styles.subHeader}>Allergies</Text>
      <Text style={styles.detail}>
        {patient.allergies?.length > 0 ? patient.allergies.join(", ") : "N/A"}
      </Text>

      <Text style={styles.subHeader}>Medical History</Text>
      <Text style={styles.detail}>
        {patient.medical_history?.length > 0 ? patient.medical_history.join(", ") : "N/A"}
      </Text>

      <Text style={styles.subHeader}>Medications</Text>
      <Text style={styles.detail}>
        {patient.medications?.length > 0 ? patient.medications.join(", ") : "N/A"}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 12,
    color: "#000",
  },
  detail: {
    fontSize: 16,
    marginVertical: 6,
    color: "#800080",
  },
});

export default ViewPatientRecordScreen;
