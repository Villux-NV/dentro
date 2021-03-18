import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { AuthProvider } from './components/auth';
import PrivateRoute from './private-route';
import MainContent from './components/main-content';
import Calendar from './components/calendar';
import Login from './components/login';
import SignUp from './components/sign-up';
import './App.css';
import TopNavigation from './components/top-navigation';


const App = () => {
  return (
    <AuthProvider>
        <Router>
          <AnimatePresence exitBeforeEnter>
            <div className='app-container'>
              <PrivateRoute exact path='/' component={MainContent} />
              {/* <PrivateRoute exact path='/calendar' component={Calendar} /> */}
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={SignUp} />
            </div>
          </AnimatePresence>
        </Router>
    </AuthProvider>
  );
}

export default App;
