import './App.css';
import MainContent from './components/main-content';
import Navigation from './components/navbar';

function App() {
  return (
    <div className='app-container'>
      <Navigation />

      <MainContent />
    </div>
  );
}

export default App;
