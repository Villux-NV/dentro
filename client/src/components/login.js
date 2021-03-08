import { useCallback, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';

import Firebase from '../firebase';
import { AuthContext } from './auth';

import { motion } from 'framer-motion';
import { Redirect, withRouter } from 'react-router';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async e => {
      e.preventDefault();
      const { email, password } = e.target.elements;

      try {
        await Firebase.auth().signInWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (err) {
        console.log({ errorInSignUp: err});
      }
    }, [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to='/' />;
  };

  return (
    <motion.div className='form__container' layout>
      <motion.div
        layout
        className='form'
        animate={{ scale: 1.2, borderRadius: 10 }}
        initial={{ borderRadius: 20 }}
        transition={{ duration: .6 }}
      >
        <h4 className='d-flex justify-content-center'>Login</h4>
        <Form className='form__container__initial' onSubmit={handleLogin}>
            <Form.Group controlId='formEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control name='email' type='email' autoComplete='current-email' />
            </Form.Group>

            <Form.Group controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control name='password' type='password' autoComplete='current-password' />
            </Form.Group>

            <Button variant='outline-primary' size='sm' type='submit' value='Submit'>
              Submit
            </Button>
          </Form>
          <hr />
          <p>No account? <a href='/signup'>Sign Up</a></p>
      </motion.div>
    </motion.div>
  )
}

export default withRouter(Login);