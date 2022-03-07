import './Sidebar.css';
import { slide as Menu } from 'react-burger-menu';

function Sidebar() {
    return (
        <Menu>
            <a id="home" className="menu-item" href="/"><h1>MyCryptoPal</h1></a>
            <a id="portfolio" className="menu-item" href="/">My Portfolio</a>
            <a id="explore" className="menu-item" href="/">Explore Cryptos</a>
            <a id="learn" className="menu-item" href="/">Learn</a>
            <a id="contact" className="menu-item" href="/">Contact Us</a>
            <a id="settings" className="menu-item" href="/">Settings</a>
            <a id="logout" className="menu-item" href="/">Logout</a>
        </Menu>
    );
}

export default Sidebar;