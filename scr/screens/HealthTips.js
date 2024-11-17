import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HealthTips = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Health Tips</Text>
      <Text style={styles.text}>
        <Text style={styles.bullet}>•</Text> Drink plenty of water.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bullet}>•</Text> Get at least 8 hours of sleep.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bullet}>•</Text> Exercise for 30 minutes daily.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bullet}>•</Text> Eat a balanced diet rich in fruits and vegetables.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bullet}>•</Text> Avoid sugary drinks and snacks.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bullet}>•</Text> Practice deep breathing or meditation for stress relief.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bullet}>•</Text> Wash your hands frequently to maintain hygiene.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bullet}>•</Text> Limit screen time to avoid eye strain.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bullet}>•</Text> Take short walks or stretch breaks during long work sessions.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bullet}>•</Text> Avoid smoking and limit alcohol consumption.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff6347",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Arial-BoldMT",
  },
  text: {
    fontSize: 18,
    marginVertical: 8,
    lineHeight: 28,
    fontFamily: "Roboto",
  },
  bullet: {
    color: "#ff6347",
    fontSize: 22,
    marginRight: 10,
  },
});
 
export default HealthTips;
