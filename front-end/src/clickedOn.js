import './clickedOn.css';

    // https://www.mockaroo.com/docs
    // All these API requests should be "GET" Requests based on the Input
    // Name of clicked Crypto <--- Will be filled in based on results of "GET" Request
    // Price of clicked Crypto <--- Will be filled in based on results of "GET" Request
    // Picture of Crypto <--- Will be filled in based on results of "GET" Request
    // Stock Graph of Crypto <--- Will be filled in based on results of "GET" Request
    // Crypto information <--- Will be filled in based on results of "GET" Request

    // Add a picture of a cryptocurrency to the right of these headers

function clickedOn() {
    return (
        <>
        <div id = "page-title">
            <h1> Crypto Analytics </h1>
        </div>

        <div id = "page-top-content">
            <div id = "crypto-info" className = "section_top">

                <div className = "cryptoName">
                    Name of Searched Cryptocurrency
                </div>

                <div className = "price">
                    Price
                </div>

                <div className = "percentChange">
                    Percent Change
                </div>

                <img src = "https://github.com/software-assignments-spring2022/final-project-mycryptopal/blob/master/front-end/imageResources/myCryptoPalLogo.png"  alt = "" id = "cryptoPic"></img>
            </div>

        <div id = "page-mid-content">
            <div id = "crypto-history" className = "section_mid">

                <div className = "cryptoParagraph">
                    Cryptocurrency Information and History
                    <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </p>

                </div>
            </div>   
        </div>

        <div id = "page-bottom-content">
            <div id = "market-stats" className = "section_bottom">

                <div className = "market_header">
                    Market Stats
                </div>

                <div className = "trading_vol">
                    Trading Volume: {Volume}
                </div>

                <div className = "market-cap">
                    Market Cap: {market_cap}
                </div>

                <div className = "Supply">
                    Circulating Supply: {Supply}
                </div>    
            </div>

            




        </div>



        </div>
        </>

    )     
}

export default clickedOn;