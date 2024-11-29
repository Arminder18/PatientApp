import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import ViewPatientRecordScreen from '../screens/ViewPatientRecordScreen';
import { NavigationContainer } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';

// Mocking navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

// Mocking route params
const mockRoute = {
  params: {
    patient: {
      _id: '1',
      name: 'John Doe',
      age: '30',
      gender: 'Male',
      diagnosis: 'Flu',
      phone: '1234567890',
      address: '123 Street',
      details: 'Some details',
      critical: false,
    },
  },
};

describe('ViewPatientRecordScreen', () => {
  it('should render patient details', async () => {
    render(
      <NavigationContainer>
        <ViewPatientRecordScreen route={{ ...mockRoute }} navigation={mockNavigation} />
      </NavigationContainer>
    );

    expect(screen.getByText("John Doe's Record")).toBeTruthy();
    expect(screen.getByText('Name: John Doe')).toBeTruthy();
    expect(screen.getByText('Age: 30')).toBeTruthy();
    expect(screen.getByText('Gender: Male')).toBeTruthy();
    expect(screen.getByText('Diagnosis: Flu')).toBeTruthy();
    expect(screen.getByText('Phone: 1234567890')).toBeTruthy();
    expect(screen.getByText('Address: 123 Street')).toBeTruthy();
  });

  it('should toggle edit mode and update patient details', async () => {
    render(
      <NavigationContainer>
        <ViewPatientRecordScreen route={{ ...mockRoute }} navigation={mockNavigation} />
      </NavigationContainer>
    );

    // Simulate clicking the edit button
    fireEvent.press(screen.getByRole('button', { name: /pencil/i }));

    // Check if the input fields are rendered
    expect(screen.getByPlaceholderText('Name')).toBeTruthy();
    expect(screen.getByPlaceholderText('Age')).toBeTruthy();

    // Simulate entering new data
    fireEvent.changeText(screen.getByPlaceholderText('Name'), 'Jane Doe');
    fireEvent.changeText(screen.getByPlaceholderText('Age'), '29');

    // Simulate pressing the save button
    fireEvent.press(screen.getByRole('button', { name: /save changes/i }));

    // Wait for the success alert
    await waitFor(() => expect(mockNavigation.navigate).toHaveBeenCalledWith('ListPatientScreen'));
  });

  it('should show an alert when deleting a patient record', async () => {
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    render(
      <NavigationContainer>
        <ViewPatientRecordScreen route={{ ...mockRoute }} navigation={mockNavigation} />
      </NavigationContainer>
    );

    fireEvent.press(screen.getByRole('button', { name: /trash/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Delete Record', 'Are you sure you want to delete this record?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: expect.any(Function),
        },
      ]);
    });

    // Mock the delete functionality
    fireEvent.press(screen.getByText('Delete'));

    // Ensure the navigation function is called after deletion
    await waitFor(() => expect(mockNavigation.navigate).toHaveBeenCalledWith('ListPatientScreen'));

    jest.spyOn(global, 'alert').mockRestore();
  });

  it('should show the test form when the add test button is pressed', async () => {
    render(
      <NavigationContainer>
        <ViewPatientRecordScreen route={{ ...mockRoute }} navigation={mockNavigation} />
      </NavigationContainer>
    );

    expect(screen.queryByText('Test Type')).toBeNull();

    // Simulate pressing the add test button
    fireEvent.press(screen.getByRole('button', { name: /add-circle/i }));

    // Check that the test form is displayed
    expect(screen.getByText('Test Type')).toBeTruthy();
  });
});
