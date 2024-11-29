import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

export const createStackNavigatorMock = () => ({
  Navigator: ({ children }) => <>{children}</>,
  Screen: ({ name, component }) => (
    <div data-testid={`screen-${name}`}>{component}</div>
  ),
});

export const createStackNavigator = createStackNavigatorMock;
