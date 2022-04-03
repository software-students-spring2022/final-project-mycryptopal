import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
    const [coin, setCoin] = useState({circulating_supply: 0, quote: {USD: {price: 0, percent_change_24h: 0, volume_24h: 0, market_cap: 0}}});
    let { symbol } = useParams();

    useEffect(() => {
        async function getCoin() {
            const res = await fetch(`http://localhost:4000/crypto/${symbol}`);
            const data = await res.json();
            setCoin(data.data[`${symbol.toUpperCase()}`][0]);
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
                            {coin.name}
                        </div>
                        <div id="crypto-subinfo">
                            <div className="subinfo info-left">
                                <div className="cryptoInfo cryptoPrice">Price</div>
                                <div className="cryptoInfo cryptoPercent">% Change</div>
                            </div>
                            <div className="subinfo info-right">
                                <div className="cryptoInfo cryptoPrice">{coin.quote.USD.price.toFixed(2)}</div>
                                <div className="cryptoInfo cryptoPercent">{(coin.quote.USD.percent_change_24h / 100).toFixed(2)}%</div>
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
                            <div className="cryptoInfo cryptoVolume">{coin.quote.USD.volume_24h.toFixed()}</div>
                            <div className="cryptoInfo cryptoCap">{coin.quote.USD.market_cap.toFixed()}</div>
                            <div className="cryptoInfo cryptoSupply">{coin.circulating_supply.toFixed()}</div>
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