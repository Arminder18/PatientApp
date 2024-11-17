import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const StablePatientScreen = () => {
  const { stableOnly } = useRoute().params; 
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all patients or just stable patients
    fetchPatients();
  }, [stableOnly]);

  const fetchPatients = async () => {
    try {
      const response = await fetch("http://192.168.2.130:5000/patients");
      const data = await response.json();
      if (stableOnly) {
        // Filter only stable patients
        setPatients(data.filter((patient) => patient.critical === false));
      } else {
        setPatients(data); // Show all patients if no filter is applied
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching patients:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Stable Patient Records</Text>

      <FlatList
        data={patients}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.patientCard}>
            <Text style={styles.patientName}>{item.name}</Text>
            <Text style={styles.patientDetails}>Age: {item.age || "N/A"}</Text>
            <Text style={styles.patientDetails}>Diagnosis: {item.diagnosis || "N/A"}</Text>
            <Text style={styles.patientDetails}>
              Status: {item.critical ? "Critical" : "Stable"}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default StablePatientScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f8ff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
  },
  patientCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  patientName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#008080", // Dark teal for bold names
  },
  patientDetails: {
    fontSize: 14,
    color: "#555",
  },
});
