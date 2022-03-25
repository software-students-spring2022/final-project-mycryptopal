import './ArticleSmall.css';

const templateProps = {
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac tincidunt vitae semper quis lectus. Dolor',
    picture: 'https://picsum.photos/1000',
    link: '/article',
}

function ArticleSmall(props) {
    props = templateProps;
    return (
        <>
            <div className="articleSmall" onClick={() => window.location.href=props.link}>
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