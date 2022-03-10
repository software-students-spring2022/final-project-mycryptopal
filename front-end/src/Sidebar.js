import './Sidebar.css';
import { slide as Menu } from 'react-burger-menu';

function Sidebar() {
    return (
        <Menu>
            <a id="home" className="menu-item" href="/home"><h1>MyCryptoPal</h1></a>
            <a id="portfolio" className="menu-item" href="/portfolio">My Portfolio</a>
            <a id="explore" className="menu-item" href="/explore">Explore Cryptos</a>
            <a id="learn" className="menu-item" href="/learn">Learn</a>
            <a id="contact" className="menu-item" href="/contact">Contact Us</a>
            <a id="settings" className="menu-item" href="/settings">Settings</a>
            <a id="logout" className="menu-item" href="/">Logout</a>
        </Menu>
    );
}

export default Sidebar;