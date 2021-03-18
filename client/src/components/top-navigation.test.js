import React from 'react';
import { render, getQueriesForElement } from '@testing-library/react';
import { config } from 'dotenv';
import path from 'path';
// import Firebase from '../firebase';

import { AuthProvider, AuthContext } from './auth';
import App from '../App';
import TopNavigation from './top-navigation';

config({
  path: path.resolve(process.cwd(), '../../.env.test.local')
})

const currentUser = null;

it('renders top navigation', () => {
  // console.log(Firebase);
  const { getByText, getByLabelText } = render(
    <AuthContext.Provider value={{currentUser}}>
      <TopNavigation />
    </AuthContext.Provider>
  );

  getByText('Dentro');
  // expect(root.querySelector('a').textContent).toBe('Dentro');
});