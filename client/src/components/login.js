import { useCallback, useContext } from 'react';
import { Form, Button, Navbar } from 'react-bootstrap';

import Firebase from '../firebase';
import { AuthContext } from './auth';

import { AnimatePresence, motion } from 'framer-motion';
import { Redirect, withRouter } from 'react-router';
import { Link } from 'react-router-dom';

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

  const frameVariants = {
    initial: {
      borderRadius: 20, x: -1000, opacity: 0
    },
    in: {
      scale: 1.2, borderRadius: 20, x: 0, zIndex: 1, opacity: 1
    },
    out: {
      opacity: 0, x: 1000, zIndex: 0
    }
  };

  return (
    <div className='initial__container'>
      <Navbar className='navbar justify-content-center'>
        <Navbar.Brand>Welcome to Dentro</Navbar.Brand>
      </Navbar>

      <div className='form__container'>
        <motion.div
          layout
          variants={frameVariants}
          className='form'
          initial='initial'
          animate='in'
          transition={{ duration: 0.8 }}
          exit='out'
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
            <p>No account? <Link to='/signup'>Sign Up</Link></p>
        </motion.div>
      </div>
    </div>
  )
}

export default withRouter(Login);