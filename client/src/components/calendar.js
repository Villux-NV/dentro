import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { AuthContext } from './auth';
import Firebase from '../firebase';

// TODO: Implement Calendar Feature
const CalendarCard = () => {
  let display;
  const localizer = momentLocalizer(moment);
  const { currentUser } = useContext(AuthContext);

  const [events, setEvents] = useState([]);

  const displayName = () => {
    if (currentUser) {
      display = currentUser.displayName;
    }
    return <>: {display}</>
  };

  const eventList = {};

  return (
    <div>
      <Navbar className='navbar' >
        <Navbar.Brand href='/'>Dentro</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end'>
          <Nav>
            <Nav.Link><Link style={{ color: 'rgb(70,69,69)' }} to='/'>Your Trees</Link></Nav.Link>
            <Nav.Link><Link style={{ color: 'rgb(70,69,69)' }} to='/calendar'>Calendar</Link></Nav.Link>
            <Nav.Link style={{ color: 'rgb(70,69,69)' }} onClick={() => Firebase.auth().signOut()}>Logout{displayName()}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className='d-flex justify-content-center'>
        <h1 >Calendar Incoming!</h1>
        
        <Calendar 
          localizer={localizer}
          events={eventList}
          startAccessor='start'
          endAccessor='end'
        />
      </div>
    </div>
  );
};

export default CalendarCard;