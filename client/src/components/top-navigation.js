import { useContext, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { AuthContext } from './auth';
import Firebase from '../firebase';

const TopNavigation = ({ handleFamilies, handleFamilyNameId, families }) => {
  let userId, display;
  
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    userId = currentUser.uid;
  };

  async function getFamilies () {
    await fetch(`http://localhost:3500/families/${userId}`)
      .then(res => res.json())
      .then(data => handleFamilies(data));
  };

  useEffect(() => getFamilies(), []);

  const displayName = () => {
    if (currentUser) {
      display = currentUser.displayName;
    }
    return <>: {display}</>
  };

  return (
    <Navbar collapseOnSelect bg='dark' variant='dark'>
      <Navbar.Brand href='/'>Dentro</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end'>
          { families &&
            <Nav>
              <NavDropdown title='Your Trees'>
                <div>
                  { 
                    families.map(family => {
                      return (
                        <NavDropdown.Item onClick={() => handleFamilyNameId(family.id)} >{family.familyName}</NavDropdown.Item>
                      )
                    })
                  }
                </div>
                <NavDropdown.Divider />
                <NavDropdown.Item>Add New Family</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href='#noroute'>Calendar</Nav.Link>
              <Nav.Link onClick={() => Firebase.auth().signOut()}>Logout{displayName()}</Nav.Link>
            </Nav>
          }
      </Navbar.Collapse>
    </Navbar>
  )
};

export default TopNavigation;