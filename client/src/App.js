import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import MainContent from './components/main-content';
import TopNavigation from './components/top-navigation';
import Login from './components/login';
import { AuthProvider } from './components/auth';
import PrivateRoute from './private-route';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className='app-container'>
          <TopNavigation />

          <div>
            {/* <PrivateRoute exact path='/' component={MainContent} /> */}
            <Route exact path='/' component={MainContent} />
            <Route exact path='/login' component={Login} />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
