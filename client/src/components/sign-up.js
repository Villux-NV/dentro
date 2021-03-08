import { withRouter } from 'react-router';
import { useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

import Firebase from '../firebase';


const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async e => {
    e.preventDefault();

    const { email, password } = e.target.elements;

    try {
      await Firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
      history.push('/');
    } catch (err) {
      console.log({ errorInSignUp: err});
    }
  }, [history]);

  return (
    <motion.div layout className='form__container'>
      <motion.div
        layout
        className='form'
        animate={{ scale: 1.2, borderRadius: 10 }}
        initial={{ borderRadius: 20 }}
        transition={{ duration: .6 }}
      >
        <h4 className='d-flex justify-content-center'>Sign Up</h4>
        <Form onSubmit={handleSignUp}>
          <Form.Group controlId='formEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control name='email' type='email' autoComplete='email' />
          </Form.Group>

          <Form.Group controlId='formPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control name='password' type='password' autoComplete='new-password' />
          </Form.Group>

          <Button variant='outline-primary' size='sm' type='submit' value='Submit'>
            Submit
          </Button>
        </Form>
        <hr />
        <p>Have an account? <a href='/login'>Login</a></p>
      </motion.div>
    </motion.div>
  )
}

export default withRouter(SignUp);