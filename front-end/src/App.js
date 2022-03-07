import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar';
import Home from './Home';
import Explore from './Explore';
import Learn from './Learn';
import Contact from './Contact';

function App() {
  return (
    <div className="App" id="outer-container">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div id="page-wrap">
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/learn' element={<Learn />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
