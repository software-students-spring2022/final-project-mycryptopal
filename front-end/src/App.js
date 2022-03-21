import { Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar';
import Home from './Home';
import Portfolio from './Portfolio';
import Explore from './Explore';
import Learn from './Learn';
import Login from './Login';
import Registration from './Registration';
import LearnMap from './LearnMap';
import Contact from './Contact';
import Settings from './Settings';
import Crypto from './Crypto';
import Article from './Article';

function App() {
  return (
    <div className="App" id="outer-container">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}/>
      <div id="page-wrap">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/portfolio' element={<Portfolio />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/learnmap' element={<LearnMap />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/crypto' element={<Crypto />} />
          <Route path='/article' element={<Article />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
