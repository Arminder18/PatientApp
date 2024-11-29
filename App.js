import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./scr/screens/LoginScreen";
import RegisterScreen from "./scr/screens/RegisterScreen";
import HomeScreen from "./scr/screens/HomeScreen";
import ListPatientScreen from "./scr/screens/ListPatientScreen";
import AddPatientScreen from "./scr/screens/AddPatientScreen";
import ViewPatientRecordScreen from "./scr/screens/ViewPatientRecordScreen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ListPatientScreen" component={ListPatientScreen} />
        <Stack.Screen name="AddPatientScreen" component={AddPatientScreen} />
        <Stack.Screen name="ViewPatientRecordScreen" component={ViewPatientRecordScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
