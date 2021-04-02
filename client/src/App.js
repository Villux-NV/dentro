import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { AuthProvider } from './components/auth';
import PrivateRoute from './private-route';
import MainContent from './components/main-content';
import Login from './components/login';
import SignUp from './components/sign-up';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
        <BrowserRouter>
          <AnimatePresence exitBeforeEnter>
            <div className='app-container'>
              <PrivateRoute exact path='/' component={MainContent} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={SignUp} />
            </div>
          </AnimatePresence>
        </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
