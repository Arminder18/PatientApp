import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>WELCOME TO SENCARE</Text>
      <Image
        source={require("../../assets/images/image.png")}
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddPatientScreen")}
      >
        <Text style={styles.buttonText}>Go to Add Patient</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ListPatientScreen")}
      >
        <Text style={styles.buttonText}>Go to Patient's List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("WellnessCenter")}
      >
        <Text style={styles.buttonText}>Go to Wellness Center</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0f7fa",
    padding: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "600",
    fontStyle: "italic",
    color: "red",
    marginTop: 10,
    marginBottom: 40,
    textAlign: "center",
  },
  image: {
    width: 230,
    height: 230,
    marginBottom: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#bbb",
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: "center",
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    textTransform: "capitalize",
  },
});

export default HomeScreen;
