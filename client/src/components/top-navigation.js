import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

function TopNavigation () {
  return (
    <Navbar collapseOnSelect bg='dark' variant='dark'>
      <Navbar.Brand href='#home'>Dentro</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end'>
        <Nav>
          <Nav.Link href='#'>Tree</Nav.Link>
          <Nav.Link href='#'>Calendar</Nav.Link>
          <NavDropdown title='Profile' id='collapsible-nav-dropdown'>
            <NavDropdown.Item href='#'>Details</NavDropdown.Item>
            <NavDropdown.Item href='#'>Family</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href='#'>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
};

export default TopNavigation;