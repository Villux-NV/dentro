import './App.css';
import MainContent from './components/main-content';
import TopNavigation from './components/top-navigation';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='app-container'>
        <TopNavigation />

        <div>
          <Switch>
            <Route path='/'>
              <MainContent />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
