import { useEffect, useState } from 'react';
import './Crypto.css';

    // https://www.mockaroo.com/docs
    // All these API requests should be "GET" Requests based on the Input
    // Name of clicked Crypto <--- Will be filled in based on results of "GET" Request
    // Price of clicked Crypto <--- Will be filled in based on results of "GET" Request
    // Picture of Crypto <--- Will be filled in based on results of "GET" Request
    // Stock Graph of Crypto <--- Will be filled in based on results of "GET" Request
    // Crypto information <--- Will be filled in based on results of "GET" Request

    // Add a picture of a cryptocurrency to the right of these headers

function Crypto() {
    const [coin, setCoin] = useState({});

    useEffect(() => {
        async function getCoin() {
            const res = await fetch('https://my.api.mockaroo.com/coins.json?key=4c156a80');
            const data = await res.json();
            setCoin(data);
        }
        getCoin();
    }, []);

    return (
        <>
            <div id = "page-title">
                <h1> Crypto Analytics </h1>
            </div>

            <div id="page-content">
                <div id="top-content">
                    <div id="crypto-info">
                        <div id="crypto-name">
                            {coin.cryptoName}
                        </div>
                        <div id="crypto-subinfo">
                            <div className="subinfo info-left">
                                <div className="cryptoInfo cryptoPrice">Price</div>
                                <div className="cryptoInfo cryptoPercent">% Change</div>
                            </div>
                            <div className="subinfo info-right">
                                <div className="cryptoInfo cryptoPrice">{coin.cryptoPrice}</div>
                                <div className="cryptoInfo cryptoPercent">{coin.cryptoPercentChange}</div>
                            </div>
                        </div>
                    </div>
                    <div id="crypto-image">
                        <img src="https://picsum.photos/300" alt="coin pic"></img>
                    </div>
                </div>

                <div id="middle-content">
                    <div id="stock-graph">
                        <img src="https://picsum.photos/1200/600" alt="stock graph"></img>
                    </div>
                    <div id="crypto-history">
                        <div id="history-header">
                            Cryptocurrency Information and History
                        </div>
                        <div id="history-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                    </div>
                </div>
                
                <div id="bottom-content">
                    <div id="market-header">
                        Market Stats
                    </div>
                    <div id="market-info">
                        <div className="subinfo info-left">
                            <div className="cryptoInfo cryptoVolume">Trading Volume</div>
                            <div className="cryptoInfo cryptoCap">Market Cap</div>
                            <div className="cryptoInfo cryptoSupply">Circulating Supply</div>
                        </div>
                        <div className="subinfo info-right">
                            <div className="cryptoInfo cryptoVolume">{coin.cryptoVolume}</div>
                            <div className="cryptoInfo cryptoCap">{coin.cryptoCap}</div>
                            <div className="cryptoInfo cryptoSupply">{coin.cryptoSupply}</div>
                        </div>
                    </div>
                </div>
                <div id="buttons">
                    <div id="button-left">
                        <input id="addButton" onClick = {addCrypto} type = "button" value = "Add Crypto" className = "add_crypto_button"></input>
                    </div>
                    <div id="button-right">
                        <input id = "dropButton" onClick = {dropCrypto} type = "button" value = "Drop Crypto" className = "drop_crypto_button"></input>
                    </div>
                </div>
            </div>       
        </>
    )     
}

function addCrypto() {
    // fetch cry name from mockaroo
    alert("You have successfully added a crypto to your watchlist!")
}

function dropCrypto() {
    // fetch crypto name from mockaroo
    alert("You have successfully removed a crypto from your watchlist.")
}
export default Crypto;