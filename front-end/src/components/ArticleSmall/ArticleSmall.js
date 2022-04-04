import './ArticleSmall.css';

function ArticleSmall(props) {
    return (
        <>
            <div className="articleSmall" onClick={() => window.open(props.link)}>
                <div className="articleSmallPicture">
                    <img src={props.picture} alt="Article"></img>
                </div>
                <div className="articleSmallContent">
                    <div className="articleSmallTitle">{props.title}</div>
                    <div className="articleSmallSummary">{props.summary}</div>
                </div>
            </div>
        </>
    )
}

export default ArticleSmall;