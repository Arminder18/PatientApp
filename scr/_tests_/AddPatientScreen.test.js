import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import AddPatientScreen from '../screens/AddPatientScreen';
import '@testing-library/jest-native/extend-expect';
import axios from 'axios';
import { Alert } from 'react-native';

jest.mock('axios');
jest.spyOn(Alert, 'alert');

describe('AddPatientScreen', () => {
  test('renders all input fields and buttons correctly', () => {
    render(<AddPatientScreen navigation={{ goBack: jest.fn() }} />);
    expect(screen.getByText('Add New Patient')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter name')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter age')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter diagnosis')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter gender')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter phone number')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter address')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter additional details')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter medical history')).toBeTruthy();
    expect(screen.getByText('Add Patient')).toBeTruthy();
  });

  test('submits the form successfully and displays success alert', async () => {
    axios.post.mockResolvedValueOnce({});

    render(<AddPatientScreen navigation={{ goBack: jest.fn() }} />);
    fireEvent.changeText(screen.getByPlaceholderText('Enter name'), 'John Doe');
    fireEvent.changeText(screen.getByPlaceholderText('Enter age'), '30');
    fireEvent.changeText(screen.getByPlaceholderText('Enter diagnosis'), 'Flu');
    fireEvent.changeText(screen.getByPlaceholderText('Enter gender'), 'Male');
    fireEvent.changeText(screen.getByPlaceholderText('Enter phone number'), '1234567890');
    fireEvent.changeText(screen.getByPlaceholderText('Enter address'), '123 Street');
    fireEvent.changeText(screen.getByPlaceholderText('Enter additional details'), 'N/A');
    fireEvent.changeText(screen.getByPlaceholderText('Enter medical history'), 'None');

    fireEvent.press(screen.getByText('Add Patient'));

    // Wait for the async function to complete and for the alert to show
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Success', 'Patient added successfully');
    });
  });

  test('shows error alert when submission fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('Failed to add patient'));

    render(<AddPatientScreen navigation={{ goBack: jest.fn() }} />);
    fireEvent.changeText(screen.getByPlaceholderText('Enter name'), 'John Doe');
    fireEvent.changeText(screen.getByPlaceholderText('Enter age'), '30');
    fireEvent.changeText(screen.getByPlaceholderText('Enter diagnosis'), 'Flu');
    fireEvent.changeText(screen.getByPlaceholderText('Enter gender'), 'Male');
    fireEvent.changeText(screen.getByPlaceholderText('Enter phone number'), '1234567890');
    fireEvent.changeText(screen.getByPlaceholderText('Enter address'), '123 Street');
    fireEvent.changeText(screen.getByPlaceholderText('Enter additional details'), 'N/A');
    fireEvent.changeText(screen.getByPlaceholderText('Enter medical history'), 'None');

    fireEvent.press(screen.getByText('Add Patient'));

    // Wait for the async function to complete and for the alert to show
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to add patient');
    });
  });
});
