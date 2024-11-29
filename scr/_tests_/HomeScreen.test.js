import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import '@testing-library/jest-native/extend-expect';

describe('HomeScreen', () => {
  test('renders welcome text and image', () => {
    render(<HomeScreen navigation={{ navigate: jest.fn() }} />);

    expect(screen.getByText('WELCOME TO SENCARE APP')).toBeTruthy();

    const image = screen.getByTestId('home-screen-image');
    expect(image).toBeTruthy();
  });

  test('navigates to ListPatientScreen when button is pressed', () => {
    const mockNavigate = jest.fn();
    render(<HomeScreen navigation={{ navigate: mockNavigate }} />);

    fireEvent.press(screen.getByText("Go to Patient's List"));

    expect(mockNavigate).toHaveBeenCalledWith('ListPatientScreen');
  });
});
