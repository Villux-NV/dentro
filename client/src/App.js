import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import MainContent from './components/main-content';
import TopNavigation from './components/top-navigation';
import Login from './components/login';
import SignUp from './components/sign-up';
import { AuthProvider } from './components/auth';
import PrivateRoute from './private-route';
import { useEffect, useState } from 'react';


const App = () => {
  const [families, setFamilies] = useState([]);
  const [members, setMembers] = useState([]);
  const [familyNameId, setFamilyNameId] = useState('');
  const [user, setUser] = useState('');

  async function getFamilies () {
    await fetch(`http://localhost:3500/families/${user}`)
      .then(res => res.json())
      .then(data => console.log(data[0]));
  };

  async function getMembers () {
    await fetch(`http://localhost:3500/membertree/${familyNameId}`)
      .then(res => res.json())
      .then(data => {
        if (data === false) {
          return;
        } else {
          setMembers([data]);
        }
      });
  };

  useEffect(() => {
    if (!familyNameId) {
      getFamilies();
    } else {
      getMembers();
    }
  }, []);

  const handleFamilies = (data) => {
    setFamilies(data);
  };

  const handleFamilyNameId = (id) => {
    setFamilyNameId(id);
  };

  const handleUser = (id) => {
    setUser(id);
  };

  return (
    <AuthProvider>
      <Router>
        <div className='app-container'>
          <TopNavigation
            handleFamilies={handleFamilies}
            handleFamilyNameId={handleFamilyNameId}
            families={families}
            handleUser={handleUser}
          />

          <div className='d-flex justify-content-center'>
            <PrivateRoute
              exact path='/'
              component={MainContent}
              members={members}
              getMembers={getMembers}
              familyNameId={familyNameId}
              handleUser={handleUser}
            />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
