import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, FlatList, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import RNPickerSelect from 'react-native-picker-select';

const ViewPatientRecordScreen = () => {
  const { patient } = useRoute().params || {};
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [showTestForm, setShowTestForm] = useState(false);
  const [selectedTest, setSelectedTest] = useState("");
  const [testDate, setTestDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [savedTests, setSavedTests] = useState([]);
  const [editedPatient, setEditedPatient] = useState(patient);

  const clinicOptions = ["Clinic A", "Clinic B", "Clinic C"];
  const testTypes = ["Blood Test", "X-Ray", "MRI", "CT Scan", "ECG"];

  useEffect(() => {
    if (!patient) {
      Alert.alert("Error", "Patient data is not available.");
      navigation.goBack();
    }
  }, [patient]);

  const handleDelete = () => {
    Alert.alert("Delete Record", "Are you sure you want to delete this record?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          axios
            .delete(`http://192.168.2.130:5000/patients/${patient._id}`)
            .then(() => {
              Alert.alert("Success", "Patient record deleted successfully");
              navigation.navigate("ListPatientScreen");
            })
            .catch((error) => {
              console.error("Delete Error:", error.message);
              Alert.alert("Error", error.response?.data?.error || "Failed to delete the record");
            });
        },
      },
    ]);
  };

  const handleSaveTest = () => {
    if (!selectedTest || !selectedLocation) {
      Alert.alert("Error", "Please select a test type and location.");
      return;
    }

    const newTest = { type: selectedTest, date: testDate.toLocaleDateString(), location: selectedLocation };
    setSavedTests([...savedTests, newTest]);
    setShowTestForm(false);
    Alert.alert("Success", "Test details saved successfully.");
  };

  const handleSavePatient = () => {
    axios
      .put(`http://192.168.2.130:5000/patients/${patient._id}`, editedPatient)
      .then(() => {
        Alert.alert("Success", "Patient record updated successfully");
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Save Error:", error.message);
        Alert.alert("Error", error.response?.data?.error || "Failed to update the record");
      });
  };

  const safeGet = (data, fallback = "N/A") => (data ? data : fallback);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{safeGet(patient?.name)}'s Record</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Ionicons name="pencil" size={30} color="green" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteIcon}>
            <Ionicons name="trash" size={30} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.patientDetails}>
        <PatientDetail label="Name" value={editedPatient?.name} isEditing={isEditing} onChange={(text) => setEditedPatient({ ...editedPatient, name: text })} />
        <PatientDetail label="Age" value={editedPatient?.age} isEditing={isEditing} onChange={(text) => setEditedPatient({ ...editedPatient, age: text })} />
        <PatientDetail label="Gender" value={editedPatient?.gender} isEditing={isEditing} onChange={(text) => setEditedPatient({ ...editedPatient, gender: text })} />
        <PatientDetail label="Diagnosis" value={editedPatient?.diagnosis} isEditing={isEditing} onChange={(text) => setEditedPatient({ ...editedPatient, diagnosis: text })} />
        <PatientDetail label="Phone" value={editedPatient?.phone} isEditing={isEditing} onChange={(text) => setEditedPatient({ ...editedPatient, phone: text })} />
        <PatientDetail label="Address" value={editedPatient?.address} isEditing={isEditing} onChange={(text) => setEditedPatient({ ...editedPatient, address: text })} />
        <PatientDetail label="Details" value={editedPatient?.details} isEditing={isEditing} onChange={(text) => setEditedPatient({ ...editedPatient, details: text })} />
        <PatientDetail label="Critical Condition" value={editedPatient?.critical ? "Yes" : "No"} isEditing={isEditing} onChange={(text) => setEditedPatient({ ...editedPatient, critical: text === "Yes" })} />
      </View>

      {isEditing && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePatient}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      )}

      <View style={styles.testSection}>
        <Text style={styles.testHeader}>Patient Tests</Text>
        <TouchableOpacity onPress={() => setShowTestForm(!showTestForm)} style={styles.addTestButton}>
          <Ionicons name="add-circle" size={30} color="blue" />
        </TouchableOpacity>
      </View>

      {showTestForm && (
        <View style={styles.testForm}>
          <Text style={styles.label}>Test Type</Text>
          <RNPickerSelect
            onValueChange={setSelectedTest}
            items={testTypes.map((test) => ({ label: test, value: test }))}
            style={pickerSelectStyles}
          />

          <Text style={styles.label}>Test Date</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateButton}>Pick a Date</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={testDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) setTestDate(date);
              }}
            />
          )}

          <Text style={styles.label}>Location</Text>
          <FlatList
            data={clinicOptions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.locationOption, selectedLocation === item && styles.selectedLocation]}
                onPress={() => setSelectedLocation(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSaveTest}>
            <Text style={styles.submitButtonText}>Save Test Details</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.table}>
        <Text style={styles.tableHeader}>Saved Tests</Text>
        <View style={[styles.tableRow, styles.tableHeaderRow]}>
          <Text style={styles.tableCellHeader}>Test Type</Text>
          <Text style={styles.tableCellHeader}>Test Date</Text>
          <Text style={styles.tableCellHeader}>Test Location</Text>
        </View>
        {savedTests.map((test, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{test.type}</Text>
            <Text style={styles.tableCell}>{test.date}</Text>
            <Text style={styles.tableCell}>{test.location}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const PatientDetail = ({ label, value, isEditing, onChange }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}:</Text>
    {isEditing ? (
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChange}
      />
    ) : (
      <Text style={styles.detailValue}>{value}</Text>
    )}
  </View>
);

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    color: "black",
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    color: "black",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
  },
  deleteIcon: {
    marginLeft: 16,
  },
  patientDetails: {
    marginTop: 16,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    flex: 2,
  },
  textInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    flex: 2,
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  testSection: {
    marginTop: 32,
  },
  testHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addTestButton: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  testForm: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  dateButton: {
    fontSize: 18,
    color: "blue",
    marginBottom: 12,
  },
  locationOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 5,
    borderRadius: 4,
  },
  selectedLocation: {
    backgroundColor: "#cce7ff",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  table: {
    marginTop: 20,
  },
  tableHeaderRow: {
    backgroundColor: "#f2f2f2",
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tableCellHeader: {
    flex: 1,
    fontWeight: "600",
    padding: 10,
  },
  tableCell: {
    flex: 1,
    padding: 10,
  },
});

export default ViewPatientRecordScreen;
