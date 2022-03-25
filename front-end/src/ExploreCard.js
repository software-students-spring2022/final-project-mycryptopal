import './ExploreCard.css';

function ExploreCard(props) {
    return (
        <>
        <div className="exploreCard" onClick={() => window.location.href=props.url}>
            <div className="cardImage">
                <img src={props.logo} width = '40px' height = '40px' alt = 'crypto-logo'/>
            </div>
            <div className="cardName">
                <h2>{props.title}</h2>
            </div>
        </div>
        </>
    )
}

export default ExploreCard;