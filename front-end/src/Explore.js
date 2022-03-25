import './Explore.css';
import ExploreCard from './ExploreCard';

function Explore() {
    const data = [
        {
            title: 'BTC',
            url: '/crypto',
            logo: 'https://www.cryptocompare.com/media/19633/btc.png'
        },
        {
            title: 'ETH',
            url: '/crypto',
            logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
        },
        {
            title: 'DOGE',
            url: '/crypto',
            logo: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png'
        },
        {
            title: 'Terra',
            url: '/crypto',
            logo: 'https://cryptologos.cc/logos/terra-luna-luna-logo.png'
        },
        {
            title: 'USDT',
            url: '/crypto',
            logo: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=002'
        },
        {
            title: 'BNB',
            url: '/crypto',
            logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.svg?v=002'
        },
        {
            title: 'USD Coin',
            url: '/crypto',
            logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=002'
        },
        {
            title: 'XRP',
            url: '/crypto',
            logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg?v=002'
        },
        {
            title: 'Cardano',
            url: '/crypto',
            logo: 'https://cryptologos.cc/logos/cardano-ada-logo.png'
        },
        {
            title: 'SOL',
            url: '/crypto',
            logo: 'https://cryptologos.cc/logos/solana-sol-logo.png'
        }
    ]
    return (
        <>
            <div id="page-title">
                <h1>Explore Cryptos</h1>
            </div>
            <div id="page-content">
                <div className="dropdown-section">
                    <button className="dropdown-btn">Cryptocurrency Dropdown</button>
                </div>

                <div id="crypto-dropdown">
                    <select name="cars" id="cars" onChange={() => {window.location.href='/crypto'}}>
                        <option value="">Select Cryptocurrency</option>
                        {
                            data.map(item => <option>{item.title}</option>)
                        }
                    </select>
                </div>

                <div id="crypto-collage">
                    {
                        data.map(item => <ExploreCard title={item.title} url={item.url} logo={item.logo}/>)
                    }
                </div>
            </div>
        </>

    )
}

export default Explore;