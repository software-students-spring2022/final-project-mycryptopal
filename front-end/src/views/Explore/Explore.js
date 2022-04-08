import './Explore.css';
import ExploreCard from '../../components/ExploreCard/ExploreCard';
import { useState, useEffect } from 'react';

function Explore() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        async function getCoins() {
            const res = await fetch(`http://localhost:4000/api/crypto/explore?limit=102`);
            const data = await res.json();
            setCoins(data);
          }
          getCoins();
    }, []);

    return (
        <>
            <div id="page-title">
                <div>Explore</div>
            </div>
            <div id="page-content">
                <div id="most-popular">
                    <div className="exploreHeader">
                        Most Popular Cryptocurrencies By Market Cap
                    </div>

                    <div id="crypto-dropdown">
                        <select id="pop" onChange={() => {
                            window.location.href = document.getElementById('pop').value;
                            }}>
                            <option value="">Search Crypto in Alphabetical Order</option>
                            {
                                [...coins].sort((a,b) => a.name > b.name).map((item, i) => <option key={i} value={item.url}>{item.name}</option>)
                            }
                        </select>
                    </div>

                    <div id="crypto-collage">
                        {coins.map((item, i) => <ExploreCard key={i} symbol={item.symbol} url={item.url} pic={item.pic}/>)}
                    </div>
                </div>
            </div>
        </>

    )
}

export default Explore;