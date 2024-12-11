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
  const testTypes = ["Blood Pressure", "Heart Rate", "Respiratory Rate", "Temperature"];

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
            .delete(`http://172.20.10.6:5000/patients/${patient._id}`)
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
      .put(`http://172.20.10.6:5000/patients/${patient._id}`, editedPatient)
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
        {['Name', 'Age', 'Gender', 'Diagnosis', 'Phone', 'Address'].map((label, index) => (
          <PatientDetail
            key={index}
            label={label}
            value={editedPatient[label.toLowerCase()]}
            isEditing={isEditing}
            onChange={(text) => setEditedPatient({ ...editedPatient, [label.toLowerCase()]: text })}
          />
        ))}
        <PatientDetail
          label="Critical Condition"
          value={editedPatient?.critical ? "Yes" : "No"}
          isEditing={isEditing}
          onChange={(text) => setEditedPatient({ ...editedPatient, critical: text === "Yes" })}
        />
        {['Heart Rate', 'Blood Pressure', 'Respiratory Rate', 'Temperature'].map((label, index) => (
          <PatientDetail
            key={index}
            label={label}
            value={editedPatient[label.toLowerCase().replace(' ', '_')]}
            isEditing={isEditing}
            onChange={(text) => setEditedPatient({ ...editedPatient, [label.toLowerCase().replace(' ', '_')]: text })}
          />
        ))}
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
        style={styles.detailInput}
        value={value}
        onChangeText={onChange}
      />
    ) : (
      <Text style={styles.detailValue}>{value}</Text>
    )}
  </View>
);

const pickerSelectStyles = {
  inputIOS: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 10,
  },
  inputAndroid: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 10,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
  },
  deleteIcon: {
    marginLeft: 15,
  },
  patientDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  detailLabel: {
    flex: 1,
    fontWeight: "bold",
  },
  detailInput: {
    flex: 2,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 5,
  },
  detailValue: {
    flex: 2,
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  testSection: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  testHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addTestButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  testForm: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  dateButton: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    textAlign: "center",
    marginBottom: 10,
  },
  locationOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedLocation: {
    backgroundColor: "#d3f9d8",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  table: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableHeaderRow: {
    borderBottomWidth: 2,
  },
  tableCellHeader: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
});

export default ViewPatientRecordScreen;
