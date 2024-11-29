import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import '@testing-library/jest-native/extend-expect';
import LoginScreen from "../screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: jest.fn(),
    replace: jest.fn(),
  }),
}));

// Mock navigation for testing
const Stack = createStackNavigator();

const MockNavigation = ({ children }) => (
  <NavigationContainer>
    <Stack.Navigator>
      {children}
    </Stack.Navigator>
  </NavigationContainer>
);

test("navigates to HomeScreen when login is successful", async () => {
  // Render the LoginScreen with mock navigation
  render(
    <MockNavigation>
      <LoginScreen />
    </MockNavigation>
  );

  // Simulate user interaction
  fireEvent.changeText(screen.getByPlaceholderText("Enter your email"), "test@example.com");
  fireEvent.changeText(screen.getByPlaceholderText("Enter your password"), "password");
  fireEvent.press(screen.getByText("Login"));

  // Wait for the navigation to complete and check if HomeScreen navigation was triggered
  await waitFor(() => {
    expect(screen.queryByText("Home Screen")).not.toBeNull();
  });
});
