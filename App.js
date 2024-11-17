import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./scr/screens/HomeScreen";
import AddPatientScreen from "./scr/screens/AddPatientScreen";
import ListPatientScreen from "./scr/screens/ListPatientScreen";
import ViewPatientRecordScreen from "./scr/screens/ViewPatientRecordScreen";
import CriticalPatientScreen from "./scr/screens/CriticalPatientScreen";
import StablePatientScreen from "./scr/screens/StablePatientScreen"
import WellnessCenter from "./scr/screens/WellnessCenter";
import HealthTips from "./scr/screens/HealthTips";
import ExercisePlans from "./scr/screens/ExercisePlans";
import NutritionAdvice from "./scr/screens/NutritionAdvice";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AddPatientScreen" component={AddPatientScreen} />
        <Stack.Screen name="ListPatientScreen" component={ListPatientScreen} />
        <Stack.Screen name="CriticalPatientScreen" component={CriticalPatientScreen}/>
        <Stack.Screen name="ViewPatientRecordScreen" component={ViewPatientRecordScreen}/>
        <Stack.Screen name="StablePatientScreen" component={StablePatientScreen}/>
        <Stack.Screen name="WellnessCenter" component={WellnessCenter}/>
        <Stack.Screen name="HealthTips" component={HealthTips}/>
        <Stack.Screen name="ExercisePlans" component={ExercisePlans}/>
        <Stack.Screen name="NutritionAdvice" component={NutritionAdvice}/>
       </Stack.Navigator>
    </NavigationContainer>
  );
}
