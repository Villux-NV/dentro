import React from 'react';
import { render, getQueriesForElement } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AuthProvider, AuthContext } from './auth';
import TopNavigation from './top-navigation';

const currentUser = {
  displayName: 'Test User'
};

test('renders top navigation', () => {
  const { getByText } = render(
    <AuthContext.Provider value={{currentUser}}>
      <TopNavigation />
    </AuthContext.Provider>
  );

  getByText('Dentro');
});

test('displays user name', () => {
  const { getByText, getByTestId } = render(
    <AuthContext.Provider value={{currentUser}}>
      <TopNavigation />
    </AuthContext.Provider>
  );
  
  const logoutButton = getByTestId('logoutButton');
  expect(logoutButton).toHaveTextContent('Test User');
});