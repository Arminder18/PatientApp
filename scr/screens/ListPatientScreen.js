import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";

const ListPatientScreen = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get("http://192.168.2.130:5000/patients")
      .then((response) => {
        setPatients(response.data);
        setFilteredPatients(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = patients;
    if (filter === "critical") {
      filtered = filtered.filter((patient) => patient.critical);
    } else if (filter === "stable") {
      filtered = filtered.filter((patient) => !patient.critical);
    }
    if (searchText.trim() !== "") {
      filtered = filtered.filter((patient) =>
        patient.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    setFilteredPatients(filtered);
  }, [filter, patients, searchText]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e53946" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.header}>List of Patients</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Patients"
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all" && styles.activeFilterButton]}
          onPress={() => setFilter("all")}
        >
          <Text style={styles.filterButtonText}>All Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "critical" && styles.activeFilterButton]}
          onPress={() => setFilter("critical")}
        >
          <Text style={styles.filterButtonText}>Critical</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "stable" && styles.activeFilterButton]}
          onPress={() => setFilter("stable")}
        >
          <Text style={styles.filterButtonText}>Stable</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredPatients}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.patientCard}
            onPress={() => navigation.navigate("ViewPatientRecordScreen", { patient: item })}
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddPatientScreen")}
      >
        <Icon name="add" size={30} color="white" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fafafa" },
  header: { fontSize: 28, fontWeight: "700", color: "red", marginBottom: 20, textAlign: "center" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fafafa" },
  searchBar: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    color: "#000",
  },
  filterContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  filterButton: { paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, backgroundColor: "#e0e0e0" },
  activeFilterButton: { backgroundColor: "#0288d1" },
  filterButtonText: { color: "#fff", fontWeight: "600" },
  patientCard: { backgroundColor: "#e0f7fa", padding: 18, marginBottom: 12, borderRadius: 12, elevation: 4 },
  patientName: { fontSize: 20, fontWeight: "600", color: "black", marginBottom: 6 },
  patientDetails: { fontSize: 16, color: "#555", marginBottom: 4 },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#0288d1",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
});

export default ListPatientScreen;
