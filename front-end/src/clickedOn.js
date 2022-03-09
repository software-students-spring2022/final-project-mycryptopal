import './clickedOn.css';
import Sidebar from './Sidebar'

function clickedOn() {
    return (
    // add a sidebar html tag and put it on the top of the page

    // https://www.mockaroo.com/docs
    // All these API requests should be "GET" Requests based on the Input
    // Name of clicked Crypto <--- Will be filled in based on results of "GET" Request
    // Price of clicked Crypto <--- Will be filled in based on results of "GET" Request
    // Picture of Crypto <--- Will be filled in based on results of "GET" Request
    // Stock Graph of Crypto <--- Will be filled in based on results of "GET" Request
    // Crypto information <--- Will be filled in based on results of "GET" Request

    <div>
        <h1> "Market Stats" </h1>
            <h2> "Trading Volume: " {volume}</h2>
            <h2> "Market Cap: " {marketCap}</h2>
            <h2> "Circulating Supply: " {supply} </h2> 
    </div>

    )

}