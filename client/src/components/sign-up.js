import { useCallback } from 'react';
import { Form, Button, Navbar } from 'react-bootstrap';
import { motion } from 'framer-motion';

import Firebase from '../firebase';
import { Link } from 'react-router-dom';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async e => {
    e.preventDefault();
    const { name, email, password } = e.target.elements;

    try {
      await Firebase.auth().createUserWithEmailAndPassword(email.value, password.value);

      const user = Firebase.auth().currentUser;
      user.updateProfile({
        displayName: name.value,
      });

      history.push('/');
    } catch (err) {
      console.log({ errorInSignUp: err});
    }
  }, [history]);

  const frameVariants = {
    initial: {
      borderRadius: 20, scale: 0.6, opacity: 0
    },
    in: {
      scale: 1.2, borderRadius: 20, zIndex: 1, opacity: 1
    },
    out: {
      opacity: 0, zIndex: 0
    }
  };

  return (
    <div className='initial__container'>
      <Navbar className='navbar justify-content-center'>
        <motion.div
          layout
          className='navbar__title'
          initial={{ scale: 1.4 }}
          animate={{ scale: 1.4 }}
        >
          <Navbar.Brand>Welcome to Dentro</Navbar.Brand>
        </motion.div>
      </Navbar>

      <div className='form__container'>
        <motion.div
          layout
          variants={frameVariants}
          className='form'
          initial='initial'
          animate='in'
          exit='out'
          transition={{ duration: 0.8 }}
        >
          <h4 className='d-flex justify-content-center'>Sign Up</h4>
          <Form data-testid='submitForm' className='form__container__initial' onSubmit={handleSignUp}>
            <Form.Group controlId='formName'>
              <Form.Label>Name</Form.Label>
              <Form.Control data-testid='formName' name='name' type='text' />
            </Form.Group>

            <Form.Group controlId='formEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control data-testid='formEmail' name='email' type='email' autoComplete='email' />
            </Form.Group>

            <Form.Group controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control data-testid='formPassword' name='password' type='password' autoComplete='new-password' />
            </Form.Group>

            <Button data-testid='formButton' variant='outline-primary' size='sm' type='submit' value='Submit'>
              Submit
            </Button>
          </Form>
          <hr />
          <p>Have an account? <Link to='/login'>Login</Link></p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;