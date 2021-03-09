import { withRouter } from 'react-router';
import { useCallback } from 'react';
import { Form, Button, Navbar } from 'react-bootstrap';
import { AnimatePresence, motion } from 'framer-motion';

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

      console.log(user);

      history.push('/');
    } catch (err) {
      console.log({ errorInSignUp: err});
    }
  }, [history]);

  const frameVariants = {
    initial: {
      borderRadius: 0, x: -1000
    },
    in: {
      scale: 1.2, borderRadius: 10, x: 0
    },
    out: {
      opacity: 0, x: 1000
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
          exit='out'
          transition={{ duration: 0.8 }}
        >
          <h4 className='d-flex justify-content-center'>Sign Up</h4>
          <Form className='form__container__initial' onSubmit={handleSignUp}>
            <Form.Group controlId='formName'>
              <Form.Label>Name</Form.Label>
              <Form.Control name='name' type='text' />
            </Form.Group>

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
          <p>Have an account? <Link to='/login'>Login</Link></p>
        </motion.div>
      </div>
    </div>
  )
}

export default withRouter(SignUp);