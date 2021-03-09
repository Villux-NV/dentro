import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import MainContent from './components/main-content';
import Login from './components/login';
import SignUp from './components/sign-up';
import { AuthProvider } from './components/auth';
import PrivateRoute from './private-route';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className='app-container'>
          <PrivateRoute exact path='/' component={MainContent} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
