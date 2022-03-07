import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar';

function App() {
  return (
    <div className="App" id="outer-container">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div id="page-wrap">
        <h1>Sample Page</h1>
      </div>
    </div>
  );
}

export default App;
