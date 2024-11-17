import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const WellnessCenter = ({ navigation }) => {
  const navigateToDetail = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wellness Center</Text>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigateToDetail("HealthTips")}
      >
        <Text style={styles.optionText}>Daily Health Tips</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigateToDetail("ExercisePlans")}
      >
        <Text style={styles.optionText}>Recommended Exercises</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigateToDetail("NutritionAdvice")}
      >
        <Text style={styles.optionText}>Nutrition Advice</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff5f5",
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "black",
    marginBottom: 30,
    fontFamily: "Roboto-Bold",
  },
  optionButton: {
    backgroundColor: "#e60000",
    paddingVertical: 18,
    paddingHorizontal: 25,
    marginVertical: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  optionText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Arial",
    fontWeight: "600",
  },
});

export default WellnessCenter;
