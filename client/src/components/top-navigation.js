import { useContext } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { AuthContext } from './auth';
import Firebase from '../firebase';

const TopNavigation = ({ handleFamilyNameId, handleNewMembers, families, familyTest }) => {
  let userId, display;
  
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    userId = currentUser.uid;
  };

  const displayName = () => {
    if (currentUser) {
      display = currentUser.displayName;
    }
    return <>: {display}</>
  };

  return (
    <Navbar className='navbar' >
      <Navbar.Brand href='/'>Dentro</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end'>
        <Nav>
          <NavDropdown title='Your Trees'>
            <div>
              { (!familyTest) &&
                <NavDropdown.Item>No Family</NavDropdown.Item>
              }
            </div>
            <div>
              { familyTest &&
                families.map(family => {
                  return (
                    <NavDropdown.Item onClick={() => handleFamilyNameId(family.id)} >{family.familyName}</NavDropdown.Item>
                  )
                })
              }
            </div>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleNewMembers}>Add New Family</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href='#noroute'>Calendar</Nav.Link>
          <Nav.Link onClick={() => Firebase.auth().signOut()}>Logout{displayName()}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
};

export default TopNavigation;