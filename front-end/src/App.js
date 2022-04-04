import { Routes, Route, useNavigate } from 'react-router-dom';
// Views
import Home from './views/Home/Home';
import Portfolio from './views/Portfolio/Portfolio';
import Explore from './views/Explore/Explore';
import Learn from './views/Learn/Learn';
import Contact from './views/Contact/Contact';
import Settings from './views/Settings/Settings';
import Article from './views/Article/Article';
import Crypto from './views/Crypto/Crypto';
import Lesson from './views/Lesson/Lesson';
// Components
import Sidebar from './components/Sidebar/Sidebar';
// CSS
import './App.css';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App" id="outer-container">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}/>
      <div id="page-wrap">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/portfolio' element={<Portfolio />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/learn' element={<Learn />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/article' element={<Article />} />
          <Route path='crypto' element={<Explore />} />
          <Route path='/crypto/:symbol' element={<Crypto />} />
          <Route path='/lesson' element={<Lesson />} />
        </Routes>
        <div id="return">
          <button id="return-button" onClick={() => navigate(-1)}>Return to Previous Page</button>
        </div>
      </div>
    </div>
  );
}

export default App;
