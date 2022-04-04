import './ArticleSmall.css';

// const templateProps = {
//     title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//     summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac tincidunt vitae semper quis lectus. Dolor',
//     picture: 'https://picsum.photos/1000',
//     link: '/article',
// }

async function getNews() {
    const res = await fetch(`http://localhost:4000/Home`).then((response) => response.json())
    return res
}
  getNews();


function ArticleSmall(props) {
    props = getNews()
    console.log(props)
    return (
        <>
            <div className="articleSmall" onClick={() => window.location.href=props.link}>
                <div className="articleSmallPicture">
                    <img src={props.articles} alt="Article"></img>
                </div>
                <div className="articleSmallContent">
                    <div className="articleSmallTitle">{props.title}</div>
                    <div className="articleSmallSummary">{props.content}</div>
                </div>
            </div>
        </>
    )
}

export default ArticleSmall;