import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import MainContent from './components/main-content';
import Login from './components/login';
import SignUp from './components/sign-up';
import { AuthProvider } from './components/auth';
import PrivateRoute from './private-route';
import { AnimatePresence, motion } from 'framer-motion';


const App = () => {
  return (
    <AuthProvider>
        <Router>
          <AnimatePresence exitBeforeEnter>
            <div className='app-container'>
              <Route>
                <PrivateRoute exact path='/' component={MainContent} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={SignUp} />
              </Route>
            </div>
          </AnimatePresence>
        </Router>
    </AuthProvider>
  );
}

export default App;
