import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Crypto.css';
import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
    ResponsiveContainer
} from "recharts";

function Crypto() {
    const [coin, setCoin] = useState({slug: '', symbol: '', circulating_supply: 0, quote: {USD: {price: 0, percent_change_24h: 0, volume_24h: 0, market_cap: 0}}});
    const [data, setData] = useState(null);
    let { symbol } = useParams();

    function transformData(data) {
        return data.c.map((item, index) => ({
          close: Number(item).toFixed(5),
          open: Number(data.o[index]).toFixed(5),
          timestamp: new Date(data.t[index] * 1000).toLocaleDateString()
        }))
    }

    useEffect(() => {
        async function getCoin() {
            const res = await fetch(`http://localhost:4000/crypto/${symbol}`);
            const data = await res.json();
            setCoin(data.data[`${symbol.toUpperCase()}`][0]);
        }

        async function getData() {
            const res = await fetch(`http://localhost:4000/graph/${symbol}`);
            const data = await res.json();
            setData(transformData(data));
        }

        getCoin();
        getData();
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
                        <img src={`https://cryptologos.cc/logos/${coin.slug.replace(' ', '-')}-${coin.symbol.toLowerCase()}-logo.png`} alt="coin pic"></img>
                    </div>
                </div>

                <div id="middle-content">
                    <div id="stock-graph">
                        <div className="sectionHeader">
                            Price History (30 Days)
                        </div>
                        <ResponsiveContainer width="100%" height={300}> 
                            <LineChart data={data}
                            margin={{ top: 20, bottom: 15 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="timestamp" />
                            <YAxis type="number" allowDecimals={true}
                                allowDataOverflow={true} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="open" stroke="blue" dot={false} />
                            <Line type="monotone" dataKey="close" stroke="gray" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div id="crypto-history">
                        <div className="sectionHeader">
                            Cryptocurrency Information and History
                        </div>
                        <div id="history-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                    </div>
                </div>
                
                <div id="bottom-content">
                    <div className="sectionHeader">
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