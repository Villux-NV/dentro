import React from 'react';
import { render, getQueriesForElement, getByRole } from '@testing-library/react';
import { config } from 'dotenv';
import path from 'path';

import { AuthProvider, AuthContext } from './auth';
import TopNavigation from './top-navigation';

config({
  path: path.resolve(process.cwd(), '../../.env.test.local')
})

const currentUser = {
  displayName: 'Test User'
};

test('renders top navigation', () => {
  // console.log(Firebase);
  const { getByText } = render(
    <AuthContext.Provider value={{currentUser}}>
      <TopNavigation />
    </AuthContext.Provider>
  );

  getByText('Dentro');
});

test('displays user name', () => {
  const { getByText, getByLabelText } = render(
    <AuthContext.Provider value={{currentUser}}>
      <TopNavigation />
    </AuthContext.Provider>
  );

  
  expect(getByText(/Logout/)).toHaveTextContent('Test User');
});