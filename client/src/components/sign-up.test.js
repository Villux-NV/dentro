import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import SignUp from './sign-up';
import { BrowserRouter } from 'react-router-dom';

const currentUser = {
  displayName: 'Test User'
};

test('change input values', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );

  const inputName = getByTestId('formName');

  fireEvent.change(inputName, { target: { value: 'Test Name' } });
  expect(inputName.value).toBe('Test Name');
});

test('Handle Sign Up', () => {
  const { getByTestId, handleSignUp } = render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );

  const inputName = getByTestId('formName');
  const inputEmail = getByTestId('formEmail');
  const inputPassword = getByTestId('formPassword');
  const formButton = getByTestId('formButton');
  const submitForm = getByTestId('submitForm');

  fireEvent.change(inputName, { target: { value: 'Test Name' } });
  fireEvent.change(inputEmail, { target: { value: 'test@testemail.com' } });
  fireEvent.change(inputPassword, { target: { value: 'wordpass' } });
  fireEvent.click(formButton);
  // fireEvent.submit(submitForm);
  
  expect(submitForm).toHaveBeenCalled(1);
});