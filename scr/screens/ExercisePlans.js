import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ExercisePlans = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Exercises</Text>
      <Text style={styles.text}>- Morning Yoga for 15 minutes.</Text>
      <Text style={styles.text}>- 10,000 steps daily.</Text>
      <Text style={styles.text}>- Strength training twice a week.</Text>
      <Text style={styles.text}>- 20 minutes of cycling, three times a week.</Text>
      <Text style={styles.text}>- High-intensity interval training (HIIT) twice a week.</Text>
      <Text style={styles.text}>- Stretching exercises for flexibility every day.</Text>
      <Text style={styles.text}>- Swimming for 30 minutes, twice a week.</Text>
      <Text style={styles.text}>- Engage in a team sport like basketball or soccer weekly.</Text>
      <Text style={styles.text}>- Take stairs instead of elevators whenever possible.</Text>
      <Text style={styles.text}>- Perform mindfulness or meditation for 10 minutes daily.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    backgroundColor: "#f4f4f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff6347",
    marginBottom: 25,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    marginVertical: 8,
    color: "#4b0082",
    fontFamily: "Arial",
    lineHeight: 30,
    paddingHorizontal: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#ff4500",
    paddingLeft: 15,
  },
});

export default ExercisePlans;
