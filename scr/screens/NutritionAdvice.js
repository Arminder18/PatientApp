import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NutritionAdvice = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutrition Advice</Text>
      <Text style={styles.text}>- Include fruits and vegetables in your meals.</Text>
      <Text style={styles.text}>- Limit processed foods and sugar.</Text>
      <Text style={styles.text}>- Opt for whole grains and lean proteins.</Text>
      <Text style={styles.text}>- Stay hydrated by drinking water throughout the day.</Text>
      <Text style={styles.text}>- Choose healthy fats like olive oil, avocado, and nuts.</Text>
      <Text style={styles.text}>- Practice portion control to avoid overeating.</Text>
      <Text style={styles.text}>- Eat small, frequent meals to keep your metabolism active.</Text>
      <Text style={styles.text}>- Limit sodium intake to maintain healthy blood pressure.</Text>
      <Text style={styles.text}>- Avoid drinking too many sugary beverages like sodas.</Text>
      <Text style={styles.text}>- Focus on nutrient-dense foods to support overall health.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff4500",
    marginBottom: 25,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    marginVertical: 8,
    color: "#2e8b57",
    fontFamily: "Arial",
    lineHeight: 30,
    paddingHorizontal: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#ff6347",
    paddingLeft: 15,
  },
});

export default NutritionAdvice;
