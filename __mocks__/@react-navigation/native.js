import * as React from 'react';

export const useNavigation = () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  // Add more mock methods as needed
});

export const NavigationContainer = ({ children }) => <>{children}</>;

// You can add more exports or mock implementations if needed
