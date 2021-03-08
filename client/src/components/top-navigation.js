import { Navbar, Nav } from 'react-bootstrap';

import Firebase from '../firebase';

function TopNavigation () {
  return (
    <Navbar collapseOnSelect bg='dark' variant='dark'>
      <Navbar.Brand href='/'>Dentro</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end'>
        <Nav>
          <Nav.Link href='#noroute'>Tree</Nav.Link>
          <Nav.Link href='#noroute'>Calendar</Nav.Link>
          <Nav.Link onClick={() => Firebase.auth().signOut()}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
};

export default TopNavigation;