import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import RegisterScreen from "../screens/RegisterScreen";
import '@testing-library/jest-native/extend-expect';
import { Alert } from "react-native";

describe("RegisterScreen", () => {
  let alertMock;

  beforeEach(() => {
    alertMock = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders all elements correctly", () => {
    render(<RegisterScreen />);

    expect(screen.getByText("Create an Account")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter your name")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter your email")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter your password")).toBeTruthy();
    expect(screen.getByText("Register")).toBeTruthy();
  });

  test("shows an alert when register is attempted with empty fields", () => {
    render(<RegisterScreen />);

    fireEvent.press(screen.getByText("Register"));
    expect(alertMock).toHaveBeenCalledWith("Error", "Please fill in all fields.");
  });

  test("shows success alert when all fields are filled", () => {
    render(<RegisterScreen />);

    fireEvent.changeText(screen.getByPlaceholderText("Enter your name"), "John Doe");
    fireEvent.changeText(screen.getByPlaceholderText("Enter your email"), "john@example.com");
    fireEvent.changeText(screen.getByPlaceholderText("Enter your password"), "password");
    fireEvent.press(screen.getByText("Register"));

    expect(alertMock).toHaveBeenCalledWith("Success", "Registration successful! You can now log in.");
  });
});
