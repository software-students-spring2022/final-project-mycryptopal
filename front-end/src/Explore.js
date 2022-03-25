import './Explore.css';

function Explore() {
    return (
        <>
            <div id="page-title">
                <h1>Explore Cryptos</h1>
            </div>
            <div id="page-content">
                <div className= "explore">
                    <a href = '/crypto'>
                    <button className= "page-button"> More Details... </button>
                    </a>
                </div>     
            </div>
        </>
    )
}

export default Explore;