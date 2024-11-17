import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ListPatientScreen = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get("http://192.168.2.130:5000/patients")
      .then((response) => {
        setPatients(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching patients:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e53946" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>List of Patients</Text>
      <FlatList
        data={patients}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.patientCard}
            onPress={() =>
              navigation.navigate("ViewPatientRecordScreen", {
                patient: item,
              })
            }
          >
            <Text style={styles.patientName}>{item.name}</Text>
            <Text style={styles.patientDetails}>Age: {item.age || "N/A"}</Text>
            <Text style={styles.patientDetails}>Diagnosis: {item.diagnosis || "N/A"}</Text>
            <Text style={styles.patientDetails}>
              Status: {item.critical ? "Critical" : "Stable"}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#e53946" }]}
          onPress={() =>
            navigation.navigate("CriticalPatientScreen", {
              criticalOnly: true,
            })
          }
        >
          <Text style={styles.buttonText}>View Critical Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#43a047" }]}
          onPress={() =>
            navigation.navigate("StablePatientScreen", {
              stableOnly: true,
            })
          }
        >
          <Text style={styles.buttonText}>View Stable Patients</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fafafa",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  patientCard: {
    backgroundColor: "#e0f7fa",
    padding: 18,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  patientName: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",
    marginBottom: 6,
  },
  patientDetails: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default ListPatientScreen;
