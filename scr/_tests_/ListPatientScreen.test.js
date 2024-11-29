import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import ListPatientScreen from "../screens/ListPatientScreen";
import '@testing-library/jest-native/extend-expect';
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";

jest.mock("axios");

describe("ListPatientScreen", () => {
  const mockPatients = [
    { _id: "1", name: "John Doe", age: 30, diagnosis: "Flu", critical: false },
    { _id: "2", name: "Jane Smith", age: 45, diagnosis: "Heart Attack", critical: true },
    { _id: "3", name: "Sam Brown", age: 50, diagnosis: "Diabetes", critical: false }
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockPatients });
  });

  test("renders patients correctly", async () => {
    render(
      <NavigationContainer>
        <ListPatientScreen />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(screen.getByText("List of Patients")).toBeTruthy();
      expect(screen.getByText("John Doe")).toBeTruthy();
      expect(screen.getByText("Jane Smith")).toBeTruthy();
      expect(screen.getByText("Sam Brown")).toBeTruthy();
    });
  });

  test("filters critical patients", async () => {
    render(
      <NavigationContainer>
        <ListPatientScreen />
      </NavigationContainer>
    );

    await waitFor(() => {
      fireEvent.press(screen.getByText("Critical"));
    });

    expect(screen.getByText("Jane Smith")).toBeTruthy();
    expect(screen.queryByText("John Doe")).toBeNull();
    expect(screen.queryByText("Sam Brown")).toBeNull();
  });

  test("search functionality works", async () => {
    render(
      <NavigationContainer>
        <ListPatientScreen />
      </NavigationContainer>
    );

    await waitFor(() => {
      fireEvent.changeText(screen.getByPlaceholderText("Search Patients"), "Jane");
    });

    expect(screen.getByText("Jane Smith")).toBeTruthy();
    expect(screen.queryByText("John Doe")).toBeNull();
    expect(screen.queryByText("Sam Brown")).toBeNull();
  });
});
